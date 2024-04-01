import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api_url from "./api";
import { ArrowLeft } from "lucide-react";

function GetTransactionById() {
    const params = useParams();
    const [data, setdata] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(api_url + "/transaction/" + params.id)
            .then(response => response.json())
            .then(data => setdata(data))
            .catch(error => console.log(error))
    }, [params.id])

    const getTransactionById =
        <>
            <tr className="text-2xl font-bold">
                <td className="p-2">Transection No</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.transactionID}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Date</td>
                <td className="p-2"> : </td>
                <td className="p-2">{new Date(data.date).toLocaleDateString()}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Company Name</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.companyName}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Amount</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.amount}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Type</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.type}</td>
            </tr>
        </>

    return (
        <>
            <div className="p-10">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home/transaction", { replace: true })
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Transection Details</h1>
            </div>
            <div className="w-full h-auto bg-theme-light-shade ps-10 items-center">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="flex flex-col rounded-2xl bg-theme-mediam-dark p-3 shadow-2xl">
                            <table className=" table-auto rounded-3xl " >
                                <tbody className=" text-theme-light">
                                    {getTransactionById}
                                    <tr className="flex font-bold">
                                        <td className="p-2"><button className="bg-theme-dark  p-3 text-theme-light rounded-xl" onClick={() => {
                                            navigate("/home/editTransaction/" + data._id)
                                            console.log(data.id)
                                        }}>Edit Expense</button></td>
                                        <td className="p-2"><button className="bg-theme-dark  p-3 text-theme-light rounded-xl" onClick={() => {
                                            fetch(api_url + "/transaction/" + data._id, { method: "DELETE" })
                                                .then(data => {
                                                    console.log(data);
                                                    navigate("/home/transaction")
                                                })
                                                .catch(error => console.log(error))
                                        }}>Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetTransactionById;