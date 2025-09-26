import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import pool from "../database/db.js";
import { partialDeepStrictEqual } from "assert";

export const getOrders = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC`,
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(204).json({ message: "there are no orders" });
    }
    res.status(200).json(result.rows);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};
export const getOrderById = async (req: AuthRequest, res: Response) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({ message: "Order not found" });
  }
  try {
    const result = await pool.query(`SELECT * FROM orders WHERE id=$1`, [
      orderId,
    ]);
    if (result.rows.length == 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch the order." });
  }
};
export const createOrder = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { items, total_amount, shipping_address } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Order must have at least one item." });
  }
  if (!total_amount || total_amount <= 0) {
    return res
      .status(400)
      .json({ message: "Total amount must be greater than 0" });
  }
  if (!shipping_address || shipping_address.trim() === "") {
    return res.status(400).json({ message: "Shipping address is required" });
  }
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const orderResult = await client.query(
      `
        INSERT INTO orders (user_id,total_amount,shipping_address)
        VALUES ($1,$2,$3) RETURNING *
         `,
      [userId, total_amount, shipping_address]
    );
    const order = orderResult.rows[0];
    for (const item of items) {
      if (
        !item.product_id ||
        !item.quantity ||
        item.quantity <= 0 ||
        !item.price
      ) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Invalid item in order." });
      }
      await client.query(
        `INSERT INTO order_items (order_id,product_id,quantity,price)
                    VALUES ($1,$2,$3,$4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );
    }
    await client.query("COMMIT");
        res.status(201).json(order);
  } catch (error) {
     await client.query("ROLLBACK");
        console.error(error);
        res.status(500).json({ message: "Failed to create order." });
  }finally {
    client.release()
  }
};

export const updateOrder = async(req:AuthRequest,res:Response) =>{
    const orderId = req.params.id
    const userId = req.user?.id
    const {shipping_address,status} = req.body
    const allowedStatuses = ["pending","paid","shipped","delivered","cancelled"]
    if(status && !allowedStatuses.includes(status)){
        return res.status(400).json({message : "Invalid order status"})
    }
    if (shipping_address && shipping_address.trim() === "") {
        return res.status(400).json({ message: "Shipping address cannot be empty." });
    }
    try {
        const checkOrder = await pool.query(
            `SELECT * FROM orders WHERE id=$1 AND user_id = $2`,[orderId,userId]
        )
        if(checkOrder.rows.length === 0){
            return res.status(404).json({message : "Order not found or unauthorized"})
        }
        const result = await pool.query(
            `UPDATE orders 
            SET shipping_address = COALESCE($1,shipping_address)
            status = COALESCE($2)`
        )
    } catch (error) {
        
    }
}