import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  userid :false,
  isActive : false,
  isAdmin : false,
  name: false,
  email: false,
  sponsor: false, // object
  token: false, 
  // authToken :  false
  e_wallet : false,
  r_wallet : false,
  wd_request : false,
  total_wd_paid : false

 
}

export const AuthSlice = createSlice({
  name: 'auth', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
   
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setUserid: (state, action) => {
      state.userid = action.payload
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
   
    setToken: (state, action) => {
      state.token = action.payload
    },
   setSponsor: (state, action) => {
      state.sponsor = action.payload
    },
    setEWallet: (state, action) => {
      state.e_wallet = action.payload
    },
    setRWallet: (state, action) => {
      state.r_wallet = action.payload
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload
  },
  setWD_request: (state, action) => {
    state.wd_request = action.payload 
  },
  setTotal_wd_paid: (state, action) => {
    state.total_wd_paid = action.payload
  },
  
  
   
    setLogout: () => initialState
  }

})

export const { setLogout, setUserid, setIsLogin, setName, setIsActive, setIsAdmin, setToken, setSponsor, 
  setEWallet, setRWallet, setWD_request, setTotal_wd_paid,
  setAuthToken, setEmail
  
  

} = AuthSlice.actions

export default AuthSlice.reducer
