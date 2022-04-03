
import ProductListingItem from '@components/ProductListingItem/ProductListingItem';
import RightPanel from '@components/RightPanel/RightPanel';
import Offer from '@components/Offer';
import React, { memo, useEffect } from 'react';
import { CartType } from 'types/cartTypes';
import { OfferType, ProductType } from 'types/productsTypes';

type Props = {
    loadCart: () => void;
    loadProducts: () => void;
    updateCartItem: () => void;
    products: ProductType[];
    offers: OfferType[];
    total: number;
    cart: CartType[];
    applyOffer: (offer: string | undefined) => void;
    deleteCartItem: () => void;
}

const Cart = ({ loadCart, loadProducts, products, offers, cart, updateCartItem, applyOffer, deleteCartItem }: Props) => {
    const offerExist = sessionStorage.getItem('@app/offer');
    useEffect(() => {
        loadCart();
        loadProducts();
        if (offerExist) {
            applyOffer(offerExist);
        }
    }, [loadCart, loadProducts]);
    const subtotal = products.reduce((prev, next) => prev + next.qty * next.price, 0);
    const shippingCharge = 10;
    const offerDiscount = offers ? offers.find((x: any) => x) : null;
    const priceWithOffer: any = offerDiscount && !offerDiscount.invalid ? offerDiscount.offerFunc(subtotal) : subtotal;
    const total = priceWithOffer - shippingCharge;
    const appliedOffer = {
        "offername": offerDiscount?.name,
        "offerAmount": offerDiscount ? subtotal - priceWithOffer : 0
    }
    const totalCount = products.reduce((prev, next) => prev + next.qty, 0);

    const priceData = {
        subtotal,
        shippingCharge,
        total,
        totalCount,
        appliedOffer
    };
    return (
        <div className="container p-12 mx-auto">
            <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div className="flex flex-col md:w-full">
                    <h2 className="mb-4 font-bold md:text-xl text-heading ">Order Summary
                    </h2>
                    <div className="pt-12 md:pt-0 2xl:ps-4">
                        {products.length > 0 ?
                            <>
                                <div className="mt-8">
                                    <div className="flex flex-col space-y-4">
                                        {products.map((item) => {
                                            return (<ProductListingItem key={item.id} {...item} cart={cart} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />)
                                        })}
                                    </div>
                                </div>
                                <div className="inline-flex rounded-md shadow my-8 float-right w-1/2">
                                    <a href="/order" className="uppercase w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Place Order </a>
                                </div>
                            </>
                            :
                            <>
                                <p>Looks like Your Bag is Currently Empty. Please add some products to cart</p>
                                <div className="inline-flex rounded-md shadow my-8 float-right w-1/2">
                                    <a href="/" className="uppercase w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Go shopping</a>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-3/5 mx-auto sm:w-[23.4375rem]">
                    {products.length > 0 && <RightPanel {...priceData} />}
                    <Offer applyOffer={applyOffer} offerDiscount={offerDiscount} />
                </div>
            </div>
        </div>
    )
}

export default memo(Cart);