import React, { useState ,useRef} from 'react';
import { MailCheck } from 'lucide-react';
import {useAuthStore} from '../store/authStore';
import { useNavigate } from 'react-router-dom';

function EmailCodeVerification() {

  const [code,setCode]=useState(["","","","","",""]);
  const [resendDisabled,setResendDisabled]=useState(false);
  const [countDown,setCountDown]=useState(30);
  const inputRefs=useRef([]);

  const navigate=useNavigate();
  const {isLoading,verifyEmail,resendVerificationCode}=useAuthStore();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const verificationCode=code.join("");
    try{
      await verifyEmail(verificationCode);
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }

  const handleChange=(value,index)=>{
    if(!/^\d*$/.test(value))return;
    const newCode=[...code];

    //handle paste (when the user paste the verification code)
    if(value.length>1){
      const pastedValues=value.slice(0,6-index).split("");;
       pastedValues.forEach((digit,i)=>{
          if(index+i<6){
            newCode[index+i]=digit;
          }
       });
      setCode(newCode);
      
      //focus the next empty input after pasting
      const nextIndex=Math.min(index+pastedValues.length,5);
      inputRefs.current[nextIndex]?.focus();
    }else{
    newCode[index]=value;
    setCode(newCode);
    if(newCode[index] && index<5){
      inputRefs.current[index+1]?.focus();
    }
   }
  };

  const handleOnKeyDown=(index,e)=>{
    if (e.key === "Backspace") {
      if (code[index]===""&&index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }
  const handleResendCode=async ()=>{
   try{
      setResendDisabled(true);
      let timer=30;
      setCountDown(30);
      const interval=setInterval(()=>{
        timer-=1;
        setCountDown(timer);
        if(timer<=0){
          clearInterval(interval);
          setResendDisabled(false);
        }
      },1000);
     const response=await resendVerificationCode();
   }catch(error){
    console.error("Error resending code:",error);
    setResendDisabled(false);
   }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-[#7af7dc] px-4">
      <div className='w-[60%] lg:w-[45%] bg-white  flex flex-col justify-center items-center py-3 shadow-lg rounded-3xl text-[#0A8754]'>
      <MailCheck size={50}/>
      <h2 className="text-2xl font-semibold text-center">Email Verification</h2>
      <p className="text-gray-600 text-center">
          We've sent a 6-digit code to your email. Enter it below to verify your account.
        </p>
        <div className='flex flex-wrap justify-center gap-3 mt-3'>
          {code.map((val,index)=>(
            <input type="text" 
            key={index}
            ref={(el)=>inputRefs.current[index]=el}
            maxLength={6}
            value={val}
            onChange={(e)=>handleChange(e.target.value,index)} 
            onKeyDown={(e)=>handleOnKeyDown(index,e)}
            className="w-10  bg-[#ECEDEC] focus:bg-white outline-[#389e74] font-bold p-3 mr-2 mt-3"/>
          ))}
        </div>
        <button 
        className="bg-[#389e74] text-white px-10 py-3 rounded-3xl hover:bg-[#40e09b] transition m-4"
        disabled={isLoading}
        onClick={handleSubmit}
        >
          {isLoading?"Verifying...":'Verify'}
        </button>

        <button 
        className={`px-6 py-2 rounded-3xl mt-2  ${ resendDisabled || isLoading
          ? 'text-gray-400 cursor-not-allowed' 
          : 'text-[#389e74] hover:text-[#40e09b] cursor-pointer'
      }`}
        disabled={isLoading||resendDisabled}
        onClick={handleResendCode}
        >
         {resendDisabled ? `Resend code in ${countDown}s` : 'Resend Code'}
        </button>
      </div>
    </div>
  );
}

export default EmailCodeVerification;
