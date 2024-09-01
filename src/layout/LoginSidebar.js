import React, {useRef, useEffect, useState } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import ReferralLink from "components/reflink/ReferralLink"
 import Sponsor from 'components/inputforms/register/Sponsor'
import UsernameReg from 'components/inputforms/register/Username'
import UsernameLogin from 'components/inputforms/login/Username'
import PasswordLogin from 'components/inputforms/login/Password'
import EmailLogin from 'components/inputforms/login/Email'
import EmailRegister from 'components/inputforms/register/Email'
import Phone from 'components/inputforms/register/Phone'
import FirstName from 'components/inputforms/register/FirstName'
import LastName from 'components/inputforms/register/LastName'
import Password from 'components/inputforms/register/Password'
import ConfirmPassword from 'components/inputforms/register/ConfirmPassword'
import BtnRegister from 'redux/actions/BtnRegister'
//---- REDUX STORE ---------------------
import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setShowLogin } from 'redux/reducers/SidebarReducer'

import { useSelector, useDispatch } from 'react-redux'
import { setLoginSidebar } from 'redux/reducers/MainmenuReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import {  setIsLogin, setName, setWallet,setEmail, setToken, setSponsor, setIsActive, setIsAdmin, setUserid,
    setEWallet, setRWallet
 } from 'redux/reducers/AuthReducer'
import { setModalLogin,setModalRegister, setModalMessage, setModalToast } from 'redux/reducers/ModalReducer'

//--------------------------------------

export default function Home() {

  
 const dispatch = useDispatch()
  const router = useRouter()
  const [spinner, setSpinner] = useState(false)
  const { loginSidebar } = useSelector((state) => state.MainmenuReducer)
  const { showLogin } = useSelector((state) => state.SidebarReducer)
// const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const { formError } = useSelector((state) => state.ErrorReducer)
  const { isLogin, name  } = useSelector((state) => state.AuthReducer) 
  const [showPassword, SetShowPassword] = useState(false)
  const { email  } = useSelector((state) => state.FormReducer) 


const toggleLogin = () => {
    dispatch(resetForm())
    dispatch(resetErrors())
    if(showLogin){
        dispatch(setShowLogin(false))
    }else{
        dispatch(setShowLogin(true))
    }
}  // handle on input value change
const handleChange = (e) => {
    dispatch(setError(false))
    const { name, value } = e.target
    if(name === 'email') {
        setEmail(value)
    }else if (name='password') {
        setPassword(value)
    }
}

const togglePassword = () =>{
    SetShowPassword(!showPassword)
}

const handleLogin = () => {


   
    if (!email) {
        setSpinner(false)
        return dispatch(setError({ path: "email", message: 'Email is required' }))
    }
    if (!password) {
        setSpinner(false)
        return dispatch(setError({ path: "password", message: 'Password is required' }))
    }

    handleLoginDelay()

}

const handleLoginDelay = async () => {

   const data = {
    email, password
    }


  setSpinner(true)

    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
        url: `${URL}/users/login`,
        method: 'POST',
        data,
        'headers': {
           // 'Authorization': token,
            accept: 'application/json',
            'content-type': 'application/json',
        }
    })
        .then(async response => {

            const data = response.data
          
            
            setSpinner(false)
            
            if (data.isSuccess) {

                const token = response.data.token
                const dataLogin = response.data.dataLogin

                dispatch(setIsLogin(true))
                dispatch(setToken(token))
                dispatch(setName(dataLogin.name))
                dispatch(setUserid(dataLogin.userid))
                dispatch(setIsActive(dataLogin.isActive))
                dispatch(setIsAdmin(dataLogin.isAdmin))
                dispatch(setSponsor(dataLogin.sponsor))       
                dispatch(setEWallet(dataLogin.e_wallet))    
                dispatch(setRWallet(dataLogin.r_wallet))
             
                dispatch(setLoginSidebar(false)) 
                dispatch(setModalMessage({ type: "success", title : "AWESOME", message: 'You are now Loged In' })) 
                return router.push('/users')

            } else {


               // dispatch(setModalToast({ type: 'error', title: "Activation Fail!", message: response.data.message }))
                 return dispatch(setError({ path: response.data.path, message: response.data.message }))
            }

            setSpinner(false)

        }).catch(function (error) {
            setSpinner(false)
            console.log(error)
            return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
        })
}




return (
  <>

{!isLogin && <ReferralLink/> } 
        
    <div  class={`min-h-screen overflow-auto mt-24 md:mt-16 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 
    dark:bg-gray-800 ${!loginSidebar && "translate-x-full"}`}
    >
       
      
       {showLogin ? 
 <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" >
    <div class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Please Login</h5>
     



<div>

<EmailLogin/>


<div>
    <div className="flex justify-between text-white mt-6 mb-4">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Password : </label>
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
       
      
        <div class="flex justify-between mt-6">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div>
     
        {spinner ?
                <button className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    processing.....</button>
                :
                    <button onClick={handleLogin} className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  Login User</button>
             }
    
      
    </div>
    <div class="flex justify-end">
    <button onClick={()=>dispatch(setLoginSidebar(false))} className="w-1/4 my-6 text-white bg-red-700 hover:bg-red-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  Close</button>
  </div>
  <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <button onClick={toggleLogin} class="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
        </div>
        
</div> 
</div>
:
<div class="max-w-md mx-auto mt-2">
    <div class="flex w-full">
    <h3 className="mb-6 mx-auto text-blue-800">Register your account</h3>
    </div>
 
<Sponsor/>
  <div class="grid md:grid-cols-2 md:gap-6">
   <FirstName/>
  <LastName/>
  </div>

  <EmailRegister />
  <Phone/>
  <Password/>
  <ConfirmPassword/>
  
 
<BtnRegister/>

  <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have account? <button onClick={toggleLogin} class="text-blue-700 hover:underline dark:text-blue-500">Login here</button>
        </div>

</div>
}
</div>

  </>
)
}



