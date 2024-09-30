// hooks/useAuth.ts
import { Users } from "@prisma/client";
import cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";

interface User extends JwtPayload {
  user: Users;
}

const secret = "ykjasbfjafijafiuhqiufhf";

const useAuth = (): { user: User | null; loading: boolean; error: string | null } => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parseToken = () => {
      try {
        const cookies = cookie.parse(document.cookie); // Get cookies from the document
        const token = cookies.token; // Access your JWT token

        if (token) {
          const decodedUser = jwt.verify(token, secret) as User; // Decode the token to get user data
          setUser(decodedUser);
        } else {
          setUser(null); // No token found
        }
      } catch (err) {
        setError("Failed to verify token");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    parseToken();
  }, []);

  return { user, loading, error };
};

export default useAuth;
