import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import mariadb from "mariadb"
config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const app = express();

app.use(express.json());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5
})


app.use(cors())

app.get("/", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection()
        const data = await connection.query(
            "SELECT * FROM ideas;"
        )
        
        res.send(data)
    } catch (error) {
        throw error
    } finally {
        if (connection) connection.end()
    }
})

app.delete("/delete/:id", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const prepare = await connection.prepare(
            "DELETE FROM ideas WHERE id = ?;"
        )
        const data = await prepare.execute([req.params.id])
        res.send(data)
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.end();
    }
})

app.get("/ideas/:id", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const prepare = await connection.prepare(
            "SELECT * FROM ideas WHERE id = ?"
        )
        const data = await prepare.execute([req.params.id])
        res.send(data)
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.end();
    }
})

app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})