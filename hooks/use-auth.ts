import { AuthContext } from "@/context/auth-context";
import React from "react";

export function useAuth() {
  const ctx = React.useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }

  return ctx;
}
