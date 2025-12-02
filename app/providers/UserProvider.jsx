"use client";

import { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext(null);

export function UserProvider({ children, initialUser }) {
  const [user] = useState(initialUser);

  const value = useMemo(() => ({ user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
