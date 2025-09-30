import pool from "../database/db.js";
export const getOrders = async (req, res) => {
    const userId = req.user?.id;
    try {
        const result = await pool.query(`SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC`, [userId]);
        if (result.rows.length === 0) {
            return res.status(204).json({ message: "there are no orders" });
        }
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch orders." });
    }
};
export const getOrderById = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch the order." });
    }
};
export const createOrder = async (req, res) => {
    const userId = req.user?.id;
    const { items, shipping_address } = req.body;
    // basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must have at least one item." });
    }
    if (!shipping_address || shipping_address.trim() === "") {
        return res.status(400).json({ message: "Shipping address is required" });
    }
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        // Lock products so stock can’t go negative in concurrent orders
        const productIds = items.map((i) => i.product_id);
        const productRows = await client.query(`SELECT id, price, stock FROM products WHERE id = ANY($1) FOR UPDATE`, [productIds]);
        const productMap = new Map(productRows.rows.map((p) => [p.id, p]));
        // Calculate total & check stock
        let totalAmount = 0;
        for (const item of items) {
            const product = productMap.get(item.product_id);
            if (!product)
                throw new Error(`Product ${item.product_id} not found`);
            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for product ${item.product_id}`);
            }
            totalAmount += Number(product.price) * item.quantity;
        }
        // Create order
        const orderRes = await client.query(`INSERT INTO orders (user_id, total_amount, shipping_address)
       VALUES ($1, $2, $3) RETURNING *`, [userId, totalAmount, shipping_address]);
        const order = orderRes.rows[0];
        // Insert order_items and update stock
        for (const item of items) {
            const product = productMap.get(item.product_id);
            const unitPrice = Number(product.price);
            await client.query(`INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`, [order.id, item.product_id, item.quantity, unitPrice]);
            await client.query(`UPDATE products SET stock = stock - $1 WHERE id = $2`, [item.quantity, item.product_id]);
        }
        await client.query("COMMIT");
        return res.status(201).json({
            orderId: order.id,
            total_amount: totalAmount,
            shipping_address,
            items: items.map((i) => ({
                product_id: i.product_id,
                quantity: i.quantity
            }))
        });
    }
    catch (err) {
        await client.query("ROLLBACK");
        console.error("Create order error:", err);
        return res.status(500).json({ message: err.message || "Failed to create order." });
    }
    finally {
        client.release();
    }
};
export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user?.id;
    const { shipping_address, status } = req.body;
    const allowedStatuses = [
        "cancelled",
    ];
    if (status && !allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid order status" });
    }
    if (shipping_address && shipping_address.trim() === "") {
        return res
            .status(400)
            .json({ message: "Shipping address cannot be empty." });
    }
    try {
        const checkOrder = await pool.query(`SELECT * FROM orders WHERE id=$1 AND user_id = $2`, [orderId, userId]);
        if (checkOrder.rows.length === 0) {
            return res
                .status(404)
                .json({ message: "Order not found or unauthorized" });
        }
        const result = await pool.query(`UPDATE orders 
            SET status = COALESCE($1)`, [status]);
        res.status(200).json({ message: "order cancelled sucesfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update order." });
    }
};
//# sourceMappingURL=ordersControllers.js.map