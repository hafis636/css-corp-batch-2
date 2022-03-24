import React, { memo, useRef } from 'react'
import { OfferType } from 'types/productsTypes';

type Props = {
    applyOffer: (offer: string | undefined) => void;
    offerDiscount: OfferType | null | undefined;
}

const Offer = ({ applyOffer, offerDiscount }: Props) => {
    const offerInput = useRef<HTMLInputElement | null>(null);
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const offerValue = offerInput.current?.value;
        applyOffer(offerValue);
    };
    return (
        <div className="relative z-10 rounded-lg shadow-xl text-slate-900 dark:text-slate-300 p-4">
            <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">OFFER CODE</h2>
            </div>
            <div className="w-full py-4 text-sm font-semibold lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                <form onSubmit={submitHandler} className="flex">
                    <input
                        className="appearance-none rounded relative block w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder={offerDiscount ? offerDiscount.name : "Offer code"}
                        required id="offer" ref={offerInput}
                    />
                    <button className="uppercase w-1/3 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Submit</button>
                </form>
                {offerDiscount?.invalid &&
                    <p className="text-red-400 text-sm font-normal">Please enter valid offer code</p>
                }
            </div>
        </div>
    )
}

export default memo(Offer);