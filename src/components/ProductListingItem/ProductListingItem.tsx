import { XIcon } from '@heroicons/react/outline';
import React, { ChangeEvent, memo } from 'react'
import { CartType } from 'types/cartTypes';

type Props = {
    image: string;
    title: string;
    price: number;
    id: number;
    cart: CartType[];
    updateCartItem: (cartItem: CartType | any) => void;
    deleteCartItem: (cartItem: CartType | any) => void;
}
const ProductListingItem = ({ image, title, price, id, cart, updateCartItem, deleteCartItem }: Props) => {
    const qty = cart.filter(current => current.productId === id)
        .map(filteredObj => filteredObj.quantity);

    const changeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
        const processId = cart.find(current => current.productId === id);
        updateCartItem({ ...processId, quantity: Number(event.target.value) });
    };
    const deleteItem = () => {
        const currentItem = cart.find(current => current.productId === id);
        deleteCartItem(currentItem);
    };
    return (<div className="flex border-b py-2 space-x-4 w-full item-center align-center">
        <div className='w-1/6 mr-2'>
            <img src={image} alt={title} className="w-20" />
        </div>
        <div className="w-full">
            <h2 className="text-xl font-bold mb-3">
                <a href={`/product/${id}`}>{title}</a>
            </h2>
            <div className="float-right font-bold p-3">{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price * qty[0])}
            </div>
            <div className='flex align-center item-center'>
                <p className="font-bold p-3 mr-3 border-r-2">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(price)}
                </p>
                <select className="w-24 mt-1 block w-1/6 py-2 px-3 border border-gray-300 bg-white disabled:bg-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={`${qty[0]}`}
                    onChange={changeQuantity}>
                    {[...Array(10).keys()].map((x) => (
                        <option key={x} value={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div className="w-6" onClick={deleteItem}>
            <XIcon />
        </div>
    </div>)
}

export default memo(ProductListingItem);