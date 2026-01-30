import { useAuthContext } from "../context/AuthContext";

function CanManageProducts({ children }) {
    const { user } = useAuthContext();
  
    if (!user) return null;
  
    return [1, 2, 3].includes(user.role_id) ? children : null;
}

export default CanManageProducts