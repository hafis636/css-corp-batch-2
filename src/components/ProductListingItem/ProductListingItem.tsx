import { XIcon } from '@heroicons/react/outline';
import React from 'react'

type Props = {
    image: string;
    title: string;
    price: number;
    id: number;
}
const ProductListingItem = ({ image, title, price, id }: Props) => {
    return (<div className="flex border-b py-2 space-x-4 w-full item-center align-center">
        <div className='w-1/6 mr-2'>
            <img src={image} alt={title} className="w-20" />
        </div>
        <div className="w-full">
            <h2 className="text-xl font-bold mb-3">
                <a href={`/product/${id}`}>{title}</a>
            </h2>
            <div className='flex align-center item-center'>
                <p className="font-bold p-3 mr-3 border-r-2">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(price)}
                </p>
                <select className="mt-1 block w-1/6 py-2 px-3 border border-gray-300 bg-white disabled:bg-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {[...Array(10).keys()].map((x) => (
                        <option key={x} value={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div className="w-6">
            <XIcon />
        </div>
    </div>)
}

export default ProductListingItem;