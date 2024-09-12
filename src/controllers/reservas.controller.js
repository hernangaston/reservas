import { db } from "../db.js";

export const getReservas = async (req, res) => {
    let query = 'SELECT * FROM `Reservas` WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Reservas` WHERE `id_reserva` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Reserva not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createReserva = async (req, res) => {
    const { id_usuario, id_vuelo, id_pasajero, estado } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO `Reservas` (id_usuario, id_vuelo, id_pasajero, estado) VALUES (?, ?, ?, ?)',
            [id_usuario, id_vuelo, id_pasajero, estado]
        );
        res.status(201).json({ message: 'Reservation created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
};

export const updateReserva = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, id_vuelo, id_pasajero, estado } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE `Reservas` SET id_usuario = ?, id_vuelo = ?, id_pasajero = ?, estado = ? WHERE id_reserva = ?',
            [id_usuario, id_vuelo, id_pasajero, estado, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reservation not found' });
        } else {
            res.json({ message: 'Reservation updated successfully' });
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Failed to update reservation' });
    }

};

export const deleteReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM `Reservas` WHERE `id_reserva` = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reserva not found' });
        } else {
            res.json({ message: 'Reserva deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting reserva:', error);
        res.status(500).json({ error: 'Failed to delete reserva' });
    }

};
