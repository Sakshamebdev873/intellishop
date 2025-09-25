import type { Request, Response } from "express";
import pool from "../database/db";


interface Product {
  id: Number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  created_at: Date;
  updated_at: Date;
}
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category } = req.body;
  if (!name || !price || stock == undefined) {
    return res
      .status(400)
      .json({ error: "Name,price , and stock are requrired" });
  }
  if (price <= 0) {
    return res.status(400).json({ error: "price cannot be negative" });
  }
  if (stock < 0) {
    return res.status(400).json({ error: "stock also cannot be negative" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO products (name,description,price,stock,category)
           VALUES ($1,$2,$3,$4,$5)
           RETURNING id,name,description,price,stock,category,created_at,updated_at`,
      [name, description || "", price, stock, category || "general"]
    );
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create product" });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, search } = req.query;
  try {
    let query = `SELECT id,name,description,price,stock,category,created_at,updated_at FROM products WHERE 1=1`;
    const values: any[] = [];
    let idx = 1;
    if (category) {
      query += ` AND category=$${idx++}`;
      values.push(category);
    }
    if (minPrice) {
      query += ` AND price <= $${idx++}`;
      values.push(Number);
    }
    if (maxPrice) {
      query += ` AND price >= $${idx++}`;
      values.push(Number(maxPrice));
    }
    if (search) {
      query += ` AND (LOWER(name) LIKE $${idx} OR LOWER(description) LIKE $${idx})`;
      values.push(`%${(search as string).toLowerCase()}%`);
    }
    const result = await pool.query(query, values);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id,name,description,price,stock,category,created_at,updated_at FROM products where id=$1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;
  if (price !== undefined && price <= 0) {
    return res.status(400).json({ error: "Price must be greater than 0" });
  }
  if (stock !== undefined && stock < 0) {
    return res.status(400).json({ error: "Stock cannot be negative" });
  }
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (name) {
      fields.push(`name=$${idx++}`);
      values.push(name);
    }
    if (description) {
      fields.push(`description=$${idx++}`);
      values.push(description);
    }
    if (price !== undefined) {
      fields.push(`price=$${idx++}`);
      values.push(price);
    }
    if (stock !== undefined) {
      fields.push(`stock=$${idx++}`);
      values.push(stock);
    }
    if (category) {
      fields.push(`category=$${idx++}`);
      values.push(category);
    }
    if (fields.length == 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }
    values.push(id);
    const query = `UPDATE products SET ${fields.join(
      ", "
    )}, updated_at=NOW() WHERE id=$${idx} RETURNING id, name, description, price, stock, category, created_at, updated_at`;
    const result = await pool.query(query, values);
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Product" });
  }
};

export const deleteProduct = async(req:Request,res:Response) =>{
    const {id} = req.params
    try {
        const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING id',[id])
       
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
    } catch (error:any) {
        console.log(error);
        
       res.status(500).json({error: "Failed to delete product"}) 
    }
}