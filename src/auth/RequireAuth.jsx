import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
 
const RequireAuth=({children})=>{
    const {user, isLoading} = useAuth();
 
    if(isLoading) return null;
 
    if(!user) return <Navigate to="/user/login"/>;
 
    return children;
}
 
export default RequireAuth;