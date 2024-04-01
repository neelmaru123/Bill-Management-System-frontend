import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api_url from "./api";
import { ArrowLeft } from "lucide-react";

function EditTransaction() {
    const [data, setdata] = new useState({ transactionID: "" });
    const navigate = useNavigate();
    const params = useParams();

    const handlSubmit = (event) => {
        event.preventDefault();
        fetch(api_url + "/transaction/" + params.id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                console.log("Transaction updated");
                navigate("/home/transaction", { replace: true });
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetch(api_url + "/transaction/" + params.id)
            .then(response => {
                return response.json();
            })
            .then(data => setdata(data))
            .catch(error => console.log(error))
    }, [params.id])
    
    return (
        <>
            <div className="p-10">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home/transaction", { replace: true })
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Edit Transection</h1>
            </div>
            <div className="p-16">
                <form class="w-full pt-8">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-first-name">
                                Transection No
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="GT01" value={data.transactionID} onChange={(e) => {
                                setdata({ ...data, transactionID: e.target.value });
                            }} />
                            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-last-name">
                                Company Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" value={data.companyName} onChange={(e) => {
                                setdata({ ...data, companyName: e.target.value });
                            }} />
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                Paid Amount
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" value={data.amount} onChange={(e) => {
                                setdata({ ...data, amount: e.target.value });
                            }} />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                Type
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" value={data.type} onChange={(e) => {
                                setdata({ ...data, type: e.target.value });
                            }} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">

                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                refNo
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" value={data.refNo} onChange={(e) => {
                                setdata({ ...data, refNo: e.target.value });
                            }} />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                Date
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="date" value={data.date} onChange={(e) => {
                                setdata({ ...data, date: e.target.value });
                            }} />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button class="bg-theme-dark-shade hover:bg-theme-mediam-dark text-theme-light font-bold py-2 px-4 rounded" type="submit" onClick={handlSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default EditTransaction;