import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function UserPage() {
    const {ready, user} = useContext(UserContext);

    if (!ready){
        return 'Loading...'
    }

    if (ready && !user){
        return <Navigate to={'/login'} />
    }

    return (
        <div>{user?.name}</div>
    );
}