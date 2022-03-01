import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/outline';
type Props = {
    quantity: number;
}
const ContainerLayout = ({
    quantity
}: Props) => {
    return (
        <div className="container lg:p-12 mx-auto">
            <div className='fixed h-14 left-0 width-full top-0 bg-gray-600 right-0 z-20'>
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
