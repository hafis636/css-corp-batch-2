import { ArrowSmRightIcon, AtSymbolIcon, CheckIcon, LockClosedIcon } from '@heroicons/react/outline';
import FormikForm from '@components/FormikForm';
import React, { useCallback, useEffect, useState } from 'react';
import { Field, FormikErrors, FormikHelpers } from 'formik';
import Checkbox from '@components/Checkbox';
import Link from '@components/Link';
import { AddressFields, AddressInitValues, AddressInitValuesType, LoginFields, LoginInitValues, LoginInitValuesType, RegisterFields, RegisterInitValues, RegisterInitValuesType } from './orderUtils';
import { User } from 'types/UserType';
import { OfferType, ProductType } from 'types/productsTypes';
import { CartType } from 'types/cartTypes';
import RightPanel from '@components/RightPanel';
import Offer from '@components/Offer';
type Props = {
    onLogin: (
        values: LoginInitValuesType,
        actions: FormikHelpers<LoginInitValuesType>,
    ) => void;
    user: User;
    onRegister: (
        values: RegisterInitValuesType,
        actions: FormikHelpers<RegisterInitValuesType>,
    ) => void;
    loadCart: () => void;
    loadProducts: () => void;
    addAddress: () => void;
    products: ProductType[];
    offers: OfferType[];
    total: number;
    cart: CartType[];
    applyOffer: (offer: string | undefined) => void;
};

