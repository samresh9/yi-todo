import "dotenv/config";
import jwt from "jsonwebtoken";
import type { JwtPayload, Secret } from "jsonwebtoken";
console.log(typeof process.env.JWT_SECRET);

// need to make the type such that if the env is not present typescript should give us error
const jwtSecret = process.env.JWT_SECRET as Secret;
async function setUser(user: JwtPayload): Promise<string> {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
}

async function getUser(token: string): Promise<JwtPayload | null> {
  try {
    return jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error("JWT Token Error:", err.message);
    }
    if (err instanceof jwt.TokenExpiredError) {
      console.error("JWT Token Expired:", err.message);
    }
    return null;
  }
}

export { setUser, getUser };
