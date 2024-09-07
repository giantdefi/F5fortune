import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // registration form
    sponsor: false,
    name : false,
    username: false,
    email: false, // for test send email
    phone: false,
    password: false,
    confirmPassword: false,
    country : false,
    firstName : false,
    lastName : false,

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
 // change email
  currentemail : false,
  newEmail : false,

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
        setCurrentemail: (state, action) => { 
            state.currentemail = action.payload 
        },
        setNewEmail: (state, action) => {
            state.newEmail = action.payload
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

        setWDWalletAmount: (state, action) => {
            state.wdWalletAmount = action.payload
        },
        setWDCryptoAddress: (state, action) => {
            state.walletAddr = action.payload
        },

        setTransactionHash: (state, action) => {
            state.transactionHash = action.payload
        }, 
        setDepositAmount: (state, action) => {
            state.depositAmount = action.payload
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
    setCurrentpassword, setNewPassword, setNewPasswordConfirm, setFirstName, setLastName,
    setWDWalletAmount, setWDCryptoAddress, setTransactionHash, setDepositAmount, setCurrentemail, setNewEmail

} = FormSlice.actions

export default FormSlice.reducer
