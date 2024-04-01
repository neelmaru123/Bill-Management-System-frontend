import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    return(
        <div className="flex items-center sticky w-full top-0 left-0 justify-between bg-theme-dark p-4 text-theme-light">
            <div className="flex items-center ml-auto">
                <span className="mr-4">Welcome, Admin</span>
                <button className=" bg-theme-dark-shade hover:bg-theme-mediam-dark  text-theme-light font-bold py-2 px-4 rounded" onClick={() => {
                    navigate("/")
                }}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header;