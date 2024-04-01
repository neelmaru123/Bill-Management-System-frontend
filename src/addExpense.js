import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api_url from "./api";
import { Toaster, toast } from 'react-hot-toast';

function AddExpense() {
    const [data, setdata] = new useState({ date: new Date().toISOString().split('T')[0] });
    const navigate = useNavigate();
    const [expense, setExpense] = useState([]);
    
    const abortController = new AbortController();

    useEffect(() => {
        fetch(api_url+"/expense", { signal: abortController.signal })
        .then((res) => res.json())
        .then((data) => {
            setExpense(data);
        })
        .catch((error) => {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                // handle error
            }
        });
    
        return () => {
            abortController.abort();
        };
    }, []);

    const exp = expense.map((item) => {
        return item.expenseNo;
    })
    
    console.log(exp);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            
            if (exp.includes(data.expenseNo)) {
                toast.error('Expense No already exists');
                return;
            }

            const res = await fetch(api_url + "/expense", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const response = await fetch(api_url + "/transaction", {
                method: "POST",
                body: JSON.stringify({
                    companyName: data.companyName,
                    amount: data.paidAmount,
                    date: data.date,
                    type: "Debit",
                    transactionID: "TR" + Math.floor(Math.random() * 1000),
                    refNo: data.expenseNo
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // if (!res.ok) {
            //     throw new Error(`HTTP error! status: ${res.status}`);
            // }

            const resData = await res.json();
            const transData = await response.json();


            if (resData.success === true && transData.success === true) {
                navigate("/home/expense", { replace: true })
            }
            else {
                console.log(transData.message);
                console.log(resData.message);
            }

        } catch (error) {
            console.log(error.message)
        }
    };
    return (
        <>
            <div className="p-14">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home/expense", { replace: true })
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Add Bill</h1>
            </div>
            <div className="p-10">
                <form class="w-full">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-first-name">
                                Expense No
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="EX01" onChange={(e) => {
                                setdata({ ...data, expenseNo: e.target.value });
                            }} />
                            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-last-name">
                                Company Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" onChange={(e) => {
                                setdata({ ...data, companyName: e.target.value });
                            }} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-password">
                                Product Details
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="" onChange={(e) => {
                                setdata({ ...data, productDetails: e.target.value });
                            }} />
                            <p class="text-gray-600 text-xs italic">Write it in one line </p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                GST percent
                            </label>

                            <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" onChange={(e) => {
                                setdata({ ...data, gtsPercent: e.target.value });
                            }}>
                                <option value="">Select GST percent</option>
                                <option value="0.05">5%</option>
                                <option value="0.12">12%</option>
                                <option value="0.18">18%</option>
                                <option value="0.28">28%</option>
                            </select>

                        </div>
                        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-city">
                                Amount
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-theme-dark border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="" onChange={(e) => {
                                var gst = parseFloat(e.target.value) * parseFloat(data.gtsPercent);
                                console.log(gst);
                                setdata({ ...data, totalBillAmount: (Number(e.target.value) + Number(gst)), gst: gst, amount: e.target.value });
                            }} />
                        </div>
                        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                Paid Amount
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="" onChange={(e) => {
                                const paidAmount = e.target.value;
                                console.log(paidAmount, data.totalBillAmount, data.totalBillAmount - paidAmount)
                                setdata(prevData => ({
                                    ...prevData,
                                    paidAmount: paidAmount,
                                    dueAmount: parseInt(prevData.totalBillAmount) - parseInt(paidAmount),
                                }));
                            }} />
                        </div>
                        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-theme-dark text-xs font-bold mb-2" for="grid-zip">
                                Date
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={data.date} id="grid-zip" type="date" placeholder="" onChange={(e) => {
                                setdata({ ...data, date: e.target.value });
                            }} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">

                    </div>
                    <div className="pt-4">
                        <button class="bg-theme-dark-shade hover:bg-theme-mediam-dark text-theme-light font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
                <Toaster />
            </div>

        </>
    )
}

export default AddExpense;

