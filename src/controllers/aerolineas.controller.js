import { db } from "../db.js";

export const getAerolineas = async (req, res) => {
    let query = 'SELECT * FROM `Aerolineas` WHERE 1=1';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAerolinea = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await db.execute("SELECT * FROM `Aerolineas` WHERE `id_aerolinea` = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Aerolinea not found' });
        }
    } catch (err) {
        console.error("Error executing query", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createAerolinea = async (req, res) => {
    const { nombre, codigo_iata } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO `Aerolineas` (nombre, codigo_iata) VALUES (?, ?)',
      [nombre, codigo_iata]
    );
    res.status(201).json({ message: 'Airline created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating airline:', error);
    res.status(500).json({ error: 'Failed to create airline' });
  }
    
};

export const updateAerolinea = async (req, res) => {
    const { id } = req.params;
  const { nombre, codigo_iata } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE `Aerolineas` SET nombre = ?, codigo_iata = ? WHERE id_aerolinea = ?',
      [nombre, codigo_iata, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Aerolinea not found' });
    } else {
      res.json({ message: 'Aerolinea updated successfully' });
    }
  } catch (error) {
    console.error('Error updating aerolinea:', error);
    res.status(500).json({ error: 'Failed to update aerolinea' });
  }
    
};

export const deleteAerolinea = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM `Aerolineas` WHERE `id_aerolinea` = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pago not found' });
        } else {
            res.json({ message: 'Aerolinea deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting aerolinea:', error);
        res.status(500).json({ error: 'Failed to delete aerolinea' });
    }

};
