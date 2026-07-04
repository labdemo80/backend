const Item = require('../models/Item');

// @desc  Get all items
// @route GET /api/items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single item
// @route GET /api/items/:id
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create new item
// @route POST /api/items
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Update item
// @route PUT /api/items/:id
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Delete item
// @route DELETE /api/items/:id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------- EJS View Handlers ----------

// @desc  Render home page with list of items
// @route GET /
exports.renderHome = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render('index', { items, error: null });
  } catch (error) {
    res.render('index', { items: [], error: error.message });
  }
};

// @desc  Render edit page for a single item
// @route GET /items/:id/edit
exports.renderEditPage = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.redirect('/');
    res.render('edit', { item, error: null });
  } catch (error) {
    res.redirect('/');
  }
};

// @desc  Handle create from form submission
// @route POST /items
exports.createItemView = async (req, res) => {
  try {
    await Item.create({ name: req.body.name, description: req.body.description });
    res.redirect('/');
  } catch (error) {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render('index', { items, error: error.message });
  }
};

// @desc  Handle update from form submission
// @route PUT /items/:id
exports.updateItemView = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
    }, { runValidators: true });
    res.redirect('/');
  } catch (error) {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item, error: error.message });
  }
};

// @desc  Handle delete from form submission
// @route DELETE /items/:id
exports.deleteItemView = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
  } catch (error) {
    // swallow error, just redirect back
  }
  res.redirect('/');
};
