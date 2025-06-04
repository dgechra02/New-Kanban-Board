import { createSlice } from "@reduxjs/toolkit";

const formToggleSlice = createSlice({
    name: 'formToggle',
    initialState: false,    
    reducers: {
        toggle: (state) => !state
    }
})

export const {toggle} = formToggleSlice.actions; 
export default formToggleSlice.reducer; 

