import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios"


export default function UserPage() {
    const [redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
  }


    if (!ready){
        return 'Loading...'
    }

    if (ready && !user){
        return <Navigate to={'/login'} />
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
      }
    
    return (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
            <p>Correct Answers: {user.correctAnswers}</p>
            <p>Incorrect Answers: {user.incorrectAnswers}</p>
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
    );
}