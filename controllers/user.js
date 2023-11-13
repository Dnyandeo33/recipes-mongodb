import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';
import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const userControllers = {
    register: async (req, res) => {
        const { email, password, rePassword } = req.body;
        try {
            const existEmail = await User.findOne({ email });

            if (existEmail) {
                return res
                    .status(400)
                    .json({ message: `Email already exits...` });
            }

            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            const isVerifyPassword = matchPasswords(password, rePassword);

            if (isValidEmail && isValidPassword && isVerifyPassword) {
                const hashedPassword = hashPassword(password);

                const addUser = await User.create({
                    email: email,
                    password: hashedPassword
                });

                return res
                    .status(201)
                    .json({
                        success: true,
                        message: `User with id ${email} created successfully...`
                    });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const existEmail = await User.findOne({ email });

            if (existEmail) {
                const isValid = bcrypt.compare(password, existEmail.password);

                if (isValid) {
                    const token = jwt.sign(
                        { user: existEmail.email },
                        process.env.TOKEN_ACCESS_SECRET
                    );
                    res.cookie('token', token, {
                        httpOnly: true,
                        sameSite: true
                    });
                    return res
                        .status(200)
                        .json({ success: true, token: token });
                } else {
                    res.status(401).json({
                        success: false,
                        message: `Email or password not valid`
                    });
                }
            } else {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: `User not found, please register...`
                    });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            await res.clearCookie('token');
            return res
                .status(200)
                .json({
                    success: true,
                    message: `User logged out successfully...`
                });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: error.message });
        }
    }
};

export default userControllers;
