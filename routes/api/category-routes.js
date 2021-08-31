const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products - Complete
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products - Complete
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No match with this ID. Please try again.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category - Complete
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value - Complete
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No match with this ID. Please try again.' });
      return;
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value - Complete
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No match with this ID. Please try again.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
