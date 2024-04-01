import { Button } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import api_url from "./api";

function ForgetPassword() {
    let Email = "";
    let OTP, otp, res;
    const navigate = useNavigate();
    return(
        <>
        <div className="h-screen w-screen bg-theme-light-shade flex p-10 justify-center">
            <div className="flex flex-col justify-between bg-[url('./img/Background.png')] lg:bg-theme-light-shade bg-cover w-11/12 rounded-3xl shadow-2xl items-center object-cover">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-theme-dark p-5">Bill Managment System</h1>
                    <h1 className="text-3xl font-bold text-theme-dark p-5">Email Verification</h1>
                </div>

                <div className="flex justify-center row-auto mb-5">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">Email</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="text" id="username" onChange={(e) => {
                            Email = e.target.value;
                        }} />
                        <Button color="lightBlue" ripple="light" onClick={async () => {
                            if(Email === "") {
                                toast.error("Please enter email")
                            } else {
                                res = await fetch(api_url + "/sendOTP", {
                                    method: "POST",
                                    body: JSON.stringify({ email: Email }),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                })
                                toast.success("OTP sent to your email")
                            }
                            OTP = await res.json();
                            console.log(OTP);
                        }} className="mt-5 bg-theme-mediam-dark">Send OTP</Button>
                    </div>
                </div>
                <div className="flex justify-center row-auto">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">OTP</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="Number" id="password" onChange={(e) => {
                            otp = e.target.value;
                        }} />
                        <Button color="lightBlue" ripple="light" onClick={() => {
                            console.log(OTP.otp, parseInt(otp));
                            if(parseInt(otp) === OTP.otp){
                                navigate("/changePassword", { replace: true })
                            }
                            else{
                                toast.error("Invalid OTP")
                            }
                        }} className="mt-5 bg-theme-mediam-dark"> Confrime </Button>
                    </div>
                </div>
                
                <div className="text-center mb-16">
                    <h1 className="text-lg font-bold text-theme-dark p-5"> <a className="text-theme-dark-shade hover:cursor-pointer" onClick={() => {
                        navigate("/", { replace: true })
                    }}>Back to Login page</a></h1>
                </div>
                <div className="text-center">
                    <h1 className="text-md font-bold text-theme-dark p-5 items-end">Terms of use | Privacy policy</h1>
                </div>
            </div>
            <Toaster />
        </div>
        </>
    )
}

export default ForgetPassword;