import mongoose from 'mongoose';

//create Schema
const usersSchema = new mongoose.Schema({
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    name: { type: 'string', required: true },
    role: { type: 'string', required: true },
    rollNumber: { type: 'string' },
    department: { type: 'string' },
    semester: { type: 'string' },
    avatarColor: { type: 'string', required: true },
}, { timestamps: true });

usersSchema.index({ username: 1 }, { unique: true });

const Users = mongoose.model('Users', usersSchema)

export default Users;