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
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Correct Answers: {user.correctAnswers}</p>
            <p>Incorrect Answers: {user.incorrectAnswers}</p>
        </div>
    );
}