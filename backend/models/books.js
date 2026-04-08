import mongoose from 'mongoose';

//create Schema
const bookSchema = new mongoose.Schema({
    department: { type: 'string', required: true },
    semester: { type: 'string', required: true },
    student: { type: 'string', required: true },
    subject: { type: 'string', required: true },
    book: { type: 'string', required: true },
}, { timestamps: true });


const Book = mongoose.model('Book', bookSchema)

export default Book;