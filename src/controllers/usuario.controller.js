import { db } from "../db.js";
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
    let query = 'SELECT * FROM `Usuarios` WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Usuarios` WHERE `id_usuario` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Usuario not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createUsuario = async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    try {
        const [result] = await db.query(
            'INSERT INTO Usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );
        res.status(201).json({ message: 'User created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    try {
        const [result] = await db.query(
            'UPDATE Usuarios SET nombre = ?, email = ?, contraseña = ? WHERE id_usuario = ?',
            [nombre, email, hashedPassword, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }

};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM `Usuarios` WHERE id_usuario = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Usuario not found' });
        } else {
            res.json({ message: 'Usuario deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting usuario:', error);
        res.status(500).json({ error: 'Failed to delete usuario' });
    }

};
