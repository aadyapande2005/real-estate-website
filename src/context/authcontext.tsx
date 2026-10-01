import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextValue, User } from "../types";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthContextProvider");
    return context;
}

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) as User : null;
    })

    const updateUser = (data: User | null) => {
        setCurrentUser(data)
    }

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser, updateUser}}>
                {children}
            </AuthContext.Provider>
}