import { QueryError } from "mysql2";
import connection from "../connection/connection";
import { Request, Response } from "express";


const getuser = (req: Request, res: Response) => {
    const q = "SELECT * FROM user"
    connection.query(q, (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}

const adduser = (req: Request, res: Response) =>{
    const {name,img}= req.body;
    const q = "INSERT INTO user (name , img) VALUES (?,?)";
        connection.query(q,[name,img ?? null], (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}

export {
    getuser,
    adduser
};