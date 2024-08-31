import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    fullname: false,
    handphone: false,
    email: false,
    address: false,
    city: false,
    province: false,
    country: false,
    postcode: false,
    avatar: false,
    geolocation: false,
    isGetGeocodeOK: false, // make form read only or not
    verified: false,

    // change password

    currentPassword: false,
    newPassword: false,
    confirmPassword: false,

    serverTime: false,

    allowReloadData : false,
    allowReloadUsers : false,

     // userClone: false,
     masterCloner: false,
     myclonedUsers: false,
 
     userClone : false, // form
     allowReloadClonUser: false,
     cloneLoginUsername: false,
     allowReloadPage: false,
     warningCreateClone : false

}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setNameFull: (state, action) => {
            state.fullname = action.payload
        },
        setHandphone: (state, action) => {
            state.handphone = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setProvince: (state, action) => {
            state.province = action.payload
        },
        setCountry: (state, action) => {
            state.country = action.payload
        },
        setPostcode: (state, action) => {
            state.postcode = action.payload
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload
        },
        setGeoLocation: (state, action) => {
            state.geolocation = action.payload
        },
        setIsGetGeocodeOK: (state, action) => {
            state.isGetGeocodeOK = action.payload
        },
        setIsVerified: (state, action) => {
            state.verified = action.payload
        },

        setCurrentPassword: (state, action) => {
            state.currentPassword = action.payload
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },

        setServerTime: (state, action) => {
            state.serverTime = action.payload
        },

        setAllowReloadData: (state, action) => {
            state.allowReloadData = action.payload
        }, 
        setAllowReloadUsers: (state, action) => {
            state.allowReloadUsers = action.payload
        }, 

        setCloneUser: (state, action) => {
            state.userClone = action.payload
        },
        setMasterCloner: (state, action) => {
            state.masterCloner = action.payload
        },
        setMyclonedUsers: (state, action) => {
            state.myclonedUsers = action.payload
        },
        setAllowReloadClonUser: (state, action) => {
            state.allowReloadClonUser = action.payload
        },
        setCloneLoginUsername: (state, action) => {
            state.cloneLoginUsername = action.payload
        },
        setAllowReloadPage: (state, action) => {
            state.allowReloadPage = action.payload
        },
        setWarningCreateClone: (state, action) => {
            state.warningCreateClone = action.payload
        },

        resetUsers: () => initialState
    }

})

export const { resetUsers, setNameFull, setHandphone, setEmail, setAddress,setCity,
    setProvince, setCountry, setPostcode, setAvatar, setGeoLocation, setIsGetGeocodeOK, setIsVerified,
    setCurrentPassword, setNewPassword, setConfirmPassword, setServerTime, setAllowReloadData, setAllowReloadUsers,setWarningCreateClone,

    setMasterCloner, setCloneUser,
    setMyclonedUsers, setAllowReloadClonUser, setCloneLoginUsername, setAllowReloadPage

} = UsersSlice.actions

export default UsersSlice.reducer
