import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//mongodb connect
mongoose.connect('mongodb://127.0.0.1:27017/bookDB');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('book', bookSchema);

//search
app.get('/books/search', async (req, res) => {
    const { title } = req.query;
    const results = await Book.find({ title: { $regex: title, $options: "i" } });
    res.json(results);
});

//category filter
app.get('/books/category/:cat', async (req, res) => {
    const results = await Book.find({ category: req.params.cat });
    res.json(results);
});

//sorting price
app.get('/books/sort/:field', async (req, res) => {
    const field = req.params.field;
    const order = field === 'price' ? 1 : -1;
    const results = await Book.find().sort({ [field]: order });
    res.json(results);
});

//sort by rating
app.get('/books/top', async (req, res) => {
    const results = await Book.find({ rating: { $gte: 4 } }).limit(5);
    res.json(results);
});

//Pagination
app.get('/books', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const results = await Book.find().skip(skip).limit(limit);
    res.json(results);
});

app.listen(port, () => console.log("Book Finder running at http://localhost:3000"));