import pool from "../database/db.js";
const getRecommendations = async (req, res) => {
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
export default getRecommendations;
//# sourceMappingURL=recommendation.js.map