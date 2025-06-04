import {createSlice} from '@reduxjs/toolkit'; 
import { act } from 'react';

const BoardDetailsSlice = createSlice({
    name: 'boardColor',
    initialState: {color: '#000000', name: "", desc: ""}, 
    reducers: {
        setColor: (state, action) => {state.color = action.payload},
        setName: (state, action) => {state.name = action.payload},
        setDesc: (state, action) => {state.desc = action.payload},
    }
}); 

export const {setColor, setName, setDesc} = BoardDetailsSlice.actions
export default BoardDetailsSlice.reducer