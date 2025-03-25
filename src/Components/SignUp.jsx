import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {

    let [username,setUsername] = useState("")
    let [email,setEmail] = useState("")
    let [phone,setPhone] = useState("")
    let [password, setPassword] = useState("")
    let [success, setSuccess] = useState("")
    let [loading, setLoading] = useState("")
    let [error,setError] = useState("")

    const submitForm = async (e)=> {
        e.preventDefault()
        try {
            setLoading("Please wait...")
            setError("")
            setSuccess("")

            const data = new FormData ()
            data.append("username",username);
            data.append("email", email);
            data.append("phone", phone);
            data.append("password",password);

            const response =await axios.post("https://bethm.pythonanywhere.com/api/signup", data)
            setLoading("")
            setSuccess(response.data.message)
            setUsername("")
            setEmail("")
            setPhone("")
            setPassword("")
        } catch (error) {
            setLoading("")
            setError(error.message)
            
        }
    };
    
    return ( 
       <div className="lily row justify-content-center mt-5">
        <div className="col-md-4 card shadow p-4">
            <b className="text-warning">{loading}</b>
            <b className="text-success">{success}</b>
            <b className="text-danger">{error}</b>
            <h2>Sign Up</h2>
        <form onSubmit={submitForm} >
            <input type="text" className="form-control" placeholder="Enter your username" required value={username} onChange={(e)=>setUsername(e.target.value)}/> <br />
            <input type="email" className="form-control" placeholder="Enter your email" required value={email} onChange={(e)=>setEmail(e.target.value)}/> <br />
            <input type="tel" className="form-control" placeholder="Enter your phone number" required value={phone} onChange={(e)=>setPhone(e.target.value)}/> <br />
            <input type="text" className="form-control" placeholder="Enter your password" required value={password} onChange={(e)=>setPassword(e.target.value)}/> <br />

            <button type="submit" className="btn btn-primary text-white">Sign Up</button>

        <p className="text-dark">Already have an account? <Link to="/signin">Sign In</Link> </p> 
          </form> <br /> 
          
        </div>
       </div>
     );
}
 
export default SignUp;