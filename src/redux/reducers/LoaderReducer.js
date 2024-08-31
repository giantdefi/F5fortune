import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    spinner: false,
    btnSpinner: false,
    btnDisabled: false,
    menuSpinner: false,
    loaderBalance: false,
    spinnerMtree: false,
    spinnerLoadUp: false,
    spinnerLoadBack: false,
    spinnerMtreeImage: false,
    spinnerAtVisitor: false, // top menu user
    spinnerAtLogo: false,
    buyEpinSpinner: false,
    buyPackageSpinner: false,
    loader: false,
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setSpinner: (state, action) => {
            state.spinner = action.payload
        },
        setBtnSpinner: (state, action) => {
            state.btnSpinner = action.payload
        },
        setBtnDisabled: (state, action) => {
            state.btnDisabled = action.payload
        },
        setMenuSpinner: (state, action) => {
            state.menuSpinner = action.payload
        },
        setLoaderBalance: (state, action) => {
            state.loaderBalance = action.payload
        },
        setSpinnerMtree: (state, action) => {
            state.spinnerMtree = action.payload
        },
        setSpinnerLoadUp: (state, action) => {
            state.spinnerLoadUp = action.payload
        },
        setSpinnerLoadBack: (state, action) => {
            state.spinnerLoadBack = action.payload
        },
        setSpinnerMtreeImage: (state, action) => {
            state.spinnerMtreeImage = action.payload
        },
        setSpinnerAtVisitor: (state, action) => {
            state.spinnerAtVisitor = action.payload
        },
        setSpinnerAtLogo: (state, action) => {
            state.spinnerAtLogo = action.payload
        },
        setBuyEpinSpinner: (state, action) => {
            state.buyEpinSpinner = action.payload
        },
        setBuyPackageSpinner: (state, action) => {
            state.buyPackageSpinner = action.payload
        },
        setLoader: (state, action) => {
            state.loader = action.payload
        },

        resetLoader: () => initialState
    }

})

export const { resetLoader, setSpinner, setBtnSpinner, setBtnDisabled, setMenuSpinner, setLoaderBalance, setSpinnerAtVisitor,
    setSpinnerMtree, setSpinnerLoadUp, setSpinnerLoadBack, setSpinnerMtreeImage, setSpinnerAtLogo, setBuyEpinSpinner, setLoader, setBuyPackageSpinner
} = loaderSlice.actions

export default loaderSlice.reducer
