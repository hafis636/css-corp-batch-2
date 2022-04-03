import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from '@components/Link';
type Props = {
    quantity: number;
    onLogout: () => void;
}
const ContainerLayout = ({
    quantity,
    onLogout
}: Props) => {
    const userData = sessionStorage.getItem('@app/user') as string;
    const userObj = JSON.parse(userData);
    const logout = () => {
        onLogout();
    }
    return (
        <div className="container lg:p-12 mx-auto">
            <div className='fixed h-14 left-0 width-full top-0 bg-gray-600 right-0 z-20'>

                {userData &&
                    <Popover className="p-4 float-right text-white">
                        <Popover.Button
                            className='group rounded-md inline-flex items-center text-base font-medium'>
                            <span>Hi, {userObj.name}</span>
                            <ChevronDownIcon className='ml-2 h-5 w-5 group-hover:text-gray-500'
                                aria-hidden="true"
                            />
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
                            <Popover.Panel className="z-10 transform mt-3 px-2">
                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="relative grid gap-4 bg-white p-4">
                                        <Link href="#" onClick={logout} className="font-medium text-gray-600 hover:text-indigo-500" >Logout</Link>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                }
                <a href="/cart" className="flex items-center p-4 float-right text-white">
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium">{quantity}</span>
                </a>
            </div>
            <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <Outlet />
            </div>
        </div>
    );
};

export default ContainerLayout;
