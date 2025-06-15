import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeUserFromFeed:(state,action)=>{
            const newfeed=state.filter((user)=>user._id!==action.payload)
            return newfeed;
        },
        removeFeed:()=>null,
    }
})
export const {addFeed,removeUserFromFeed,removeFeed}=feedSlice.actions;
export default feedSlice.reducer;