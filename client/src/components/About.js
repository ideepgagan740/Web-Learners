import React, { useEffect,useState } from "react"
import {useNavigate } from "react-router-dom"
import gaganpic from "../Images/gagan1.jpg"
import fake4 from "../Images/fake4.jpg"
const About = () => {
    const navigate=useNavigate();
    const [userData,setUserData]=useState({
    name:"",
    email:"",
    phone:"",
    work:"",
    password:"",
    cpassword:""});
    const callAboutPage=async()=>{
        try {
            const res= await fetch("/about",{
            method:"GET",
            header:{
                Accept:"Application/json",
                "Content-Type":"Application/json"
            },
            // to send credentials to backe
            credentials:"include"

        })
        const data=await res.json();
        // console.log(data)
        setUserData(data)
        // console.log("UserData"+userData.name,userData.email,userData.phone,userData.work)
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
        callAboutPage();
    },[])
    return (
        <>
            <div className=" emp-profile pt-5">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img text-center">
                                <img className="ImgAbout text-center"src={userData.name==="Gagan1"? gaganpic:fake4} alt=""></img>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head text-center">
                                <h5 className="text-center">{userData.name}</h5>
                                <h5 className="text-center"> ({userData.work})</h5>
                                <p className="profile-rating mt-3 mb-5">Ranking:<span>1/10</span> </p>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className=" nav-item "><a className="nav-link active" id="home-tab" data-toggle=" tab" href="#home" role="tab">About</a></li>
                                    {/* <li className=" nav-item "><a className="nav-link" id="profile-tab" data-toggle=" tab" href="#profile" role="tab">Timeline</a></li> */}

                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-2">
                        <input type="submit" className="profile-edit-button" name="btnAddMore" value="Edit Profile"></input>
                    </div> */}
                    <div className="row">
                        {/* left side URL */}
                        {/* <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="https://www.facebook.com/Gagan5205singh/" target="_Gagan">Facebook</a><br />
                                <a href="https://www.instagram.com/i_deepgagan_740/" target="_Gagan">Instagram</a><br />
                                <a href="www.linkedin.com/in/gagandeepsingh12" target="_Gagan">LinkedIn</a><br />
                                <a href="https://github.com/ideepgagan740" target="_Gagan">GitHub</a><br />
                            </div>
                        </div> */}
                        {/* Right Side Data Toggle */}
                        <div className="col-md-4 pl-5 about-info" ></div>
                        <div className="col-md-8 pl-5 about-info" >
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    {/* <div className="row ">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._Id}</p>
                                        </div>
                                    </div> */}
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"> */}
                                {/* <div className="tab-pane fade active" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>10$/hr</p>
                                        </div>
                                    </div>
                                    
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>6</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>6Months</p>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default About