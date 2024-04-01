import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api_url from "./api";

function ChangePasswod() {
    let user = {
        username: "",
        password: "",
        confrimePassword: ""
    }
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(user.password === "" || user.confrimePassword === "") {
            toast.error("Please enter password")
        } else if(user.password !== user.confrimePassword) {
            toast.error("Password does not match")
        } else {
            const res = await fetch(api_url + "/changePassword", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const resData = await res.json();

            if(resData.success) {
                toast.success("Password changed successfully")
                navigate("/", { replace: true })
            } else {
                toast.error("Something went wrong")
            }
        }
    }
    return(
        <>
        <div className="h-screen w-screen bg-theme-light-shade flex p-10 justify-center">
            <div className="flex flex-col justify-between bg-[url('./img/Background.png')] lg:bg-theme-light-shade bg-cover w-11/12 rounded-3xl shadow-2xl items-center object-cover pb-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-theme-dark p-5">Bill Managment System</h1>
                    <h1 className="text-3xl font-bold text-theme-dark p-5">Reset your password</h1>
                </div>
                <div className="flex justify-center row-auto mb-5">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">Username</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="text" id="username" onChange={(e) => {
                            user.username = e.target.value;
                        }} />
                    </div>
                </div>
                <div className="flex justify-center row-auto mb-5">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">New Password</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="text" id="username" onChange={(e) => {
                            user.password = e.target.value;
                        }} />
                    </div>
                </div>
                <div className="flex justify-center row-auto">
                    <div className="flex flex-col">
                        <label className="text-lg font-bold text-theme-dark">Confrime Password</label>
                        <input className="text-md font-bold text-theme-dark p-3 bg-transparent border-b-2 border-theme-light focus:outline-none" type="password" id="password" onChange={(e) => {
                            user.confrimePassword = e.target.value;
                        }} />
                    </div>
                </div>
                <div className="flex justify-center row-auto">
                    <div className="flex flex-col">
                        <button className="bg-theme-dark text-theme-light-shade p-3 rounded-lg shadow-2xl m-auto mt-10" onClick={handleSubmit}> Set Password</button>
                    </div>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-lg font-bold text-theme-dark p-5">Don't want to update ? <a className="text-theme-dark-shade hover:cursor-pointer" onClick={() => {
                        navigate("/", { replace: true })
                    }}>Login</a></h1>
                </div>
                <div className="text-center">
                    <h1 className="text-md font-bold text-theme-dark justify-items-end">Terms of use | Privacy policy</h1>
                </div>
            </div>
            <Toaster />
        </div>
        </>
    );
}

export default ChangePasswod;