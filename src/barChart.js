import Chart from 'chart.js/auto';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api_url from './api';
const canvas = document.getElementById('salesChart');



const ChartComponent1 = () => {
    const canvasRef = useRef(null);
    const [Data, setData] = useState([]);

    useEffect(() => {
        fetch(api_url + "/bill")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let BillAmounts = {};

        Data.map((item) => {
            if (BillAmounts[item.companyName]) {
                BillAmounts[item.companyName].total += item.totalBillAmount;
            } else {
                BillAmounts[item.companyName] = {
                    "name": item.companyName,
                    "total": item.totalBillAmount,
                };
            }
        });

        console.log(BillAmounts);
        const topTenCompanies = Object.values(BillAmounts)
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);

        const salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topTenCompanies.map((item) => item.name),
                datasets: [{
                    label: 'Total Sales',
                    data: topTenCompanies.map((item) => item.total),
                    backgroundColor: '#598392',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            salesChart.destroy();
        };
    }, [Data]);

    return <canvas ref={canvasRef} id="salesChart" />;
};

const ChartComponent2 = () => {
    const canvasRef = useRef(null);
    const [Data, setData] = useState([]);

    useEffect(() => {
        fetch(api_url + "/expense")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let ExpenseAmounts = {};

        Data.map((item) => {
            if (ExpenseAmounts[item.companyName]) {
                ExpenseAmounts[item.companyName].total += item.totalBillAmount;
            } else {
                ExpenseAmounts[item.companyName] = {
                    "name": item.companyName,
                    "total": item.totalBillAmount,
                };
            }
        });


        console.log(ExpenseAmounts);
        const topTenCompanies = Object.values(ExpenseAmounts)
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);


        // Create a new chart instance
        const salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topTenCompanies.map((item) => item.name),
                datasets: [{
                    label: 'Total Expense',
                    data: topTenCompanies.map((item) => item.total),
                    backgroundColor: '#598392',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            // Cleanup chart instance
            salesChart.destroy();
        };
    }, [Data]);

    return <canvas ref={canvasRef} id="salesChart" />;
};

function BarChart() {
    const navigate = useNavigate();
    return (
        <>
            <div className="p-10">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home", { replace: true });
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Company wise Sales</h1>
            </div>
            <div className='flex justify-center p-7'>
                <div className="min-w-1/2 w-4/5 bg-white p-10 shadow-md ">
                    <ChartComponent1 />
                </div>
            </div>
            <div className="p-10">
                <h1 className="text-3xl font-bold text-theme-dark text-center">Company wise Expense</h1>
            </div>
            <div className='flex justify-center p-7'>
                <div className="min-w-1/2 w-4/5 bg-white p-10 shadow-md ">
                    <ChartComponent2 />
                </div>
            </div>
        </>
    );
}


export default BarChart
