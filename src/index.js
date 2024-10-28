import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { registerCharts } from './registerCharts.ts'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';


registerCharts();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>,
  // <BrowserRouter>
  //   <Routes>
  //     <Route path='/' element={<MainLayout />}>
  //     <Route index element={<Login />} />
  //     <Route path='/forgetPassword' element={<ForgetPassword />} />
  //     <Route path='/changePassword' element={<ChangePasswod />} />
  //       <Route path='/home' element={<HomeLayout />}>
  //         <Route index element={<GetAllBills />} />
  //         <Route path='/home/:id' element={<GetBillById />} />
  //         <Route path='/home/addBill' element={<AddBill />} />
  //         <Route path='/home/editBill/:id' element={<EditBill />} />
  //         <Route path='/home/chart' element={<LineChart />} />
  //         <Route path='/home/expense' element={<GetAllExpense />} />
  //         <Route path='/home/expense/:id' element={<GetExpenseById />} />
  //         <Route path='/home/addExpense' element={<AddExpense />} />
  //         <Route path='/home/editExpense/:id' element={<EditExpense />} />
  //         <Route path='/home/companySales' element={<BarChart />} />
  //         <Route path='/home/transaction' element={<GetAllTransaction />} />
  //         <Route path='/home/transaction/:id' element={<GetTransactionById />} />
  //         <Route path='/home/editTransaction/:id' element={<EditTransaction />} />
  //       </Route>
  //     </Route>
  //   </Routes>
  // </BrowserRouter>
);

