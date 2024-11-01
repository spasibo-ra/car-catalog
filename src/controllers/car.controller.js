import slugify from 'slugify';
import { Category, Subcategory } from '../models/category.model.js';
import Car from '../models/car.model.js';
import wrap from '../utils/wrap.js';

async function addCarView(req, res) {
  const categories = await Category.find().populate('subcategories').lean();
  res.render('cars/add', { title: 'Add New Car', categories });
}

async function addCar(req, res) {
  const { imageUrl, formData } = res.locals;
  const { name, color, price, description, category, subcategory } = formData;
  const newCar = new Car({
    name,
    slug: slugify(name, { lower: true }),
    color,
    price: +price,
    description,
    category,
    subcategory,
    image: imageUrl,
  });
  await newCar.save();
  res.redirect('/');
}

async function editCarView(req, res) {
  const { carSlug } = req.params;
  const car = await Car.findOne({ slug: carSlug })
    .populate('category')
    .populate('subcategory')
    .lean();
  if (!car) {
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Car not found' });
  }
  const categories = await Category.find({}).lean();
  const subcategories = await Subcategory.find({
    category: car.category._id,
  }).lean();
  res.render('cars/edit', { car, categories, subcategories });
}

async function editCar(req, res) {
  const { carSlug } = req.params;
  const { imageUrl, formData } = res.locals;
  const { name, color, price, description, category, subcategory } = formData;
  const car = await Car.findOne({ slug: carSlug });
  if (!car)
    return res
      .status(404)
      .render('error', { title: 'Error', message: 'Car not found' });
  car.name = name;
  car.color = color;
  car.price = price;
  car.description = description;
  car.category = category;
  car.subcategory = subcategory;
  if (imageUrl) car.image = imageUrl;
  await car.save();
  res.redirect('/');
}

async function listCars(req, res) {
  const cars = await Car.find({}).populate('category').lean();
  const categories = await Category.find({}).populate('subcategories').lean();
  res.render('cars/list', { cars, categories });
}

export const addCarHandler = wrap(addCar);
export const addCarViewHandler = wrap(addCarView);
export const editCarHandler = wrap(editCar);
export const editCarViewHandler = wrap(editCarView);
export const listCarsHandler = wrap(listCars);
