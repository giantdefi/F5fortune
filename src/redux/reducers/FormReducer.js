import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // registration form
    sponsor: 'FX10001',
    name : 'jhon Doe',
    username: false,
    email: 'master@gmail.com', // for test send email
    phone: '+612345678900',
    password: 'T123t123!@#',
    confirmPassword: 'T123t123!@#',
    country : false,
    firstName : 'jhon ',
    lastName : ' Doe',

    //forgot pass
  

    // WD
    wdWalletAmount :false,
    walletAddr : false,

     //---wd wallet
 
     depositAmount: false,
     admWalletAddress: false,
     transactionHash: false,
     userWalletAddr: false,

     setSearchUsername : false,

      // change password
  currentpassword : false,
  newPassword : false,
  newPasswordConfirm : false,

}

export const FormSlice = createSlice({
    name: 'form', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setFormSponsor: (state, action) => {
            state.sponsor = action.payload
        },
        setFormName: (state, action) => {
            state.name = action.payload
        },
        setFormUsername: (state, action) => {
            state.username = action.payload
        },
        setFirstName: (state, action) => { 
            state.firstName = action.payload
        },
        setLastName: (state, action) => {
            state.lastName = action.payload
        },
    
        setFormPhone: (state, action) => {
            state.phone = action.payload
        },
        setFormEmail: (state, action) => {
            state.email = action.payload
        },
        setFormPassword: (state, action) => {
            state.password = action.payload
        },
        setFormConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },
     
        setCountry: (state, action) => {
            state.country = action.payload
        },
       
     
         // change password
      setCurrentpassword: (state, action) => {
        state.currentpassword = action.payload
      },
      setNewPassword: (state, action) => {
        state.newPassword = action.payload
      },
      setNewPasswordConfirm: (state, action) => {
        state.newPasswordConfirm = action.payload
      },
 

        resetForm: () => initialState
    }

})

export const {  resetForm, 

    setFormSponsor, setFormName, setFormUsername, setFormPhone, setFormPassword,  
    setFormConfirmPassword, setFormEmail, setConfirmPassword, setCountry ,
    setCurrentpassword, setNewPassword, setNewPasswordConfirm, setFirstName, setLastName

} = FormSlice.actions

export default FormSlice.reducer
