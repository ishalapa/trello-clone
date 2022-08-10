import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentUser: {
        name: "",
        email: ""
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
        }
    }
})

export const { setCurrentUserEmail, setCurrentUserName } = currentUserSlice.actions

export const currentUserStateEmail = state => state.currentUser.currentUser.email
export const currentUserStateName = state => state.currentUser.currentUser.name

export default currentUserSlice.reducer