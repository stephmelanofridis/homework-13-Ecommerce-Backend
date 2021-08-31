// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category - Complete
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products - Complete
Category.hasMany(Products, {
  foreignKey: 'category_id',
  onDelete: 'NULL',
});

// Products belongToMany Tags (through ProductTag) - Complete
Product.belongsToMany(Tag, {
  through: {
    model: 'product_tag',
    unique: false,
  },
  as: 'linked_tags',
});

// Tags belongToMany Products (through ProductTag) - Complete
Tag.belongsToMany(Product, {
  through: {
    model: 'product_tag',
    unique: false,
  },
  as: 'linked_products',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
