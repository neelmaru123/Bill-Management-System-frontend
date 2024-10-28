import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api_url from "./api";

function GetAllExpense(){
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
    const [searchTermExpenseNo, setSearchTermExpenseNo] = useState('');
    const [searchTermPartyName, setSearchTermPartyName] = useState('');

    useEffect(() => {
        fetch(api_url + "/expense")
            .then(response => response.json())
            .then(data => {setdata(data)})
            .catch(error => console.log(error))
    }, [])



    let allExpense = data
        .filter(expense => expense.expenseNo.toLowerCase().includes(searchTermExpenseNo.toLowerCase()))
        .filter(expense => expense.companyName.toLowerCase().includes(searchTermPartyName.toLowerCase()))
        .map((expense) => {
            const day = Math.floor((new Date() - new Date(expense.date)) / (1000 * 60 * 60 * 24));
            let expenseDate = new Date(expense.date);
            // if (expenseDate >= startingDate && expenseDate <= endingDate) {
                return (
                    <tr className="bg-slate-200 h-auto hover:bg-theme-dark-shade text-center">
                        <td className="p-2">{expense.expenseNo}</td>
                        <td className="p-2">{new Date(expense.date).toLocaleDateString()}</td>
                        <td className="p-2">{expense.companyName}</td>
                        <td className="p-2">{expense.totalBillAmount}</td>
                        <td className="p-2">{expense.paidAmount}</td>
                        <td className="p-2">{expense.dueAmount}</td>
                        <td className="p-2">
                            <button className="bg-theme-dark p-3 text-theme-light rounded-xl" onClick={() => navigate("/home/expense/" + expense._id , {replace : true})}>View</button>
                        </td>
                    </tr>
                )
            // }
        });

        console.log(allExpense);
        return (
            <div className="w-full h-auto bg-theme-light-shade">
                <div className="container mx-auto">
                    <div className="">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold text-theme-dark p-5 text-center">All Generated Expense</h1>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between p-7">
                        <div className="items-center align-middle">
                            <label className="block uppercase text-xl tracking-wide text-theme-dark font-bold mb-2 pe-3" htmlFor="grid-password">Bill No :</label>
                            <input className="border rounded-lg text-theme-dark" type="text" onChange={(e) => setSearchTermExpenseNo(e.target.value)}></input>
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
                    <div className="flex justify-center">
                        <div className="flex flex-col w-full">
                            <table className="table-auto rounded-3xl shadow-2xl w-full">
                                <thead className="bg-theme-dark text-theme-light border rounded-2xl">
                                    <tr className="">
                                        <th className="border border-theme-dark p-2">Expense No</th>
                                        <th className="border border-theme-dark p-2">Date</th>
                                        <th className="border border-theme-dark p-2">Party Name</th>
                                        <th className="border border-theme-dark p-2">Total Amount</th>
                                        <th className="border border-theme-dark p-2">Paid Amount</th>
                                        <th className="border border-theme-dark p-2">Due Amount</th>
                                        <th className="border border-theme-dark p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-lg">
                                    {allExpense}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
}

export default GetAllExpense;