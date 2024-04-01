import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api_url from "./api";
import { Toaster, toast } from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const [data, setdata] = useState({});

    const handleSubmit = async (e) => {
        try {
            const res = await fetch(api_url + "/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // if (!res.ok) {
            //     throw new Error(`HTTP error! status: ${res.status}`);
            // }
            const resData = await res.json();
            console.log(resData);
            if (resData.success === true) {
                toast.success('Login Successfull');
                navigate("/home", { replace: true })
            } else {
                toast.error('Wrong username or password');
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="h-screen w-screen bg-theme-light-shade flex p-10 justify-center">
            <div className="flex flex-col justify-between bg-[url('./img/Background.png')] lg:bg-theme-light-shade bg-cover w-11/12 rounded-3xl shadow-2xl items-center object-cover">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-theme-dark p-5">Bill Managment System</h1>
                    <h1 className="text-3xl font-bold text-theme-dark p-5">Welcome Back!</h1>
                </div>

                <div className="flex justify-center row-auto mb-5">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">Username</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="text" id="username" onChange={(e) => {
                            setdata({ ...data, username: e.target.value })
                        }} />
                    </div>
                </div>
                <div className="flex justify-center row-auto">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">Password</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="password" id="password" onChange={(e) => {
                            setdata({ ...data, password: e.target.value })
                        }} />
                    </div>
                </div>
                <div className="flex justify-center row-auto">
                    <div className="flex flex-col">
                        <button className="bg-theme-dark text-theme-light-shade p-3 rounded-lg shadow-2xl m-auto mt-10" onClick={handleSubmit}> Login</button>
                    </div>
                </div>
                <div className="text-center mb-16">
                    <h1 className="text-lg font-bold text-theme-dark p-5">Forget password ? <a className="text-theme-dark-shade hover:cursor-pointer" onClick={() => {
                        navigate("/forgetPassword", { replace: true })
                    }}>Change</a></h1>
                </div>
                <div className="text-center">
                    <h1 className="text-md font-bold text-theme-dark p-5 items-end">Terms of use | Privacy policy</h1>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Login;