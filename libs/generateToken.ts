import jwt from 'jsonwebtoken'
interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin" | "guest";
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    "secret",
    { expiresIn: "7d" }
  );
};
export default generateToken