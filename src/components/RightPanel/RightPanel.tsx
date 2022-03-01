import React from 'react'

type Props = {
    totalCount: number;
    subtotal: number;
    shippingCharge: number;
    total: number;
}

const RightPanel = ({ totalCount, subtotal, shippingCharge, total }: Props) => {
    return (
        <div className="relative z-10 rounded-lg shadow-xl text-slate-900 dark:text-slate-300 p-4">
            <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS {totalCount}</h2>
            </div>
            <div
                className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal
                <span className="ml-2 float-right">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(subtotal)}
                </span>
            </div>
            <div
                className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax
                <span className="ml-2 float-right">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(shippingCharge)}
                </span>
            </div>
            <div
                className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Offer Applied
                <span className="ml-2 float-right">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(total)}
                </span>
            </div>
            <div
                className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total
                <span className="ml-2 float-right">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(total)}
                </span>
            </div>
        </div>
    )
}

export default RightPanel;