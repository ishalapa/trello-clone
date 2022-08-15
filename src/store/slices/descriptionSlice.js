import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    description: {
        exist: false,
        id: null,
        title: ""
    }
}
const descriptionSlice = createSlice({
    name: "description",
    initialState,
    reducers: {
        setDescriptionExist: (state, action) => {
            state.description.exist = action.payload
        },
        setDescriptionId: (state, action) => {
            state.description.id = action.payload
        },
        setDescriptionTitle: (state, action) => {
            state.description.title = action.payload
        }
    }
})

export const { setDescriptionExist, setDescriptionId, setDescriptionTitle } = descriptionSlice.actions

export const descriptionState = state => state.description.description

export default descriptionSlice.reducer