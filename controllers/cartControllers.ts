import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import pool from "../database/db";

const getOrCreateCart = async (userId: number) => {
  try {
    const existing = await pool.query("SELECT id FROM carts WHERE user_id=$1", [
      userId,
    ]);
    if (existing.rows.length > 0) {
      return existing.rows[0].id;
    }
    const result = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING id",
      [userId]
    );
    return result.rows[0].id;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;
  if (!userId) return res.status(400).json({ error: "Unauthorized" });
  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Valid productId and quantity are required" });
  }
  try {
    const cartId = await getOrCreateCart(userId);
    const productRes = await pool.query(
      "SELECT stock FROM products where id=$1",
      [productId]
    );
    if (productRes.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });
    if (productRes.rows[0].stock < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }
    const result = await pool.query(
      `
                    INSERT INTO cart_items (cart_id,product_id,quantity)
                    VALUES ($1,$2,$3)
                    ON CONFLICT (cart_id,product_id)
                    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity, added_at=NOW()
                    RETURNING *
                    `,
      [cartId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add items to cart" });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(400).json({ error: "Unauthorised" });
  try {
    const cartRes = await pool.query("SELECT id FROM carts WHERE user_id=$1", [
      userId,
    ]);
    if (cartRes.rows.length === 0) return res.json([]);
    const cartId = cartRes.rows[0].id;
    const items = await pool.query(
      `SELECT ci.id,ci.quantity,ci.added_at,
              p.id as product_id, p.name, p.price, p.stock, p.category
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id=$1`,
      [cartId]
    );
    res.json(items.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;
  if (!userId) return res.status(400).json({ error: "Unauthorised" });
  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Valid productId and quantity  are required" });
  }
  try {
    const cartRes = await pool.query("SELECT id FROM carts WHERE user_id=$1", [
      userId,
    ]);
    if (cartRes.rows.length === 0)
      return res.status(404).json({ error: "Cart not found" });
    const cartId = cartRes.rows[0].id;
    const productRes = await pool.query(
      "SELECT stocks FROM products WHERE id=$1",
      [productId]
    );
    if (productRes.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });
    if (productRes.rows[0].stock < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }
    const result = await pool.query(
      `UPDATE cart_items 
        SET quantity=$1, added_at=NOW()
        WHERE cart_id=$2 AND product_id=$3
        RETURNING *`,
      [quantity, cartId, productId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};
export const removeCartItem = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  if (!userId) return res.status(401).json({ erro: "Unauthorised" });
  try {
    const cartRes = await pool.query("SELECT id FROM carts WHERE user_id=$1", [
      userId,
    ]);
    if (cartRes.rows.length === 0)
      return res.status(404).json({ error: "Cart not found" });
    const cartId = cartRes.rows[0].id;
    const result = await pool.query(
      "DELETE FROM cart_items WHERE cart_id=$1 AND product_id=$2 RETURNING id",
      [cartId, productId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};
export const clearCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const cartRes = await pool.query("SELECT id FROM carts WHERE user_id=$1", [
      userId,
    ]);
    if (cartRes.rows.length === 0)
      return res.json({ message: "Cart is already empty" });
    const cartId = cartRes.rows[0].id;

    await pool.query("DELETE FROM cart_items WHERE cart_id=$1", [cartId]);
    res.json({ message: "Cart cleared successfully" });
  } catch {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
