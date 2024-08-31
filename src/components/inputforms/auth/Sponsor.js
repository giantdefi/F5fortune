import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormSponsor } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setRefLink } from 'redux/reducers/ReferralReducer'
//-------------------------------------------------------


export default function Sponsor() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const { sponsor } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { refLink, masterRef } = useSelector((state) => state.ReferralReducer)

    console.log(masterRef)


    // IF HAS REF LINK
    useEffect(() => { // referal sponsor from URL if any
        if (refLink) {
            dispatch(setFormSponsor(refLink.toUpperCase()))
        } else {
            dispatch(setFormSponsor(masterRef.toUpperCase())) // actually  already done in index.js
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refLink])

    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 50) {
            dispatch(setFormSponsor((value.toUpperCase()).trim()))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'sponsor') {
            //   inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])



    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <p className="mb-2 text-sm"> Enter Sponsor Username  </p>
                    {refLink && <p className="mb-2 text-xs"> * Type or get Sponsor from URL Referral Link</p>}
                    <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="sponsor"
                        value={sponsor || ''}
                        onChange={handleChange}

                    />
                    {formError && formError.path === 'sponsor' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



