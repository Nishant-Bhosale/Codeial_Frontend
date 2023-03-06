import { createContext } from "react";
import { useProvideAuth } from '../hooks';

const intialState = {
    user: null,
    login: () => {},
    logout: () => {},
    loading: true,
    signup: () => {},
    updateUser: () => {},
    updateUserFriends: () => {},
};

export const AuthContext = createContext(intialState);

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();  

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};