import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        status: {},
    },
    reducers: {
        updateError: (state, { payload }) => {
            state.status = payload;
        }
    },
})

export const { updateError } = errorSlice.actions

export default errorSlice.reducer