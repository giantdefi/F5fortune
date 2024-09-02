import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormSponsor } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setModalKeyboardSponsor } from 'redux/reducers/ModalReducer'
//-------------------------------------------------------


export default function Sponsor() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const { sponsor } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { refLink } = useSelector((state) => state.ReferralReducer)
    const { loginSidebar } = useSelector((state) => state.MainmenuReducer)
    // console.log('ref link : ' + refLink)

    // IF HAS REF LINK
    useEffect(() => { // referal sponsor from URL if any

       if (refLink) {
            setTimeout(() => {
                dispatch(setFormSponsor(refLink))
           }, 500)

       }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refLink, loginSidebar])

    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 50) {
            dispatch(setFormSponsor((value.toUpperCase()).trim()))
        }
    }
  
    return (
        <>
          <div className="relative z-0 w-full mb-4 group">
    

    <div className="flex justify-between ">
                        <p className="text-sm ">Your Sponsor or Get from Referral Link</p>
                    </div>

      <input type="text"   className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
      name="sponsor"
      value={sponsor || ''}
      onChange={handleChange}
      />
   

  {formError && formError.path === 'sponsor' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
                     
  </div>                 



        </>

    )
}



