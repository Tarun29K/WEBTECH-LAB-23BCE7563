const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//db connection
const mongoURI = 'mongodb://localhost:27017/shopDB';

mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error:', err));

//schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    inStock: { type: Boolean, default: true }
});

//create model
const Product = mongoose.model('Product', productSchema);

//create
app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//read
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//update
app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).send('Product not found.');
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//delete
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send('Product not found.');
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));