const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'productName', 'price', 'quantity', 'category_id']
    }
  }).then(categoryData => res.json(categoryData)) 
  
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'productName', 'price', 'quantity', 'category_id']
    }
  }).then(categoryData => {
    if(!categoryData) {
      res.status(404).json({ message: 'Can not find categories! Check Id' })
      return;
    }
    res.json(categoryData);
  })
  
  .catch(err => {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    categoryName: req.body.categoryName
  }).then(categoryData => res.json(categoryData))
    
  .catch(err => {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
    where: {
      id: req.params.id
    }

  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Id not found' });
      return;
    }
    res.json(categoryData);
  })
  
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  Category.delete({
    where: {
      id: req.params.id
    }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Could not find category with that ID' });
      return;
    }
    res.json(categoryData);
  })
  
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
