import Rating from '@components/Rating';
import Breadcrumb from '@components/Breadcrumbs';
import React from 'react'
import { ProductType } from 'types/productsTypes';
export type ProductProps = {
    addCartItem: (productId: number) => void;
    cartStatus: number;
} & ProductType;
const SPP = ({ title, price, rating, description, category, image, id, addCartItem, cartStatus }: ProductProps) => {
    return (
        <>
            <Breadcrumb category={category} title={title} />
            <div className="flex w-full flex-col lg:flex-row">
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden p-5 lg:w-1/2">
                    <img
                        src={image}
                        alt={title}
                        className="lg:w-2/3 object-center object-cover"
                    />
                </div>
                <div className="lg:p-16 lg:w-1/2 relative">
                    <div className="lg:col-span-2 lg:pr-8 mb-4">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(price)}
                        </p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <Rating {...rating} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <p className="text-base text-gray-900 md:my-24 lg:m-0">{description}</p>
                    </div>
                    <div className="fixed md:absolute left-0 bottom-0 w-full text-center md:w-1/2 md:right-0 md:left-auto md:mt-5 text-white uppercase text-bold">
                        {cartStatus === -1 ?
                            <a onClick={() => addCartItem(id)} className="bg-indigo-500 w-full font-bold p-3 block md:rounded-md">
                                Add to cart
                            </a>
                            :
                            <p className="font-bold w-full font-bold p-3 block bg-gray-500 md:rounded-md">Added to Cart</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SPP;