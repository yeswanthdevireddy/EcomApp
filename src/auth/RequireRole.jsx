import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
 
export default function RequireRole({role,children})
{
    const {user, isLoading} = useAuth();
 
    if(isLoading) return null;
 
    if(!user) return <Navigate to="/user/login"/>
    if (user.role !== role) return <Navigate to="/products" />;
 
    return children;
 
}