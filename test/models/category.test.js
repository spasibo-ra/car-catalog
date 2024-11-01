import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { expect } from 'chai';
import { Category, Subcategory } from '../../src/models/category.model.js';

const envFile = `.env.${process.env.NODE_ENV || 'test'}`;
dotenv.config({ path: envFile });

describe('Category Model', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  let category;
  it('should create a new category', async () => {
    category = new Category({ name: 'SUV', slug: 'suv' });
    const savedCategory = await category.save();
    expect(savedCategory).to.have.property('_id');
    expect(savedCategory.name).to.equal('SUV');
  });

  it('should not create a category without a name', async () => {
    const category = new Category({ slug: 'sedan' });
    try {
      await category.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.name).to.exist;
    }
  });

  it('should create a subcategory linked to a category', async () => {
    const subcategory = new Subcategory({
      name: 'Compact Sedan',
      slug: 'compact-sedan',
      category: category._id,
    });
    const savedSubcategory = await subcategory.save();
    expect(savedSubcategory).to.have.property('_id');
    expect(savedSubcategory.category.toString()).to.equal(
      category._id.toString()
    );
  });
});
