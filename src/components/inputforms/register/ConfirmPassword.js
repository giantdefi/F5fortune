import React, { useEffect, useState, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setFormConfirmPassword } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
//-------------------------------------------------------


export default function ConfirmPassword() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { confirmPassword } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 50) {
            dispatch(setFormConfirmPassword(value.trim()))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'confirmPassword') {
         //   inputRef.current.focus()
         //   inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen
            //  
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
    <div className="flex justify-end text-white">
   
    {!showPassword ?
                    <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer text-gray-900">
                        <p className="text-sm"> Hide </p><p>   <i className="icofont-eye-blocked text-xl ml-2" /></p>
                    </div> :
                    <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer text-gray-900">
                        <p className="text-sm"> Show </p><p>   <i className="icofont-eye text-xl ml-2" /></p>
                    </div>}


   
    </div>

    <div className="relative z-0 w-full  group">
      <input  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-60 dark:focus:border-blue-500
       focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
      placeholder=" " 
      type ={!showPassword ? "password" : "text"}
      name="confirmPassword"
      value={confirmPassword || ''}
      onChange={handleChange}
      />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500
       dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
       peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
  </div>  
     
  {formError && formError.path === 'confirmPassword' &&     
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




