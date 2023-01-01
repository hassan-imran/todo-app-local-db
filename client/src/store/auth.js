import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: false,
    },
    reducers: {
        updateAuth: (state, {payload}) => {
            state.value = payload;
        },
    },
})

export const { updateAuth } = authSlice.actions

export default authSlice.reducer