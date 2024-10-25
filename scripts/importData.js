import fs from 'node:fs';
import mongoose from 'mongoose';
import path from 'node:path';
import { Category, Subcategory } from '../src/models/category.model.js';
import Car from '../src/models/car.model.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const importCategories = async (categories) => {
  for (const categoryData of categories) {
    const { name, slug, subcategories } = categoryData;

    let category = await Category.findOne({ slug });
    if (!category) {
      category = new Category({ name, slug });
      await category.save();
    }

    for (const subcategoryData of subcategories) {
      const { name: subName, slug: subSlug } = subcategoryData;

      let subcategory = await Subcategory.findOne({ slug: subSlug });
      if (!subcategory) {
        subcategory = new Subcategory({ name: subName, slug: subSlug, category: category._id });
        await subcategory.save();
      }
      if (!category.subcategories.includes(subcategory._id)) {
        category.subcategories.push(subcategory._id);
      }
    }

    await category.save();
  }
};

const importCars = async (cars) => {
  for (const carData of cars) {
    const { name, slug, color, price, description, category: categoryName, subcategory: subcategoryName, imageUrl } = carData;

    const category = await Category.findOne({ slug: categoryName });
    if (!category) {
      console.error(`Category "${categoryName}" not found for car "${name}"`);
      continue;
    }

    const subcategory = await Subcategory.findOne({ slug: subcategoryName, category: category._id });
    if (!subcategory) {
      console.error(`Subcategory "${subcategoryName}" not found for car "${name}"`);
      continue;
    }

    let car = await Car.findOne({ slug });
    if (!car) {
      car = new Car({
        name,
        slug,
        color,
        price,
        description,
        category: category._id,
        subcategory: subcategory._id,
        imageUrl
      });
      await car.save();
    }
  }
};

const importData = async (filePath) => {
  try {
    
    const dataPath = path.resolve(filePath);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    if (data.categories) {
      console.log('Importing categories and subcategories...');
      await importCategories(data.categories);
      console.log('Categories and subcategories imported successfully.');
    }

    if (data.cars) {
      console.log('Importing cars...');
      await importCars(data.cars);
      console.log('Cars imported successfully.');
    }

    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

const [,, filePath] = process.argv;

if (!filePath) {
  console.error('Please provide a path to the JSON file.');
  process.exit(1);
}

importData(filePath);