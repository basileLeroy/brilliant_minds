import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import mariadb from "mariadb"
config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5
})

const allowlist = [process.env.CLIENT_BASE_URL, 'http://localhost:5500', 'http://127.0.0.1:5500']

app.use(cors({
    origin: allowlist,
}))
app.use(express.json());

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

// Extra; Add middleware to check for req.body to have the right values
app.post("/new", async (req, res) => {

    let conn;

    try {
        conn = await pool.getConnection();
        const statement = await conn.prepare("INSERT INTO brilliant_minds.ideas (title, description) VALUES (?,?)")
        await statement.execute([req.body.title, req.body.description]);
        // create a new database instance
        res.status(200).send("ok");
    } catch (err) {
        res.status(503).send(err)
    } finally {
        if (conn) conn.end();
    }
})

app.delete("/delete", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const statement = await connection.prepare("DELETE FROM ideas WHERE id=?")
        await statement.execute([req.body.id])
        
        res.send({query:true})
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.end();
    }
})

app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})