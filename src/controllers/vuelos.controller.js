import { db } from "../db.js";

export const getVuelos = async (req, res) => {
    let query = 'SELECT * FROM Vuelos WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getVuelo = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Vuelos` WHERE `id_vuelo` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Vuelo not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createVuelo = async (req, res) => {
    const { id_aerolinea, id_aeropuerto_origen, id_aeropuerto_destino, fecha_salida, fecha_llegada, duracion, precio, estado } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Vuelos (id_aerolinea, id_aeropuerto_origen, id_aeropuerto_destino, fecha_salida, fecha_llegada, duracion, precio, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id_aerolinea, id_aeropuerto_origen, id_aeropuerto_destino, fecha_salida, fecha_llegada, duracion, precio, estado]
        );
        res.status(201).json({ message: 'Vuelo created successfully', id_vuelo: result.insertId });
    } catch (error) {
        console.error('Error creating vuelo:', error);
        res.status(500).json({ error: 'Failed to create vuelo' });
    }

};

export const updateVuelo = async (req, res) => {
    const { id } = req.params;
    const { id_aerolinea, id_aeropuerto_origen, id_aeropuerto_destino, fecha_salida, fecha_llegada, duracion, precio, estado } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE Vuelos SET id_aerolinea = ?, id_aeropuerto_origen = ?, id_aeropuerto_destino = ?, fecha_salida = ?, fecha_llegada = ?, duracion = ?, precio = ?, estado = ? WHERE id_vuelo = ?',
            [id_aerolinea, id_aeropuerto_origen, id_aeropuerto_destino, fecha_salida, fecha_llegada, duracion, precio, estado, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vuelo not found' });
        } else {
            res.json({ message: 'Vuelo updated successfully' });
        }
    } catch (error) {
        console.error('Error updating vuelo:', error);
        res.status(500).json({ error: 'Failed to update vuelo' });
    }
};

export const deleteVuelo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Vuelos WHERE id_vuelo = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vuelo not found' });
        } else {
            res.json({ message: 'Vuelo deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting vuelo:', error);
        res.status(500).json({ error: 'Failed to delete vuelo' });
    }

};
