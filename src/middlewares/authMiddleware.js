import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)  return  res.status(401).json({ message: "Unauthorized" });

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
        next();
  } catch {
   return res.status(500).json({ message: "server error form auth" });
  }
}
