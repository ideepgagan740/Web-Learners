import React, {useContext, useState} from "react"
import { NavLink,useNavigate } from "react-router-dom"
import { UserContext } from "../App";
const LogIn=()=>{
    const {state,dispatch}=useContext(UserContext);
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const loginUser=async(e)=>{
        e.preventDefault();
        const res=await fetch("./signIn",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        const data= res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials")
        }
        else{
            dispatch({type:"USER",payload:true})
            window.alert("Login Successful")
            navigate("/")
        }
    }
    return(
        <>
        <section className="signin">
            <div className="container pt-3">
                <div className="signin-content text-center">
                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <div className="signin-image">
                            <figure>
                                {/* <img src="" alt="Login Pic"></img> */}
                            </figure>
                            {/* <NavLink to="/signup" className="signup-image-link"> Create an account</NavLink> */}

                        </div>
                        <form className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="email" name="email" id="email" autoComplete="off" 
                                value={email} onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Your email"></input>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" 
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Password"></input>
                            </div>
                            
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" 
                                onClick={loginUser}
                                value="Login"></input>
                            </div>
                            <NavLink to="/signup" className="signup-image-link"> Create an account</NavLink>

                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default LogIn