import { AtSymbolIcon, CalendarIcon, CurrencyDollarIcon, LockClosedIcon } from '@heroicons/react/outline';
import FormikForm from '@components/FormikForm';
import React, { Component } from 'react';
import { Field, FormikHelpers } from 'formik';
import Checkbox from '@components/Checkbox';
import Link from '@components/Link';
import { LoginFields, LoginInitValues, LoginInitValuesType } from './orderUtils';
import { User } from 'types/UserType';
type Props = {
    onLogin: (
        values: LoginInitValuesType,
        actions: FormikHelpers<LoginInitValuesType>,
    ) => void;
    user: User;
};

const Order = ({ onLogin, user }: Props) => {
    return (
        <div className="container p-12 mx-auto">
            <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div className="flex flex-col md:w-full">
                    <div className="pt-12 md:pt-0 2xl:ps-4">
                        <div className="mt-8">
                            <div className="w-full">
                                <div className="max-w-7xl mx-auto">
                                    <div className="bg-indigo-600 my-2 flex flex-colum items-center justify-between flex-wrap p-2">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="flex p-2 rounded-lg bg-indigo-800">
                                                <LockClosedIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <h2 className='ml-3 font-bold text-white'>Login / Register</h2>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg">
                                        <div className="min-h-full flex items-center justify-center p-4 sm:px-6 lg:px-4">
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
                                                    <Link href="#">Forgot your password?</Link>
                                                </div>
                                            </FormikForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="max-w-7xl mx-auto">
                                    <div className="bg-gray-300 my-2 flex flex-colum items-center justify-between flex-wrap p-2">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="flex p-2 rounded-lg bg-gray-500">
                                                <AtSymbolIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <h2 className="ml-3 font-bold text-gray-600">Delivery Address</h2>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg sr-only">
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-3/5 mx-auto sm:w-[23.4375rem]">
                    <div className="relative z-10 rounded-lg shadow-xl text-slate-900 dark:text-slate-300 p-4">
                        <div className="flex p-4 mt-4">
                            <h2 className="text-xl font-bold">ITEMS 4</h2>
                        </div>
                        <div
                            className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Subtotal<span className="ml-2 float-right">$40.00</span></div>
                        <div
                            className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Shipping Tax<span className="ml-2 float-right">$10</span></div>
                        <div
                            className="w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Total<span className="ml-2 float-right">$50.00</span></div>
                    </div>
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

export default Order;