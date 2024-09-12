import { db } from "../db.js";

export const getPasajeros = async (req, res) => {
    let query = 'SELECT * FROM `Pasajeros` WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPasajero = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Pasajeros` WHERE `id_pasajero` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Pasajero not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createPasajero = async (req, res) => {
    const { nombre, apellido, documento, fecha_nacimiento } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO `Pasajeros` (nombre, apellido, documento, fecha_nacimiento) VALUES (?, ?, ?, ?)',
            [nombre, apellido, documento, fecha_nacimiento]
        );
        res.status(201).json({ message: 'Pasajero created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating pasajero:', error);
        res.status(500).json({ error: 'Failed to create pasajero' });
    }
};

export const updatePasajero = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, documento, fecha_nacimiento } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE `Pasajeros` SET nombre = ?, apellido = ?, documento = ?, fecha_nacimiento = ? WHERE id_pasajero = ?',
            [nombre, apellido, documento, fecha_nacimiento, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pasajero not found' });
        } else {
            res.json({ message: 'Pasajero updated successfully' });
        }
    } catch (error) {
        console.error('Error updating pasajero:', error);
        res.status(500).json({ error: 'Failed to update pasajero' });
    }
};

export const deletePasajero = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM `Pasajeros` WHERE `id_pasajero` = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pasajero not found' });
        } else {
            res.json({ message: 'Pasajero deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting pasajero:', error);
        res.status(500).json({ error: 'Failed to delete pasajero' });
    }

};
