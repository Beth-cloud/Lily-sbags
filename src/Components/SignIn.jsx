import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const SignIn = () => {
    
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [success, setSuccess] = useState ("")
    let [loading, setLoading] = useState ("")
    let [error, setError] = useState("")

    const navigate =useNavigate();
    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setError("")
            setSuccess("")
            setLoading("Please wait...")

            const data = new FormData();
            data.append("username",username)
            data.append ("password", password)

            const response = await axios.post("https://bethm.pythonanywhere.com/api/signin", data)

            if (response.data.user) {
                localStorage.setItem("user",JSON.stringify(response.data.user));
                navigate("/")
            } else{
                setLoading("")
                setError(response.data.message);
            }

        } catch (error) {
            setLoading("")
            setSuccess("Sign in successful.")
            setError("Something went wrong.")
        }
    }
    return ( 
        <div className=" lily row justify-content-center mt-5" >
            <div className="col-md-4 card shadow p-4">
                <h2><b>Sign In</b></h2>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>

                <form onSubmit={submitForm}>
                    <input type="text" className="form-control" placeholder="Enter your username" required onChange={(e)=>setUsername(e.target.value)}/> <br />
                    <input type="password" className="form-control" placeholder="Enter your password" required onChange={(e)=>setPassword(e.target.value)}/> <br />
                    <button className="btn btn-primary text-white" type="submit">Sign In</button>

                    <p className="text-dark">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
     );
}
 
export default SignIn;