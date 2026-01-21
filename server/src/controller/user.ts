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
const getuserbyid = (req: Request, res: Response) => {
    const {id}= req.params;
    const q = "SELECT * FROM user WHERE id = ?"
    connection.query(q, [id],(err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}

const adduser = (req: Request, res: Response) =>{
    const {name}= req.body;
    const img = req.file? req.file.filename:null
    const q = "INSERT INTO user (name , img) VALUES (?,?)";
        connection.query(q,[name,img], (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}

const edituser =(req: Request, res: Response) =>{
    const {id}= req.params;
    const {name}= req.body;
    const img = req.file? req.file.filename:null
    const q = "UPDATE user SET name = ? , img =? WHERE id=?";
        connection.query(q,[name,img,id], (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}

export {
    getuser,
    adduser,
    getuserbyid,
    edituser
};