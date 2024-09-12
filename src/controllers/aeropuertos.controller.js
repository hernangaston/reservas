import { db } from "../db.js";

export const getAeropuertos = async (req, res) => {
    let query = 'SELECT * FROM `Aeropuertos` WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAeropuerto = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Aeropuertos` WHERE `id_aeropuerto` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Aeropuerto not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createAeropuerto = async (req, res) => {
    const { nombre, ciudad, pais, codigo_iata } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Aeropuertos (nombre, ciudad, pais, codigo_iata) VALUES (?, ?, ?, ?)',
            [nombre, ciudad, pais, codigo_iata]
        );
        res.status(201).json({ message: 'Aeropuerto created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating aeropuerto:', error);
        res.status(500).json({ error: 'Failed to create aeropuerto' });
    }
};

export const updateAeropuerto = async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, pais, codigo_iata } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE Aeropuertos SET nombre = ?, ciudad = ?, pais = ?, codigo_iata = ? WHERE id_aeropuerto = ?',
            [nombre, ciudad, pais, codigo_iata, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Aeropuerto not found' });
        } else {
            res.json({ message: 'Aeropuerto updated successfully' });
        }
    } catch (error) {
        console.error('Error updating aeropuerto:', error);
        res.status(500).json({ error: 'Failed to update aeropuerto' });
    }
};

export const deleteAeropuerto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM `Aeropuertos` WHERE `id_aeropuerto` = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Aeropuerto not found' });
        } else {
            res.json({ message: 'Aeropuerto deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting aeropuerto:', error);
        res.status(500).json({ error: 'Failed to delete aeropuerto' });
    }

};
