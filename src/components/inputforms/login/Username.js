import React, { useEffect, useState, useRef } from "react"


//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormUsername, setFormUserToken } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function Username() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = async (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        if (value.length <= 10) {
            const re = /^[0-9a-zA-Z]*$/
            if (re.test(value)) {
                if (value.length <= 10) {

                  //  const userUppercase = (value.toUpperCase().trim())
                    dispatch(setFormUsername(value))

                                  
                }
            }
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'username') {
            //    inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])

    // const handleModalKeyboard = () => {
    //     dispatch(setModalKeyboardUsername(true))
    // }

    return (
        <>

<div>
    <label  className="block text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="username"
    value={username || ''}
    onChange={handleChange}
    
    />

  
  {formError && formError.path === 'username' &&     
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



