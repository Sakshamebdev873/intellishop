import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../database/db";
interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin" | "guest";
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    "secret",
    { expiresIn: "7d" }
  );
};
const attachCookieToResponse = (res: Response, user: any) => {
  const token = generateToken(user);
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
    secure: process.env.NODE_ENV == "production" ? true : false,
    httpOnly: true,
  });
};
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name,email and password are required" });
  }
  try {
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const pasword_hash = await hashPassword(password);
    const result = await pool.query(
      `INSERT INTO users (name,email,password_hash)
            VALUES ($1,$2,$3) RETURNING id,name,email,role,is_active,created_at`,
      [name, email, pasword_hash]
    );
    const user: User = result.rows[0];
    res.status(201).json({ user });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user || !user.is_active) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = attachCookieToResponse(res, user);
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.send(204);
};
