import mongoose from 'mongoose';

const libraryBookSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    name: { type: String, required: true },
    total: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model('LibraryBook', libraryBookSchema);
