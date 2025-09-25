import jwt from 'jsonwebtoken';
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, "secret", { expiresIn: "7d" });
};
export default generateToken;
//# sourceMappingURL=generateToken.js.map