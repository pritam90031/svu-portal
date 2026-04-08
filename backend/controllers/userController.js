import userModel from '../models/user.js';

export default {
    createUser: async (req, res) => {
        try {
            const { name, email, age } = req.body;
            if (!name || !email || !age) { return res.status(400).json({ err: "All fields are required" }) }
            const userAdded = await userModel.create({ name: name, email: email, age: age });
            if (!userAdded) { return res.status(400).json({ status: false, msg: "Failed to create user" }) }
            res.status(201).json({ status: true, msg: "User created successfully", data: userAdded });
        }
        catch (err) { res.status(400).json({ msg: err.message }) }
    },
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await userModel.find();
            res.status(200).json({ docs: allUsers });
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) { return res.status(400).json({ err: "User ID is required" }) }
            const userData = await userModel.findById(id);
            if (!userData) { return res.status(404).json({ msg: "User not found" }) }
            res.status(200).json({ data: userData });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const details = req.body;
            if (!id) { return res.status(400).json({ msg: "User ID is required" }) }
            if (!details) { return res.status(400).json({ msg: "Update details are required" }) }
            const updatedData = await userModel.findByIdAndUpdate(id, details, { new: true });
            if (!updatedData) { return res.status(404).json({ msg: "User not found or update failed" }) }
            res.status(200).json({ message: "User updated successfully", data: updatedData });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) { return res.status(400).json({ msg: "User ID is required" }) }
            const userData = await userModel.findByIdAndDelete({ _id: id });
            if (!userData) { return res.status(404).json({ msg: "User not found or delete failed" }) }
            res.status(200).json({ message: "User deleted successfully", data: userData });
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    }
}