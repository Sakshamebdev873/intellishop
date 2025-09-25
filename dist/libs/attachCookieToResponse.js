import generateToken from "./generateToken";
const attachCookieToResponse = (res, user) => {
    const token = generateToken(user);
    res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
        secure: process.env.NODE_ENV == "production" ? true : false,
        httpOnly: true,
    });
};
export default attachCookieToResponse;
//# sourceMappingURL=attachCookieToResponse.js.map