import React,{useEffect,useState} from "react"
import {useNavigate } from "react-router-dom"
// import user from "../../../server/models/userSchema";
import mobile from "../Images/Mobile1.png"
import Email from "../Images/Email.png"
import Address from "../Images/Adress.png"


const Contact = () => {
    const navigate=useNavigate();
    const [userData,setUserData]=useState({
    name:"",
    email:"",
    phone:"",
    message:""});
    const userContact=async()=>{
        try {
            const res= await fetch("/getdata",{
            method:"GET",
            header:{
                "Content-Type":"Application/json"
            },
        })
        const data=await res.json();
        console.log(data)
        setUserData({...userData, name:data.name,email:data.email, phone:data.phone})
        console.log(userData)
        // console.log(data)

        if(!res.status===200){
            const error=new Error(res.error)
            throw error
        }
        else{
            // navigate("/about")
        }

        } catch (error) {
            console.log(error)
            navigate("/signIn")
        }   
    }
    useEffect(()=>{
        userContact();
    },[])
    //we are storing Data in States
    const handleInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUserData({...userData, [name]:value});
        console.log(userData)
    }
    // Send the Data to BackEnd
    const contactForm=async(e)=>{
        e.preventDefault();
        const {name,email,phone,message}=userData;
        const res = await fetch("/contact",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
                name,email,phone,message
            })
        });
        const data=await res.json()
        if(!data){
            console.log("Message not send");
        }
        else{
            alert("Message Send")
            setUserData({...userData,message:""})
            console.log("added Data :" +userData.message)
        }
    }
    return (
        <>
            <div className="contact-info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                                {/* Phone Number */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img className="ImgContact" src={mobile} alt="Phone"/>
                                <div className="contact_info_content">
                                    <div className="contact_infor_title">
                                         Phone
                                    </div>
                                    <div className="contact_infor_text">
                                         +917986569384
                                    </div>
                                </div>
                            </div>
                             {/* Email Number */}
                             <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img className="ImgContact" src={Email} alt="Email"/>
                                <div className="contact_info_content">
                                    <div className="contact_infor_title">
                                         Email
                                    </div>
                                    <div className="contact_infor_text">
                                         deepgagan7400@gmail.com
                                    </div>
                                </div>
                            </div>
                             {/* Address Number */}
                             <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img className="ImgContact" src={Address} alt="Address"/>
                                <div className="contact_info_content">
                                    <div className="contact_infor_title">
                                         Address
                                    </div>
                                    <div className="contact_infor_text">
                                         Amritsar, Punjab, India.
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            {/* Contact us form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 ">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                Get in Touch
                                </div>
                                <form method="POST"id="contact_form">    
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field" 
                                        value={userData.name} onChange={handleInputs} name="name" placeholder="Your Name" required={true}/>
                                        <input type="email" id="contact_form_email" className="contact_form_email input_field" 
                                        value={userData.email} onChange={handleInputs} name="email" placeholder="Your Email" required={true}/>
                                        <input type="number" id="contact_form_phone" className="contact_form_phone input_field" 
                                        value={userData.phone} onChange={handleInputs} name="phone" placeholder="Your Phone Number" required={true}/>
                                    </div>
                                    <div className="contact_form_text mt-5 text-center">
                                        <textarea className="text_field contact_form_message " id="" cols="100" rows="10" 
                                        value={userData.message} onChange={handleInputs} name="message" placeholder="Message"></textarea>
                                    </div>
                                    <div className="contact_form_button text-center ">
                                        <button type="submit" className="button contact_submit_button" onClick={contactForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Contact