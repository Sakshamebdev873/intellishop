import { GoogleGenerativeAI } from "@google/generative-ai";
import pool from "../database/db.js";
import { model } from "../utils/genAi.js";
async function embedProducts() {
    const products = await pool.query(`SELECT id, name, description
     FROM products
     WHERE id NOT IN (SELECT product_id FROM product_embeddings)`);
    for (const p of products.rows) {
        const text = `${p.name}. ${p.description ?? ""}`;
        try {
            const result = await model.embedContent(text);
            const embedding = result.embedding.values;
            const vectorString = `[${embedding.join(",")}]`;
            await pool.query(`INSERT INTO product_embeddings (product_id, embedding) VALUES ($1, $2)`, [p.id, vectorString]);
            console.log(`✅ Embedded product ${p.id} - ${p.name}`);
        }
        catch (err) {
            console.error(`❌ Failed embedding for product ${p.id}:`, err);
        }
    }
}
embedProducts()
    .then(() => {
    console.log("🎉 Embedding generation complete");
    process.exit(0);
})
    .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
//# sourceMappingURL=embedProduct.js.map