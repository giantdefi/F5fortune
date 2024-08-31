import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'


//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'
import { setModalMenuDrawer, setCloseModal, setModalLogin } from 'redux/reducers/ModalReducer'
import { setLoaderBalance } from 'redux/reducers/LoaderReducer'

import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { resetAffiliate } from 'redux/reducers/AffiliateReducer'
import { setLogout} from 'redux/reducers/AuthReducer'
//--------------------------------------

export default function Home() {


    const { domain, title, desc } = useSelector((state) => state.GeneralReducer) 

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        
        handleLogout()
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleLogout = () => {

        dispatch(resetErrors())
        dispatch(resetForm())
        dispatch(setLogout()) 
       return router.push('/')
      
    }


    return (
        <>

           

        </>
    )
}




