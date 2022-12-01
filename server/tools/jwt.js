import jsonwebtoken from "jsonwebtoken";

const issueToken = (userId) => {
    
    const payload = {
        sub: userId,
    };
    const options = {
        expiresIn: "24 hours",
    };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, options);
    
    return token;
};

export default issueToken;