import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react"
import { Link,useNavigate} from 'react-router-dom';
import  {useAuthStore} from '../store/authStore';

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const {isLoading,error,login}=useAuthStore();
  const navigate=useNavigate();
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
       await login(email,password);
       navigate("/");
    }catch(error){
      console.log("Error in Login ",error)
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#AEF6D9]'>
      <div className="sm:h-[28rem] bg-[#AEF6D9] flex flex-col sm:flex-row rounded-lg overflow-hidden">
        <div className="custom-gradient flex-[0.4]  z-10 rounded-3xl text-white p-6 text-center shadow-lg flex flex-col justify-center gap-4 clip-path-sm responsive-clip-path"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl md:text font-bold mb-4 drop-shadow-lg">Welcome Back!</h2>
          <p className="mb-2 text-base md:text-lg lg:text-xl font-medium leading-relaxed opacity-90">
          We're glad to see you again.
          </p>
          <p className="text-sm opacity-80">Stay connected, share your thoughts, and explore endless possibilities!</p>
        </div>
        <div className='w-[90%] sm:w-auto flex-[0.6] sm:flex-[0.7] h-[25rem] bg-white items-center my-auto  mt-[-8%] sm:mt-auto sm:-ml-[6%] rounded-3xl flex flex-col gap-4 justify-center py-8 sm:py-2 mx-auto'>
          <h1 className='text-lg font-bold text-[#389e74]'>Log In</h1>

          <form className="w-[80%] flex flex-col gap-4 justify-center items-center">

            <div className="relative ">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="peer  px-0 pt-6 pb-2 border-b-2 border-[#68dfaf] bg-transparent text-gray-900 focus:outline-none focus:border-[#0A8754]"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-3 text-[#AEF6D9] text-sm transition-all 
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#43aa7d]
                  peer-focus:top-3 peer-focus:text-sm peer-focus:text-[#0A8754]"
              >
                Email
              </label>
            </div>

            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                className="peer  px-0 pt-6 pb-2 border-b-2 border-[#68dfaf] bg-transparent text-gray-900 focus:outline-none focus:border-[#0A8754]"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-3 text-[#AEF6D9] text-sm transition-all 
          peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#43aa7d]
          peer-focus:top-3 peer-focus:text-sm peer-focus:text-[#0A8754]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-5 text-[#43aa7d] hover:text-[#0A8754] focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className='text-[#34bb85] hover:text-[#6fd4a9] cursor-pointer font-medium text-md'>
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <button 
            type='submit'
            className="bg-[c] text-white px-5 py-2 rounded-3xl bg-[#389e74] hover:bg-[#40e09b] transition"
            onClick={handleSubmit}
            disabled={isLoading}
            >
              {isLoading?"Logging In...":"Log In"}
            </button>
            <div className="text-sm text-gray-600"
            >
              Create an account
              <Link to="/signup" className="text-sm text-[#34bb85] hover:text-[#6fd4a9] font-bold cursor-pointer pl-2" >Sign Up </Link>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default LogIn;
