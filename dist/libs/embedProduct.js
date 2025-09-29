import { GoogleGenerativeAI } from "@google/generative-ai";
import pool from "../database/db.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
async function embedProducts() {
    const products = await pool.query(`SELCT id,nmae,description
        FROM products
        WHERE id NOT IN (SELECT product_id FROM product_embeddings)`);
    for (const p of products.rows) {
        const text = `${p.name}. ${p.description ?? ""}`;
        try {
            const result = await model.embedContent(text);
            const embedding = result.embedding.values;
            await pool.query(`INSERT INTO product_embeddings (product_id, embedding) VALUES ($1,$2)`), [p.id, embedding];
            console.log(`✅ Embedded product ${p.id} - ${p.name}`);
        }
        catch (err) {
            console.error(`❌ Failed embedding for product ${p.id}:`, err);
        }
    }
}
embedProducts().then(() => {
    console.log("🎉 Embedding generation complete");
    process.exit(0);
});
//# sourceMappingURL=embedProduct.js.map