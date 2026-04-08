import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
    number: { type: Number, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('Semester', semesterSchema);
