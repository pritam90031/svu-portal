import usersModel from '../models/users.js';
import bookModel from '../models/books.js';

export default {
    userLogin: async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        try {
            const password = req.body.password;
            const username = req.body.username;
            const authUser = await usersModel.findOne({ username: username });
            if (!authUser) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const isMatch = password == authUser.password;
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.json({ success: true, doc: {   _id: authUser._id, username: authUser.username } });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    createBooks: async(req, res) => {
        try {
            const { department, semester, student, subject, book } = req.body;
            if (!department || !semester || !student || !subject || !book) { return res.status(400).json({ err: "All fields are required" }) }
            const bookAdded = await bookModel.create({ department: department, semester: semester, student: student, subject: subject, book: book });
            if (!bookAdded) { return res.status(400).json({ status: false, msg: "Failed to create book" }) }
            res.status(201).json({ status: true, msg: "Book created successfully", doc: bookAdded });
        }
        catch (err) { res.status(400).json({ msg: err.message }) }
    },
    listBooks: async (req, res) => {
        try {
            const allBooks = await bookModel.find();
            console.log(allBooks)
            res.status(200).json({ docs: allBooks });
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    },
}