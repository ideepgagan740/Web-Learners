import React,{useEffect,useState} from "react"

const Home = () => {
    // const navigate=useNavigate();
    const [userName,setUserName]=useState('');
    const [show,setShow]=useState(false);
    
    const userHomePage=async()=>{
        try {
            const res= await fetch("/getdata",{
            method:"GET",
            header:{
                "Content-Type":"Application/json"
            },
        })
        const data=await res.json();
        console.log(data)
        setUserName(data.name)
        setShow(true)
        console.log(userName)
        // console.log(data)

        } catch (error) {
            console.log(error)
            // navigate("/signIn")
        }   
    }
    useEffect(()=>{
        userHomePage();
    },[])
    
    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5 text-center">WELCOME</p>
                    <h1 className="text-center">{userName}</h1>
                    <h2>{show ? "Happy, to see you back":"We Are the MERN Developer"}</h2>
                </div>
            </div>
        </>
    )
}

export default Home