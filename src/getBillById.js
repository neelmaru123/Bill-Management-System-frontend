import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api_url from "./api";
import { ArrowLeft} from "lucide-react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
let paidAmount = 0;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#598392',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function GetBillById() {
    const params = useParams();
    const [data, setdata] = useState({});
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [edit, setedit] = useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(api_url + "/bill/" + params.id)
            .then(response => response.json())
            .then(data => setdata(data))
            .catch(error => console.log(error))
    }, [params.id])

    useEffect(() => {
        fetch(api_url + "/bill/" + params.id)
            .then(response => response.json())
            .then(data => setedit(data))
            .catch(error => console.log(error))
    }, [params.id])


    const handlePay = async () => {
        console.log(paidAmount);
        fetch(api_url + "/bill/" + params.id, {
            method: "PUT",
            body: JSON.stringify(edit),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const response = fetch(api_url + "/transaction", {
            method: "POST",
            body: JSON.stringify({
                companyName: edit.companyName,
                amount: paidAmount,
                date: edit.date,
                type: "Credit",
                transactionID: "TR" + Math.floor(Math.random() * 1000),
                refNo: edit.billNo
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setOpen(false)
        window.location.reload();
    }

    const handleDelete = () => {
        console.log(data.billNo);
        fetch(api_url + "/bill/" + data._id, { method: "DELETE" })
            .catch(error => console.log(error))

        fetch(api_url + "/transaction",{
            method: "DELETE",
            body: JSON.stringify({ refNo : data.billNo }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        navigate("/home", { replace: true })
    };

    const getBillById =
        <>
            <tr className="text-2xl font-bold">
                <td className="p-2">Bill No</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.billNo}</td>
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
                <td className="p-2">Product Details</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.productDetails}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Amount</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.amount}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">GST</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.gst}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Paid Amount</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.paidAmount}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Due Amount</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.dueAmount}</td>
            </tr>
            <tr className="text-2xl font-bold">
                <td className="p-2">Total Amount</td>
                <td className="p-2"> : </td>
                <td className="p-2">{data.totalBillAmount}</td>
            </tr>
        </>

    return (
        <>
            <div className="p-10">
                <ArrowLeft className=" float-start" size={30} onClick={() => {
                    navigate("/home", { replace: true })
                }} />
                <h1 className="text-3xl font-bold text-theme-dark text-center">Bill Details</h1>
            </div>
            <div className="w-full h-auto bg-theme-light-shade ps-10 items-center">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="flex flex-col rounded-2xl bg-theme-mediam-dark p-3 shadow-2xl">
                            <table className=" table-auto rounded-3xl " >
                                <tbody className=" text-theme-light">
                                    {getBillById}
                                    <tr className="flex font-bold">
                                        <td className="p-2"><button className="bg-theme-dark  p-3 text-theme-light rounded-xl" onClick={() => {
                                            navigate("/home/editBill/" + data._id)
                                            console.log(data.id)
                                        }}>Edit Bill</button></td>
                                        <td className="p-2"> <button className="bg-theme-dark  p-3 text-theme-light rounded-xl" onClick={handleOpen}>Pay Amount</button> </td>
                                        <td className="p-2"><button className="bg-theme-dark  p-3 text-theme-light rounded-xl" onClick={handleDelete}>Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex justify-between pb-3 border-b-2">
                        <h3 className="text-theme-light text-2xl font-bold">Pay Amount</h3>

                    </div>
                    <div class="mb-4 pt-3">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Enter amount
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Amount" onChange={(e) => {
                            paidAmount = parseInt(e.target.value)
                            let DueAmount = parseInt(data.dueAmount) - parseInt(e.target.value)
                            console.log(DueAmount);
                            setedit({ ...edit, paidAmount: parseInt(data.paidAmount) + parseInt(e.target.value), dueAmount: DueAmount });
                        }} />
                    </div>
                    <div class="flex items justify-end ">
                        <Button variant="contained" onClick={handlePay}>Pay</Button>
                    </div>
                </Box>
            </Modal>

        </>
    )

}





export default GetBillById;
