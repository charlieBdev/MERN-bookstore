import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

// POST: a new book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    }

    const book = await Book.create(newBook)

    return response.status(201).send(book)

  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message})
  }
})

// GET: all books
router.get('/', async (_, response) => {
  try {
    const books = await Book.find({})

    return response.status(200).json({
      count: books.length,
      data: books
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message})
  }
})

// GET: a book by id
router.get('/:id', async (request, response) => {

  const { id } = request.params

  try {
    const book = await Book.findById(id)

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).json(book)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message})
  }
})

// PUT: update a book by id
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE: a book by id
router.delete('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' })

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})

export default router