import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    app_title : false,
    app_domain : false, 
    app_description : false, 
    app_tags : false,
    app_currency : false,
    admin_wallet : false,

}

export const constantsSlice = createSlice({
    name: 'constants',
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
        resetConstant: () => initialState
    }

})

export const { 
    setApp_title, setApp_domain, setApp_description, setApp_tags, setApp_currency, setAdmin_wallet,
 } = constantsSlice.actions

export default constantsSlice.reducer
