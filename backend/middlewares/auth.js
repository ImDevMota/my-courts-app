import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    req.userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ message: "Token Inválido" });
  }

  next();
}

export default auth;
