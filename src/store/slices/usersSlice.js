import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    users: null,
    currentUser: {
        name: "",
        email: "", 
        id: null,
    },
    currentUserMembers: []
}
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setCurrentUserEmail: (state, action) => {
            state.currentUser.email = action.payload
        },
        setCurrentUserName: (state, action) => {
            state.currentUser.name = action.payload
        },
        setCurrentUserId: (state, action) => {
            state.currentUser.id = action.payload
        },
        setCurrentUserMembers: (state, action) => {
            state.currentUserMembers = action.payload
        }
    }
})

export const { setUsers, setCurrentUserEmail, setCurrentUserName, setCurrentUserId, setCurrentUserMembers } = usersSlice.actions

export const usersState = state => state.users.users
export const currentUserStateEmail = state => state.users.currentUser.email
export const currentUserStateName = state => state.users.currentUser.name
export const currentUserStateId = state => state.users.currentUser.id
export const currentUserMembersState = state => state.users.setCurrentUserMembers


export default usersSlice.reducer