// utils/auth.ts
import cookie from "cookie";
import { IncomingMessage } from "http"; // Import IncomingMessage from Node.js
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = "ykjasbfjafijafiuhqiufhf"; // Match the secret used during login

// Use IncomingMessage for req parameter type
interface AuthRequest extends IncomingMessage {
  headers: {
    cookie: string;
  };
}

// Extend the return type to include JwtPayload
export const verifyToken = (req: AuthRequest): JwtPayload | null => {
  // Parse cookies from the request or from the document in the browser context
  const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  const token = cookies.token;

  // If no token, return null
  if (!token) return null;

  try {
    // Return the decoded JWT payload
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    console.error("Token verification error:", error); // Use console.error for better visibility
    return null; // Return null in case of an error
  }
};
