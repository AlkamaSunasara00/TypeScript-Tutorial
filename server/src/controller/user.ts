import { QueryError } from "mysql2";
import connection from "../connection/connection";
import { Request, Response } from "express";
import { slugify } from "../utils/slugify";


const getuser = (req: Request, res: Response) => {
    const q = "SELECT * FROM user"
    connection.query(q, (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}
const getuserbyslug = (req: Request, res: Response) => {
    const {slug}= req.params;
    const q = "SELECT * FROM user WHERE slug = ?"
    connection.query(q, [slug],(err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}

// const adduser = (req: Request, res: Response) =>{
//     const {name}= req.body;
//     const img = req.file? req.file.filename:null
//     const baseSlug = slugify(name);
//     const finalSlug = `${baseSlug}-${Date.now()}`;
//     const q = "INSERT INTO user (name ,slug, img) VALUES (?,?,?)";
//         connection.query(q,[name,finalSlug,img], (err: QueryError | null, data: any[]) => {
//         if (err) return res.status(500).json({ error: "database error", details: err })
//         return res.json(data)
//     })
// }

const adduser = (req: Request, res: Response) => {
  const { name } = req.body;
  const img = req.file ? req.file.filename : null;

  const baseSlug = slugify(name);

  // Step 1: insert without slug
  const q1 = "INSERT INTO user (name, img) VALUES (?,?)";

  connection.query(q1, [name, img], (err, result: any) => {
    if (err) return res.status(500).json(err);

    const id = result.insertId;
    const finalSlug = `${baseSlug}-${id}`;

    // Step 2: update slug
    const q2 = "UPDATE user SET slug=? WHERE id=?";
    connection.query(q2, [finalSlug, id], (err2) => {
      if (err2) return res.status(500).json(err2);

      return res.json({
        message: "User created",
        id,
        slug: finalSlug,
      });
    });
  });
};


const edituser =(req: Request, res: Response) =>{
    const {id}= req.params;
    const {name}= req.body;
    const {slug}= req.params;
    const img = req.file? req.file.filename:null
    const q = "UPDATE user SET name = ? , img =? WHERE slug=?";
        connection.query(q,[name,img,slug], (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}


const deleteuser = (req: Request, res: Response) =>{
    const {id}= req.params;
    const q = "DELETE FROM user  WHERE id=?";
        connection.query(q,[id], (err: QueryError | null, data: any[]) => {
        if (err) return res.status(500).json({ error: "database error", details: err })
        return res.json(data)
    })
}
export {
    getuser,
    adduser,
    getuserbyslug,
    edituser,
    deleteuser
};