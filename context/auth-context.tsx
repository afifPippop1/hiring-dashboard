import { getUser, signOut } from "@/actions/user.action";
import { Routes } from "@/lib/routes";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

interface IAuthContext {
  user: User | null;
  signOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  user: null,
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  async function signOutFn() {
    const { error } = await signOut();
    if (!error) {
      setUser(null);
      router.push(Routes.SignIn);
    }
  }

  React.useEffect(() => {
    if (data?.data.user) {
      setUser(data.data.user);
    }
  }, [data?.data.user]);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, signOut: signOutFn }}>
      {children}
    </AuthContext.Provider>
  );
}