const Order = ({ onLogin, user, onRegister, loadCart, loadProducts, products, offers, cart, applyOffer, addAddress }: Props) => {
    const [isActive, setActive] = useState(false);
    const [defaultAddress, setdefaultAddress] = useState<AddressInitValuesType>();
    const [addressLength, setaddressLength] = useState(0);
    useEffect(() => {
        loadCart();
        loadProducts();
        if (offerExist) {
            applyOffer(offerExist);
        }
        parsedData?.addresses ? setaddressLength(parsedData?.addresses.length) : setaddressLength(0);
    }, [loadCart, loadProducts]);

    const userData = sessionStorage.getItem('@app/user') as string;
    const parsedData = JSON.parse(userData);
    const offerExist = sessionStorage.getItem('@app/offer');
    if (user.addresses && user.addresses.length > addressLength && isActive !== false) {
        setActive(false);
        setaddressLength(user.addresses.length);
    }

    const handleToggle = (e: any) => {
        const targetEl = e.target.rel;
        console.log(targetEl);
        console.log(isActive);
        console.log(addressLength);
        console.log(user.addresses?.length);
        targetEl === "register" ? setActive(true) : setActive(false);
        console.log(isActive);
    }

    const chooseAddress = (e: any) => {
        if (e.target.value !== "-1") {
            setdefaultAddress(parsedData.addresses[e.target.value]);
        } else {
            setdefaultAddress(undefined);
        }
    }
    const bgColorDivActive = userData ? 'bg-indigo-600' : 'bg-gray-300';
    const bgColorDivDisabled = userData ? 'bg-gray-300' : 'bg-indigo-600';
    const bgColorspanActive = userData ? 'bg-indigo-400' : 'bg-gray-600';
    const bgColorSpanDisabled = userData ? 'bg-gray-600' : 'bg-indigo-400';
    const bgColorTextDisabled = userData ? 'text-gray-600' : 'text-white';
    const bgColorTextActive = userData ? 'text-white' : 'text-gray-600';
    const validate = useCallback((values: RegisterInitValuesType) => {
        const errors: FormikErrors<RegisterInitValuesType> = {};
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'password and confirm password should same.';
        }
        return errors;
    }, []);

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
                    <div className="pt-12 md:pt-0 2xl:ps-4">
                        <div className="mt-8">
                            <div className="w-full">
                                <div className="max-w-7xl mx-auto">
                                    <div className={`my-2 flex flex-colum items-center justify-between flex-wrap p-2  ${bgColorDivDisabled}`}>
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className={`flex p-2 rounded-lg  ${bgColorSpanDisabled}`}>
                                                <LockClosedIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <h2 className={`ml-3 font-bold  ${bgColorTextDisabled}`}>Login / Register</h2>
                                            {userData &&
                                                <CheckIcon className="h-6 w-6 text-gray-600 mx-2" aria-hidden="true" />
                                            }
                                        </div>
                                    </div>
                                    {!userData &&
                                        <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg">
                                            <div className="min-h-full flex items-center justify-center p-4 sm:px-6 lg:px-4">
                                                {isActive === false ?
                                                    <FormikForm
                                                        fields={LoginFields}
                                                        initialValues={LoginInitValues}
                                                        onSubmit={onLogin}
                                                        btnText="Sign In"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <Field name="remember_me" component={Checkbox}>
                                                                Remember Me
                                                            </Field>
                                                            <Link href="#" onClick={((e) => handleToggle(e))} rel="register">Register</Link>
                                                        </div>
                                                    </FormikForm>
                                                    :
                                                    <FormikForm
                                                        validate={validate}
                                                        fields={RegisterFields}
                                                        initialValues={RegisterInitValues}
                                                        onSubmit={onRegister}
                                                        btnText="Sign Up"
                                                    >
                                                        <Link href="#" onClick={((e) => handleToggle(e))} rel="login" >Login</Link>
                                                    </FormikForm>}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="max-w-7xl mx-auto">
                                    <div className={`my-2 flex flex-colum items-center justify-between flex-wrap p-2  ${bgColorDivActive}`}>
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className={`flex p-2 rounded-lg  ${bgColorspanActive}`}>
                                                <AtSymbolIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <h2
                                                className={`ml-3 font-bold  ${bgColorTextActive}`}>Delivery Address</h2>
                                        </div>
                                    </div>
                                    {userData &&
                                        <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg relative">
                                            <div className="min-h-full flex items-start justify-right p-4 sm:px-6 lg:px-4">
                                                {parsedData.addresses && isActive === false &&
                                                    <>
                                                        <div className="w-1/2">
                                                            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white disabled:bg-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={((e) => chooseAddress(e))}>
                                                                <option value="-1">Select Address</option>
                                                                {parsedData.addresses.map((item: AddressInitValuesType, index: number) => {
                                                                    return (<option key={index} value={index}>{item.fullname},{item.address1},{item.address2}</option>)
                                                                })}
                                                            </select>

                                                            {parsedData.addresses && isActive === false &&
                                                                <Link href="#" onClick={((e) => handleToggle(e))} rel="register" className="font-medium text-indigo-600 hover:text-indigo-500 my-2 block">Add New</Link>
                                                            }
                                                        </div>
                                                        {defaultAddress &&
                                                            <div className="mx-5">
                                                                <p>{defaultAddress?.fullname}</p>
                                                                <p>{defaultAddress?.address1},{defaultAddress.address2}</p>
                                                                <p>{defaultAddress?.phone}</p>
                                                                <p> {defaultAddress?.zipcode}</p>
                                                            </div>
                                                        }
                                                    </>
                                                }
                                                {!parsedData.addresses || isActive === true ?
                                                    < FormikForm
                                                        fields={AddressFields}
                                                        initialValues={AddressInitValues}
                                                        onSubmit={addAddress}
                                                        btnText="Add Address"
                                                    >
                                                        {parsedData.addresses &&
                                                            <Link href="#" onClick={((e) => handleToggle(e))} rel="select">Select from the list</Link>
                                                        }
                                                    </FormikForm>
                                                    : ''

                                                }

                                            </div>
                                            {parsedData.addresses && isActive === false && defaultAddress &&
                                                <div className="w-1/4 flex-1 flex float-right m-5">
                                                    <span className="flex p-2 rounded-lg bg-indigo-600 w-full item-center justify-center">
                                                        <ArrowSmRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* <div className="w-full">
                                <div className="max-w-7xl mx-auto">
                                    <div className="bg-gray-300 my-2 flex flex-colum items-center justify-between flex-wrap p-2">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="flex p-2 rounded-lg bg-gray-500">
                                                <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <h2 className="ml-3 font-bold text-gray-600">Order Review</h2>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg sr-only">
                                        <div className="min-h-full flex items-center justify-center p-4 sm:px-6 lg:px-4">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="max-w-7xl mx-auto">
                                    <div className="bg-gray-300 my-2 flex flex-colum items-center justify-between flex-wrap p-2">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="flex p-2 rounded-lg bg-gray-500">
                                                <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <h2 className="ml-3 font-bold text-gray-600">Payment</h2>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg sr-only">
                                        <div className="min-h-full flex items-center justify-center p-4 sm:px-6 lg:px-4">

                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-3/5 mx-auto sm:w-[23.4375rem]">
                    {products.length > 0 && <RightPanel {...priceData} />}
                    <Offer applyOffer={applyOffer} offerDiscount={offerDiscount} />
                </div>
            </div>
        </div >
    )
}

export default Order;