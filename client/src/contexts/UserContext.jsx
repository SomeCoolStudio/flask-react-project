import { Children, createContext, useState } from "react";

export const UserContext = createContext();

import React from 'react'

export default function UserProvider({ children }) {

    const [user, setUser] = useState({});

    const values = {
        user: user,
        setUser: setUser,
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}
