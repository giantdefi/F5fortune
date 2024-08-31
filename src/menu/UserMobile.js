import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
const moment = require('moment')


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { setAllowSound } from 'redux/reducers/SettingReducer'
import { setSpinnerAtVisitor } from 'redux/reducers/LoaderReducer'
import { setLoaderBalance } from 'redux/reducers/LoaderReducer'

//--------------------------------------

export default function UserMobile() {

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)
    const { allowSound } = useSelector((state) => state.SettingReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const [menuSpinner, setMenuSpinner] = useState(false)
    const { loaderBalance } = useSelector((state) => state.LoaderReducer)

    useEffect(() => {  // redirect to next page!!!
        dispatch(setSpinnerAtVisitor(false))
        // dispatch(setbackURLs('/users'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleBack = () => {
        dispatch(setPlaySound('click'))
        router.push('/')
    }

    const onMenuClick = (link) => {
        dispatch(setPlaySound('click'))
        setItemLink(link)
        //   dispatch(setbackURLs('/'))
        setMenuSpinner(true)
        setTimeout(() => {
            router.push(link)
        }, 500)
    }

    const handleAllowSound = () => {
        dispatch(setPlaySound('click'))
        if (allowSound) {
            dispatch(setAllowSound(false))
        } else {
            dispatch(setAllowSound(true))
        }
    }

    const handleReload = () => {
        dispatch(setPlaySound('click'))
        dispatch(setLoaderBalance(true))

    }

    return (
        <>


            <div className="h-16 px-0 bg-gray-800 flex justify-between items-center pr-2">
                {/* <BackArrow backURL="/" /> */}
                <p className="ml-4">Hi, gfdgfdg </p>



            </div>


            <div className="w-full flex justify-between items-center gap-2 px-2 py-2">

                gfgdgdfgfg

            </div>




        </>
    )
}



