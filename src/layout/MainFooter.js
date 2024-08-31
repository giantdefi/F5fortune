import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------

export default function MainFooter() {

    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { width, domain } = useSelector((state) => state.GeneralReducer)
    return (
        <>

            <footer className="p-4 bg-gray-800 items-center justify-center flex flex-col text-white w-full">
                <p className="text-sm text-gray-200 sm:text-center mx-auto">
                    Copyright © {domain} All Rights Reserved
                </p>
            
            </footer>

        </>
    )
}



