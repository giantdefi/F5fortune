import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentemail, setNewEmail } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'

//-------------------------------------------------------


export default function Password() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { newEmail } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))


        const { name, value } = e.target
        if (value.length <=50) {
            dispatch(setNewEmail(value))
        }
    }


    return (
        <>

            <div className="flex justify-between text-white mt-6">
                <p className="mb-2 "> Enter New Email   </p>
              
            </div>

            <input  autoComplete="off"
                className="w-full mt-2 py-3 px-3 rounded-lg h-[60px] bg-gray-800 border border-gray-400 
                   text-gray-50  font-semibold focus:border-green-500 focus:outline-none" ref={inputRef}
                name="newEmail"
                value={newEmail || ''}
                onChange={handleChange}
            //onClick={() => dispatch(setModalKeyboardPassword(true))}

            />
           {formError && formError.path === 'newEmail' &&
                        <p className="text-yellow-300 ml-2 mt-2 text-sm animated backInLeft items-center flex">
                            {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                            <i className="icofont-arrow-right animate-ping  mr-2"></i>
                            {formError.message}
                        </p> 
                     }



        </>

    )
}



