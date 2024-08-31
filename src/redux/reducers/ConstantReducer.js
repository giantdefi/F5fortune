import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
    app_title : false,
    app_domain : false, 
    app_description : false, 
    app_tags : false,
    app_currency : false,
    admin_wallet : false,
    splittoEWallet : false,
    splittoRwallet : false,
   
   

    
}

export const ConstantSlice = createSlice({
    name: 'constant', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setApp_title: (state, action) => { // not used to prevent error only
            state.app_title = action.payload 
        },
        setApp_domain: (state, action) => { // not used to prevent error only
            state.app_domain = action.payload
        },
        setApp_description: (state, action) => { // not used to prevent error only
            state.app_description = action.payload
        },
        setApp_tags: (state, action) => { // not used to prevent error only
            state.app_tags = action.payload
        },
        setApp_currency: (state, action) => { // not used to prevent error only
            state.app_currency = action.payload
        },
        setAdmin_wallet: (state, action) => { // not used to prevent error only
            state.admin_wallet = action.payload
        },
        setTo_E_Wallet: (state, action) => { // not used to prevent error only
            state.to_E_Wallet = action.payload
        },
        setTo_R_Wallet: (state, action) => { // not used to prevent error only
            state.to_R_Wallet = action.payload
        },
        setSplittoEWallet: (state, action) => { // not used to prevent error only
            state.splittoEWallet = action.payload
        },
        setSplittoRwallet: (state, action) => { // not used to prevent error only
            state.splittoRwallet = action.payload
        },
     
        
     
     
    }

})

export const { 
    setApp_title, setApp_domain, setApp_description, setApp_tags, setApp_currency, setAdmin_wallet,setSplittoEWallet,setSplittoRwallet,
   setTo_E_Wallet, setTo_R_Wallet, 
} = ConstantSlice.actions

export default ConstantSlice.reducer
