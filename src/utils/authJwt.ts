import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { JwtPayload, Secret } from "jsonwebtoken";
dotenv.config();
// const jwtSecret: Secret = "samresh";
const jwtSecret: Secret = process.env.JWT_SECRETKEY as Secret;
// interface User {
//   id: number;
//   email: string;
// }

async function setUser(user: JwtPayload): Promise<string> {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, jwtSecret);
}

async function getUser(token: string): Promise<JwtPayload> {
  return jwt.verify(token, jwtSecret) as JwtPayload;
}

export { setUser, getUser };
