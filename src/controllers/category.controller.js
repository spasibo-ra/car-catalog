import { Category } from '../models/category.model.js';
import Car from '../models/car.model.js';
import wrap from '../utils/wrap.js';

async function categoryList(req, res) {
  const categories = await Category.find().populate('subcategories').lean();
  res.render('categories/list', { title: 'Category List', categories });
}

async function getCarByCategory(req, res) {
  const { categorySlug, carSlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug })
    .populate('subcategories')
    .lean();
  if (!category)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Category not found' });
  const car = await Car.findOne({
    category: category._id,
    slug: carSlug,
  }).lean();
  if (!car)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Car not found' });
  res.render('cars/detail', { title: 'Car Catalog', category, car });
}

async function getCarBySubCategory(req, res) {
  const { categorySlug, subCategorySlug, carSlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug })
    .populate('subcategories')
    .lean();
  if (!category)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Category not found' });
  const subcategory = category.subcategories.find(
    (subcat) => subcat.slug === subCategorySlug
  );
  if (!subcategory)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Sub Category not found' });

  const car = await Car.findOne({
    category: category._id,
    subcategory: subcategory._id,
    slug: carSlug,
  }).lean();
  if (!car)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Car not found' });
  res.render('cars/detail', {
    title: 'Car Catalog',
    category,
    subcategory,
    car,
  });
}

async function getCategoryBySlug(req, res) {
  const { categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug })
    .populate('subcategories')
    .lean();
  if (!category) {
    return res.status(404).render('error', {
      title: 'Category Not Found',
      message: 'Category not found.',
    });
  }
  const cars = await Car.find({ category: category._id }).lean();
  res.render('categories/show', { title: category.name, category, cars });
}

async function getSubCategory(req, res) {
  const { categorySlug, subCategorySlug } = req.params;

  const category = await Category.findOne({ slug: categorySlug })
    .populate('subcategories')
    .lean();
  if (!category) {
    return res.status(404).render('error', {
      title: 'Category Not Found',
      message: 'Category not found.',
    });
  }
  const subcategory = category.subcategories.find(
    (sub) => sub.slug === subCategorySlug
  );
  if (!subcategory) {
    return res.status(404).render('error', {
      title: 'Subcategory Not Found',
      message: 'Subcategory not found.',
    });
  }

  const cars = await Car.find({
    category: category._id,
    subcategory: subcategory._id,
  }).lean();
  res.render('categories/showSubcategory', {
    title: subcategory.name,
    category,
    subcategory,
    cars,
  });
}

async function editCategoryView(req, res) {
  const { categorySlug } = req.params;

  const category = await Category.findOne({ slug: categorySlug })
    .populate('subcategories')
    .lean();
  if (!category) 
      return res.status(404).render('error', { title: 'Error', message: 'Category not found'});
  res.render('categories/edit', { category });
}
async function editCategory(req, res) {
  const { categorySlug } = req.params;
  const { imageUrl, formData } = res.locals;
  const { name, description } = formData
  const category = await Category.findOne({ slug: categorySlug })
  if (!category)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Category not found' });
  category.name = name;
  category.description = description;
  if (imageUrl) category.image = imageUrl;
  await category.save();
  res.redirect(`/categories/${categorySlug}/edit`);
}

export const getCarByCategoryHandler = wrap(getCarByCategory);
export const getCarBySubCategoryHandler = wrap(getCarBySubCategory);
export const getSubCategoryHandler = wrap(getSubCategory);
export const getCategoryBySlugHandler = wrap(getCategoryBySlug);
export const categoryListHandler = wrap(categoryList);
export const editCategoryViewHandler = wrap(editCategoryView);
export const editCategoryHandler = wrap(editCategory);
