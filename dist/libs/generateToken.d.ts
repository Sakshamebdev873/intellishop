interface User {
    id: number;
    name: string;
    email: string;
    role: "customer" | "admin" | "guest";
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
declare const generateToken: (user: User) => string;
export default generateToken;
//# sourceMappingURL=generateToken.d.ts.map