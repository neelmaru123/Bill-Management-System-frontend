import './index.css';
import React, { useRef, useState, useEffect } from 'react';
import "./App.css";
import Chart from 'chart.js/auto';
import api_url from './api';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// This component is used to display the line chart for the monthly sales trend for products A & B.



const ChartComponent = () => {
    const chartRef = useRef(null);
    const [Data, setData] = useState([]);
    const [expense, setExpense] = useState([]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    }

    useEffect(() => {
        fetch(api_url + "/bill")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch(api_url + "/expense")
            .then(response => response.json())
            .then(data => setExpense(data))
            .catch(error => console.log(error))
    }, [])



    useEffect(() => {
        const ExpenseAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const BillAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Data.map((item) => {
            const date = new Date(item.date);
            const month = date.getMonth();
            BillAmounts[month] += item.totalBillAmount;
        });

        expense.map((item) => {
            const date = new Date(item.date);
            const month = date.getMonth();
            ExpenseAmounts[month] += item.totalBillAmount;
        });

        console.log(BillAmounts);
        console.log(ExpenseAmounts);

        const data = {
            labels,
            datasets: [
                {
                    label: "Month wise genrated Expense",
                    data: ExpenseAmounts,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132)",
                },
                {
                    label: "Month wise genrated Bills",
                    data: BillAmounts,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235)",
                },
            ],
        }

        const ctx = chartRef.current.getContext("2d");
        let chartInstance = new Chart(ctx, {
            type: "line",
            data: data,
            options: options
        });

        return () => {
            chartInstance.destroy();
        };
    }, [Data]);



    return <canvas ref={chartRef} />;
}

function LineChart() {
    const navigate = useNavigate();
    return (
        <>
            <div className="p-10">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home", { replace: true })
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Monthly Sales and Expense Trend</h1>
            </div>
            <div className='flex justify-center p-7'>
                <div className="min-w-1/2 w-4/5 bg-white p-10 shadow-md ">
                    <ChartComponent />
                </div>
            </div>
        </>


    );
}
export default LineChart

