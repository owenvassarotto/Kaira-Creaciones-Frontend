import { useEffect } from "react";
import { createContext, useState } from "react";
import axiosClient from "../src/config/axios";
import notify from "../src/helpers/showNotification";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    
    const authUser = async () => {

        const token = localStorage.getItem("token_kaira_creaciones");

        if(!token) {
            setLoading(false);
            return;
        }
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }

        try {
            const { data } = await axiosClient('/users/profile', config);

            // set user data 
            setAuth(data);

        } catch (error) {
            console.error(error);

            setAuth({});
        }

        setLoading(false);
    }

    useEffect(() => {
        authUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token_kaira_creaciones');
        setAuth({});
    }

    const updateUser = async ({id, name, email, phone_number}) => {

        const token = localStorage.getItem("token_kaira_creaciones");

        if(!token) {
            return;
        }
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }

        try {
            const { data } = await axiosClient.put(`/users/${id}`, {name, phone_number, email}, config);

            notify("success", "Usuario actualizado correctamente");

            setAuth(data);

        } catch (error) {
            notify("error", error.response.data.message)
        }
    }

    const updatePassword = async ({ actualPassword, newPassword }) => {
        const token = localStorage.getItem("token_kaira_creaciones");

        if(!token) {
            return;
        }
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }

        try {
            const { data } = await axiosClient.put('/users/reset-password', { actualPassword, newPassword }, config);

            notify("success", data.message);
        } catch (error) {
            notify("error", error.response.data.message);
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                auth, 
                setAuth,
                loading,
                logout,
                updateUser,
                updatePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

