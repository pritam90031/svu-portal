import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
