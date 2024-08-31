import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    soundEffect: false,

};

export const ErrorSlice = createSlice({
    name: 'sound',
    initialState,
    reducers: {
        setPlaySound: (state, action) => {
            state.soundEffect = action.payload
        },
        resetSound: () => initialState
    }

});

export const { resetSound, setPlaySound } = ErrorSlice.actions;

export default ErrorSlice.reducer;
