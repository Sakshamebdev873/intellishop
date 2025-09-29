import type { Request, Response } from "express";
import pool from "../database/db.js";
import { model } from "../utils/genAi.js";

export const getRecommendations = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM (
       SELECT p.id, p.name, p.price, p.description, p.category,
              pe.embedding <#> (SELECT embedding FROM product_embeddings WHERE product_id = $1) AS d
       FROM products p
       JOIN product_embeddings pe ON p.id = pe.product_id
       WHERE p.category = (SELECT category FROM products WHERE id = $1)
        
) subquery
ORDER BY d
LIMIT 10`,
      [id]
    );
    
    res.status(200).json({ recommendations: result.rows });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};
export const getRecommendationsByText =async (req:Request,res:Response) =>{
  const {queryText} = req.body
  const embeddingResult = await model.embedContent(queryText)
  const queryEmbeddings = `[${embeddingResult.embedding.values.join(',')}]`
  try {
    const result = await pool.query(
  `SELECT p.id, p.name, p.price, p.description
   FROM product_embeddings pe
   JOIN products p ON pe.product_id = p.id
   ORDER BY pe.embedding <#> $1
   LIMIT 10`,
  [queryEmbeddings]
);
res.status(200).json({recommendations : result.rows})
  } catch (error:any) {
    console.log(error);
    res.status(500).json({message : "Failed to get recommendation through text"})
  }
}

