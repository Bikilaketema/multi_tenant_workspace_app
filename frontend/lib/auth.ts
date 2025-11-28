import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  fetchOptions: {
    credentials: "include", 
    headers: {
      "Origin": "http://localhost:3001",
    }
  },
});
