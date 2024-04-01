import { useEffect, useState } from "react";
import api_url from "./api"
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


function EditBill() {
    const [data, setdata] = new useState({ billNo: "" });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetch(api_url + "/bill/" + params.id)
            .then(response => {
                return response.json();
            })
            .then(data => setdata(data))
            .catch(error => console.log(error))
    }, [params.id, params])

    return (
        <>
        <div className="p-14">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home", { replace: true })
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Edit Bill</h1>
            </div>
            <div className="p-10">
            
            <form class="w-full pt-8">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-first-name">
                            Bill No
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="GT01" value={data.billNo} onChange={(e) => {
                            setdata({ ...data, billNo: e.target.value });
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
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-password">
                            Product Details
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={data.productDetails} onChange={(e) => {
                            setdata({ ...data, productDetails: e.target.value });
                        }} />
                        <p class="text-gray-600 text-xs italic">Write it in one line </p>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-city">
                            Amount
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" value={data.amount} onChange={(e) => {
                            var gst = parseFloat(e.target.value * 0.18);
                            setdata({ ...data, amount: e.target.value });
                        }} />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                            Paid Amount
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" value={data.paidAmount} onChange={(e) => {
                            setdata({ ...data, paidAmount: e.target.value });
                        }} />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                            Date
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="date" value={data.date} onChange={(e) => {
                            setdata({ ...data, date: e.target.value });
                        }} />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-city">
                            due Amount
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" value={data.dueAmount} onChange={(e) => {
                            setdata({ ...data, dueAmount: e.target.value });
                        }} />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                            gst
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" value={data.gst} onChange={(e) => {
                            setdata({ ...data, gst: e.target.value });
                        }} />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                            Total Bill Amount
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" value={data.totalBillAmount} onChange={(e) => {
                            setdata({ ...data, totalBillAmount: e.target.value });
                        }} />
                    </div>
                </div>
                <div className="pt-4">
                    <button class="bg-theme-dark-shade hover:bg-theme-mediam-dark text-theme-light font-bold py-2 px-4 rounded" type="submit" onClick={(event) => {
                        event.preventDefault();
                        console.log(data);
                        fetch(api_url + "/bill/" + params.id, {
                            method: "PUT",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json"
                            },
                        })
                        .then(response => {
                            console.log("bill updated");
                            navigate("/home", { replace: true });
                        })
                        .catch(error => console.log(error));
                    }}>
                        Submit
                    </button>
                </div>
            </form>
            </div>
            
        </>
    )
}

export default EditBill;