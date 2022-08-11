import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentUser: {
        name: "",
        email: "", 
        id: null
    }
}
const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUserEmail: (state, action) => {
            state.currentUser.email = action.payload
        },
        setCurrentUserName: (state, action) => {
            state.currentUser.name = action.payload
        },
        setCurrentUserId: (state, action) => {
            state.currentUser.id = action.payload
        }
    }
})

export const { setCurrentUserEmail, setCurrentUserName, setCurrentUserId } = currentUserSlice.actions

export const currentUserStateEmail = state => state.currentUser.currentUser.email
export const currentUserStateName = state => state.currentUser.currentUser.name
export const currentUserStateId = state => state.currentUser.currentUser.id

export default currentUserSlice.reducer