import React,{useState} from "react"
import { NavLink,useNavigate } from "react-router-dom"

const SignUp=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    })
    let name, value;
    const handleInputs=(e)=>{
        // e.target.default()
        console.log(e)
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value})
    }
    const PostData=async(e)=>{
        e.preventDefault()
        const {name,email,phone,work,password,cpassword}=user;
        const res=await fetch('/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        });
        const data= await res.json();
        if(res.status ===422 ||!data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else{
            window.alert("Registration Successful");
            console.log("Registration Successful");

            navigate("/signIn")
        }
    }
    return(
        <>
        <section className="signup">
            
            <div className="container pt-3">
            <h2 className="form-title">Sign up</h2>
                <div className="signup-content pt-3">
                    <div className="signup-form">
                        
                        <form method="POST" className="register-form text-center" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name">
                                <i className="zmdi zmdi-account material-icons-name"></i>
                                </label>
                                <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your email"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                </label>
                                <input type="number" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your Phone"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="work">
                                <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                </label>
                                <input type="text" name="work" id="work" autoComplete="off" value={user.work} onChange={handleInputs} placeholder="Profession"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Password"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword">
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="cpassword" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} 
                                onChange={handleInputs} placeholder="Confirm your Password"></input>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" 
                                onClick={PostData}></input>
                            </div>
                        </form>
                        <div className="signup-image text-center">
                            <figure>
                                {/* <img src="" alt="Registeration Pic"></img> */}
                            </figure>
                            <NavLink to="/SignIn" className="signin-image-link"> I am already Registered</NavLink>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignUp