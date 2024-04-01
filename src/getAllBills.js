import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api_url from "./api";

function GetAllBills() {
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    let currentDate = new Date();
    let aprilFirst = new Date(currentDate.getFullYear(), 3, 1);
    let [startingDate, setStartingDate] = useState(
        currentDate >= aprilFirst
            ? new Date(currentDate.getFullYear(), 3, 1) // April 1st of the current year
            : new Date(currentDate.getFullYear() - 1, 3, 1) // April 1st of the previous year
    );
    let [endingDate, setEndingDate] = useState(new Date()); // Today's date
    const [searchTermBillNo, setSearchTermBillNo] = useState('');
    const [searchTermPartyName, setSearchTermPartyName] = useState('');
    let total = {
        totalBillAmount: 0,
        totalPaidAmount: 0,
        totalDueAmount: 0,
        gst: 0
    }

    useEffect(() => {
        fetch(api_url + "/bill")
            .then(response => response.json())
            .then(data => setdata(data))
            .catch(error => console.log(error))
    }, [])


    let allBill = data
        .filter(bill => bill.billNo.toLowerCase().includes(searchTermBillNo.toLowerCase()))
        .filter(bill => bill.companyName.toLowerCase().includes(searchTermPartyName.toLowerCase()))
        .map((bill) => {
            const day = Math.floor((new Date() - new Date(bill.date)) / (1000 * 60 * 60 * 24));
            console.log(day);
            let billDate = new Date(bill.date);
            if (billDate >= startingDate && billDate <= endingDate) {
                return (
                    <tr className="bg-slate-200 h-auto hover:bg-theme-dark-shade text-center">
                        <td className="p-2">{bill.billNo}</td>
                        <td className="p-2">{new Date(bill.date).toLocaleDateString()}</td>
                        <td className="p-2">{bill.companyName}</td>
                        <td className="p-2">{bill.totalBillAmount}</td>
                        <td className="p-2">{bill.paidAmount}</td>
                        <td className="p-2">{bill.dueAmount}</td>
                        <td className="p-2">
                            <button className="bg-theme-dark p-3 text-theme-light rounded-xl" onClick={() => navigate("/home/" + bill._id, { replace: true })}>View</button>
                        </td>
                    </tr>
                )
            }
        })
    
    
    data.
    filter(bill => bill.billNo.toLowerCase().includes(searchTermBillNo.toLowerCase()))
    .filter(bill => bill.companyName.toLowerCase().includes(searchTermPartyName.toLowerCase()))
    .forEach((bill) => {
        let billDate = new Date(bill.date);
        if (billDate >= startingDate && billDate <= endingDate) {
            total.totalBillAmount += parseInt(bill.totalBillAmount);
            total.totalPaidAmount += parseInt(bill.paidAmount);
            total.totalDueAmount += parseInt(bill.dueAmount);
            total.gst += parseInt(bill.gst);
        }
    })



    return (
        <div className="w-full h-auto bg-theme-light-shade">
            <div className="container mx-auto">
                <div className="">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-theme-dark p-5 text-center">All Generated Bills</h1>
                    </div>
                </div>
                <div className="flex flex-row justify-between p-7">
                    <div className="items-center align-middle">
                        <label className="block uppercase text-xl tracking-wide text-theme-dark font-bold mb-2 pe-3" htmlFor="grid-password">Bill No :</label>
                        <input className="border rounded-lg text-theme-dark" type="text" onChange={(e) => setSearchTermBillNo(e.target.value)}></input>
                    </div>
                    <div className="items-center align-middle">
                        <label className="block uppercase text-xl tracking-wide text-theme-dark font-bold mb-2 pe-3" htmlFor="grid-password">Party Name :</label>
                        <input className="border rounded-lg text-theme-dark" type="text" onChange={(e) => setSearchTermPartyName(e.target.value)}></input>
                    </div>
                    <div className="items-center align-middle">
                        <label className="block uppercase text-xl tracking-wide text-theme-dark font-bold mb-2 pe-3" htmlFor="grid-password">Starting date :</label>
                        <input className="border rounded-lg text-theme-dark" type="date" onChange={(e) => setStartingDate(new Date(e.target.value))}></input>
                    </div>
                    <div className="items-center align-middle">
                        <label className="block uppercase text-xl tracking-wide text-theme-dark font-bold mb-2 pe-3" htmlFor="grid-password">Ending date :</label>
                        <input className="border rounded-lg text-theme-dark" type="date" onChange={(e) => setEndingDate(new Date(e.target.value))}></input>
                    </div>
                </div>
                <div className="flex justify-center pb-8">
                    <div className="flex flex-col w-full">
                        <table className="table-auto rounded-3xl shadow-2xl w-full">
                            <thead className="bg-theme-dark text-theme-light border rounded-2xl">
                                <tr className="">
                                    <th className="border border-theme-dark p-2">Bill No</th>
                                    <th className="border border-theme-dark p-2">Date</th>
                                    <th className="border border-theme-dark p-2">Party Name</th>
                                    <th className="border border-theme-dark p-2">Total Amount</th>
                                    <th className="border border-theme-dark p-2">Paid Amount</th>
                                    <th className="border border-theme-dark p-2">Due Amount</th>
                                    <th className="border border-theme-dark p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-lg">
                                {allBill}
                            </tbody>
                            <tfoot>
                                <tr className="bg-theme-dark text-theme-light border rounded-2x text-lg font-bold">
                                    <td className=" p-4">Total</td>
                                    <td className=" p-4"></td>
                                    <td className=" p-4"></td>
                                    <td className=" p-4">{total.totalBillAmount}</td>
                                    <td className=" p-4">{total.totalPaidAmount}</td>
                                    <td className=" p-4">{total.totalDueAmount}</td>
                                    <td className=" p-4"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
    
                </div>
            </div>
        </div>
    )
}






export default GetAllBills;