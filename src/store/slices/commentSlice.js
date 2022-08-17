import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    comment: {
        id: null,
        title: ""
    },
    comments: null
}
const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setCommentId: (state, action) => {
            state.comment.id = action.payload
        },
        setCommentTitle: (state, action) => {
            state.comment.title = action.payload
        },
        setComments: (state, action) => {
            state.comments = action.payload
          }
    }
})

export const { setCommentId, setCommentTitle, setComments } = commentSlice.actions

export const commentState = state => state.comment.comment
export const commenstState = state => state.comment.comments

export default commentSlice.reducer