import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid token" });
    }
};
export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin privileges required' });
    }
    next();
};
//# sourceMappingURL=authMiddleware.js.map