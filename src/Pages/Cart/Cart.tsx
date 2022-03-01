
import ProductListingItem from '@components/ProductListingItem/ProductListingItem';
import Product from 'components/Product/Product';
import RightPanel from '@components/RightPanel/RightPanel';
import React, { memo, useEffect } from 'react';
import { CartType } from 'types/cartTypes';
import { ProductType } from 'types/productsTypes';

type Props = {
    loadCart: () => void;
    loadProducts: () => void;
    products: ProductType[];
}

const Cart = ({ loadCart, loadProducts, products }: Props) => {
    useEffect(() => {
        loadCart();
        loadProducts();
    }, [loadCart, loadProducts]);
    const subtotal = products.reduce((prev, next) => prev + next.price, 0);
    const shippingCharge = 10;
    const offerDiscount = (subtotal) / 100 * 10;
    const total = offerDiscount ? (subtotal + shippingCharge) - offerDiscount : (subtotal + shippingCharge);
    const totalCount = products.length;
    const priceData = {
        subtotal,
        shippingCharge,
        total,
        totalCount,
    };
    return (
        <div className="container p-12 mx-auto">
            <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div className="flex flex-col md:w-full">
                    <h2 className="mb-4 font-bold md:text-xl text-heading ">Order Summary
                    </h2>
                    <div className="pt-12 md:pt-0 2xl:ps-4">
                        <div className="mt-8">
                            <div className="flex flex-col space-y-4">
                                {products.map((item) => {
                                    return (<ProductListingItem key={item.id} {...item} />)
                                })}
                            </div>
                        </div>
                        <div className="inline-flex rounded-md shadow my-8 float-right w-1/2">
                            <a href="/order" className="uppercase w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Place Order </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-3/5 mx-auto sm:w-[23.4375rem]">
                    <RightPanel {...priceData} />
                    <div className="relative z-10 rounded-lg shadow-xl text-slate-900 dark:text-slate-300 p-4">
                        <div className="flex p-4 mt-4">
                            <h2 className="text-xl font-bold">OFFER CODE</h2>
                        </div>
                        <div className="flex w-full py-4 text-sm font-semibold lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            <input
                                className="appearance-none rounded relative block w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Offer code"
                            />
                            <button className="uppercase w-1/3 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Cart);