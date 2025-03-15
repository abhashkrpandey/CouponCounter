import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login()
{
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();
    function inputter(event)
    {
        if(event.target.id=="username")
        {
            setusername(event.target.value);
        }
        else{
            setpassword(event.target.value);
        }
    }
   async function login(event)
    {
        event.preventDefault();
            if(username!="" || password !="")
            {
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/login",{
                    "username":username,
                    "password":password
                });
                const validUser=response.data.validation;
                if(validUser==true)
                {
                    navigate("/inside");
                }
                else{
                    navigate("/")
                }
            }
            
    }
    return (
        <div>
            <div className="flex flex-row justify-center ">
                <div className="bg-white h-[300px] w-[350px] my-[30px] mx-auto shadow-[0px_2px_2px_rgba(0,0,0,0.3)] rounded-[3px]">
                <form action="" className="flex flex-col  p-[30px] ">
                    <input placeholder="Username" required id="username" onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="text"></input>
                    <input placeholder="Password" required id="password" onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="password"></input>
                    <button onClick={login} className="bg-green-300  w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px]">Login</button>
                </form>
                </div>
            </div>
        </div>
    )
}