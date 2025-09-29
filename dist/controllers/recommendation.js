import pool from "../database/db.js";
import { model } from "../utils/genAi.js";
export const getRecommendations = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT p.id,p.name,p.price,p.description 
        FROM product_embeddings pe
        JOIN products p ON pe.product_id = p.id
        WHERE p.id != $1
        ORDER BY pe.embedding <-> (SELECT embedding FROM product_embeddings WHERE product_id = $1)
        LIMIT 5`, [id]);
        res.status(200).json({ recommendations: result.rows });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};
export const getRecommendationsByText = async (req, res) => {
    const { queryText } = req.body;
    const embeddingResult = await model.embedContent(queryText);
    const queryEmbeddings = `[${embeddingResult.embedding.values.join(',')}]`;
    try {
        const result = await pool.query(`SELECT p.id, p.name, p.price, p.description
   FROM product_embeddings pe
   JOIN products p ON pe.product_id = p.id
   ORDER BY pe.embedding <-> $1
   LIMIT 10`, [queryEmbeddings]);
        res.status(200).json({ recommendations: result.rows });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get recommendation through text" });
    }
};
//# sourceMappingURL=recommendation.js.map