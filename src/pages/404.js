import React, { } from "react"
import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------

export default function Home() {

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

    return (
        <>
            <Head>
                <title>404 {title}</title>
                <meta name="description" content="404 page not found" />
            </Head>

            <div className="mb-10">
                <div className="pt-2 mx-4">
                    <div className="flex justy-center items-center md:mt-40" >
                        <div className="m-auto text-center text-white">
                            <div className="flex justify-center">
                                <img src="/assets/img/404.webp" alt="banner" className="w-2/3" />
                            </div>
                            <h3 className="bold ">404 PAGE NOT FOUND</h3>
                            <h4 className="text-md">Please back to page</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



