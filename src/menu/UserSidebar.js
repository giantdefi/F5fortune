import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//--------------------------------------

export default function UserSidebar() {

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const [spinner, setSpinner] = useState(false)
    const dispatch = useDispatch()

    const onMenuClick = (link) => {
        dispatch(setPlaySound('click'))
        router.push(link)
    }

    return (
        <>




            <div className="h-[16%] bg-[#051e34ff] z-50">

                <a onClick={() => onMenuClick('/users')} className="cursor-pointer bg-sky-900 flex flex-row items-center h-1/2 border-b border-gray-500 px-4" >
                    <span className="justify-center overflow-x-hidden"><i className="icofont-user text-lg text-white" /></span>
                    <span className="ml-2 text-sm transition-all duration-300 uppercase">Dashboard</span>

                </a>

                <a onClick={() => onMenuClick('/users/board')} className="cursor-pointer bg-sky-900 flex flex-row items-center h-1/2 px-4">
                    <span className="justify-center overflow-x-hidden"><i className="icofont-chart-growth text-xl text-white" />
                    </span>
                    <span className="ml-2 text-sm transition-all duration-300">Board</span></a>
            </div>



        </>
    )
}



