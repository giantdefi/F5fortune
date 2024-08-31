import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    formError: false,

}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.formError = action.payload
        },
        resetErrors: () => initialState
    }

})

export const { resetErrors, setError } = errorSlice.actions

export default errorSlice.reducer
