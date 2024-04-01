import { useState } from 'react';
import profile from './img/profile.jpg';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <div className=" sticky top-0 left-0 w-80 h-screen bg-theme-dark items-center float-start pt-5 text-center me-5">
                <img className="rounded-full h-24 w-24 mx-auto" src={profile} />
                <h1 className='text-xl font-bold text-theme-light p-3'>Vagheshvaree Engeineering Works</h1>
                <div className="flex flex-col justify-around bg-theme-dark-shade text-th text-theme-light">
                    <button className="hover:bg-theme-mediam-dark font-bold m-4 py-2 px-4 rounded" onClick={() => {
                        navigate("/home")
                    }}>All Bills</button>
                    <button className="hover:bg-theme-mediam-dark font-bold m-4 py-2 px-4 rounded">All Expenses</button>
                    <button data-modal-target="large-modal" data-modal-toggle="large-modal" className="hover:bg-theme-mediam-dark font-bold m-4 py-2 px-4 rounded" onClick={
                        () => {
                            navigate("/home/addBill")
                        }
                    }>Add Bill</button>
                    <button className="hover:bg-theme-mediam-dark font-bold m-4 py-2 px-4 rounded">Add Expense</button>
                    <button className="hover:bg-theme-mediam-dark font-bold m-4 py-2 px-4 rounded">Statement</button>
                    <button className="hover:bg-theme-mediam-dark font-bold m-4 py-2 px-4 rounded">All Transection</button>
                </div>
            </div>

            {/* <!-- Large Modal --> */}
            {isModalOpen && (
                
                    <div id="large-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative w-full max-w-4xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* <!-- Modal header --> */}
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                        Large modal
                                    </h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="large-modal" onClick={() => setModalOpen(false)}>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <div class="p-4 md:p-5 space-y-4">
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                    </p>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                    </p>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="large-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                    <button data-modal-hide="large-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        </>
    )
}



export default Sidebar;