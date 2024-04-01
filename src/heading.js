import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { BarChart, GitGraphIcon, PlusCircle, PlusCircleIcon } from 'lucide-react';
import { Drawer, Button, Typography, IconButton } from "@material-tailwind/react";
import profile from './img/profile.jpg';

const products = [
    { name: 'Add Bill', description: 'Add Bill in system', href: '/home/addBill', icon: PlusCircle },
    { name: 'Add Expense', description: 'Add expense in system', href: '/home/addExpense', icon: PlusCircleIcon },
    { name: 'Monthly Revenue Graph', description: 'know monthly salse and expense trend in visual formate', href: '/home/chart', icon: GitGraphIcon },
    { name: 'Company wise sales', description: 'See graphical visual of company wise genrated revenue', href: '/home/companySales', icon: BarChart }
];

const callsToAction = [
    { name: 'Watch Demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact Sales', href: '#', icon: PhoneIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const [sessionData, setSessionData] = React.useState(null);

    function logout(e) {
        e.preventDefault();
        setSessionData(null);
        navigate('/', { replace: true });
    }

    return (
        <header className="bg-theme-dark text-theme-light sticky top-0 left-0">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <div class="text-center">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" onClick={openDrawer} />
                        </div>
                    </a>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <Popover.Button className="flex items-center gap-x-1 text-lg  font-semibold leading-6 text-theme-light">
                            Features
                            <ChevronDownIcon className="h-5 w-5 flex-none text-theme-light" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-theme-light-shade shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {products.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-lg leading-6 hover:bg-theme-dark-shade"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-theme-dark" aria-hidden="true" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={item.href} className="block font-semibold text-gray-900" onClick={() => {
                                                    navigate(item.href, { replace: true })
                                                }}>
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    
                    <div className="text-lg font-semibold leading-6 text-theme-light hover:cursor-pointer" onClick={() => {
                        navigate('/home', { replace: true })
                    }}>
                        All Bill
                    </div>
                    <a className="text-lg font-semibold leading-6 text-theme-light hover:cursor-pointer" onClick={() => {
                        navigate('/home/expense', { replace: true })
                    }}>
                        All Expense
                    </a>
                    <div className="text-lg font-semibold leading-6 text-theme-light hover:cursor-pointer" onClick={() => {
                        navigate('/home/transaction', { replace: true })
                    }}>
                        Transaction
                    </div>
                </Popover.Group>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a className="text-lg font-semibold leading-6 text-theme-light hover:cursor-pointer" onClick={logout}>
                        Log out <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Product
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...products, ...callsToAction].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>


            <Drawer open={open} onClose={closeDrawer} className="p-4 text-center bg-theme-dark-shade">
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" className='text-theme-dark'>
                        Company Details
                    </Typography>
                </div>
                <Typography color="gray" className="mb-8  font-normal">
                    <img className="rounded-full h-24 w-24 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
                    <h1 className='text-xl font-bold text-theme-light p-3'>Vagheshvaree Engeineering Works</h1>
                    <div className="flex flex-col justify-around bg-theme-dark-shade text-th text-theme-light pt-5">
                        <div className='p-2 text-lg '>
                            GST No: 22049846521
                        </div>
                        <div className='p-2 text-lg '>
                            Phone No : 9879277425
                        </div>
                        <div className='p-2 text-lg'>

                        </div>
                        <div className='p-2 text-lg hover:text-theme-mediam-dark'>
                            <a href='https://vagheshvareeengineeringworks.odoo.com/'>Website</a>
                        </div>
                    </div>

                </Typography>
                <div className="flex gap-2">
                    <Button size="sm" variant="outlined">
                        Documentation
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </Drawer>
        </header>

    )
}





