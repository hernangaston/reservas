import { db } from "../db.js";

export const getPagos = async (req, res) => {
    let query = 'SELECT * FROM `Pagos` WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPago = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Pagos` WHERE `id_pago` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Pago not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createPago = async (req, res) => {
    const { id_reserva, monto, metodo_pago, estado } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Pagos (id_reserva, monto, metodo_pago, estado) VALUES (?, ?, ?, ?)',
            [id_reserva, monto, metodo_pago, estado]
        );
        res.status(201).json({ message: 'Pago created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating pago:', error);
        res.status(500).json({ error: 'Failed to create pago' });
    }

};

export const updatePago = async (req, res) => {
    const { id } = req.params;
    const { id_reserva, monto, metodo_pago, estado } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE `Pagos` SET id_reserva = ?, monto = ?, metodo_pago = ?, estado = ? WHERE `id_pago` = ?',
            [id_reserva, monto, metodo_pago, estado, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pago not found' });
        } else {
            res.json({ message: 'Pago updated successfully' });
        }
    } catch (error) {
        console.error('Error updating pago:', error);
        res.status(500).json({ error: 'Failed to update pago' });
    }
};

export const deletePago = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM `Pagos` WHERE `id_pago` = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pago not found' });
        } else {
            res.json({ message: 'Pago deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting pago:', error);
        res.status(500).json({ error: 'Failed to delete pago' });
    }

};
