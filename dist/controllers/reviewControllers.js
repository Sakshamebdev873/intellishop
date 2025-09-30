import pool from "../database/db.js";
export const createReview = async (req, res) => {
    const userId = req.user?.id;
    const { product_id, rating, comment } = req.body;
    if (!product_id || !rating) {
        return res
            .status(400)
            .json({ message: "Product ID and rating are required" });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }
    try {
        const result = await pool.query(`INSERT INTO reviews (user_id,product_id,rating,comment)
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (user_id,product_id) DO UPDATE
            SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, updated_at = NOW()
            RETURNING *`, [userId, product_id, rating, comment]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create review." });
    }
};
export const getReviewByProduct = async (req, res) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(400).json({ message: "product ID is required" });
    }
    try {
        const result = await pool.query(`SELECT r.*,u.name AS user_name
            From reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = $1
            ORDER BY r.created_at DESC`, [productId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch reviews." });
    }
};
export const updateReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user?.id;
    const { rating, comment } = req.body;
    if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }
    try {
        const result = await pool.query(`
            UPDATE reviews 
            SET rating = COALESCE($1,rating),
                comment = COALESCE($2,comment),
                updated_at = NOW()
            WHERE id =$3 AND user_id = $4
            RETURNING *
            `, [rating, comment, reviewId, userId]);
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ message: "Review not found or unauthorized." });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update review." });
    }
};
export const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user?.id;
    try {
        const result = await pool.query(`
            DELETE FROM reviews WHERE id=$1 and user_id=$2 RETURNING * `, [reviewId, userId]);
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ message: "Review not found or unauthorized." });
        }
        res.status(200).json({ message: "Review deleted successfully." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete review." });
    }
};
//# sourceMappingURL=reviewControllers.js.map