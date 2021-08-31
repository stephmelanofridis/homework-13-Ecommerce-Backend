const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data - Complete
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'linked_tag' }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data - Complete
  try {
    const tagData = await Tag.findByPk({
      include: [{ model: Product, through: ProductTag, as: 'linked_tag' }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No match with this ID. Please try again.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag - Complete
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value - Complete
  try {
    const tagData = await Tag.update({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No match with this ID. Please try again.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value - Complete
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No match with this ID. Please try again.' });
      return;
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
