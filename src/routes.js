import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from './mainLayout';
import Login from './Login';
import HomeLayout from './homeLayout';
import GetAllBills from './getAllBills';
import GetBillById from './getBillById';
import AddBill from './addBill';
import EditBill from './editBill';
import LineChart from './Linechart.js';
import { registerCharts } from './registerCharts.ts'
import GetAllExpense from './getAllExpense.js';
import GetExpenseById from './getExpenseById.js';
import AddExpense from './addExpense.js';
import EditExpense from './editExpense.js';
import BarChart from './barChart.js';
import GetAllTransaction from './getAllTransactions.js';
import GetTransactionById from './getTransactionById.js';
import EditTransaction from './editTransaction.js';
import ForgetPassword from './forgetPassword.js';
import ChangePasswod from './changePassword.js';


function Path() {
    return (
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Login />} />
                    <Route path='/forgetPassword' element={<ForgetPassword />} />
                    <Route path='/changePassword' element={<ChangePasswod />} />
                    <Route path='/home' element={<HomeLayout />}>
                        <Route index element={<GetAllBills />} />
                        <Route path='/home/:id' element={<GetBillById />} />
                        <Route path='/home/addBill' element={<AddBill />} />
                        <Route path='/home/editBill/:id' element={<EditBill />} />
                        <Route path='/home/chart' element={<LineChart />} />
                        <Route path='/home/expense' element={<GetAllExpense />} />
                        <Route path='/home/expense/:id' element={<GetExpenseById />} />
                        <Route path='/home/addExpense' element={<AddExpense />} />
                        <Route path='/home/editExpense/:id' element={<EditExpense />} />
                        <Route path='/home/companySales' element={<BarChart />} />
                        <Route path='/home/transaction' element={<GetAllTransaction />} />
                        <Route path='/home/transaction/:id' element={<GetTransactionById />} />
                        <Route path='/home/editTransaction/:id' element={<EditTransaction />} />
                    </Route>
                </Route>
            </Routes>
        
    )
}

export default Path;