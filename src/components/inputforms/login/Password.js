import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormPassword } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function Password() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { password } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))


        const { name, value } = e.target
        if (value.length <= 20) {
            dispatch(setFormPassword(value))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'password') {
            // inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    const togglePassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }


    return (
        <>

          

    <div>
    <div className="flex justify-between text-white">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white">Enter Password </label>
    {!showPassword ?
                    <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer text-gray-900">
                        <p className="text-sm"> Hide </p><p>   <i className="icofont-eye-blocked text-xl ml-2" /></p>
                    </div> :
                    <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer text-gray-900">
                        <p className="text-sm"> Show </p><p>   <i className="icofont-eye text-xl ml-2" /></p>
                    </div>}


   
    </div>
    <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
     
    type ={!showPassword ? "password" : "text"}
    name="password"
    value={password || ''}
    onChange={handleChange}
    
    />

  
  {formError && formError.path === 'password' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 ">{formError.message}</span> 
    </p> 
}
        
</div> 


        </>

    )
}



