import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  message: '',
}

export const commonSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = ''
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetMessage, setMessage } = commonSlice.actions

export default commonSlice.reducer
