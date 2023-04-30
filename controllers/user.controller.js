import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);

        // Hash password before saving to database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutAllSessions = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.json({ message: 'Logout successful from all devices' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMyProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates' });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMyAccount = async (req, res) => {
    try {
        await req.user.remove();
        res.json({ message: 'Account deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createUser, loginUser, logoutUser, logoutAllSessions, getMyProfile, updateMyProfile, deleteMyAccount, deleteUserAccount };
