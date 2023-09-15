import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    isPageLoading: false,
    pageLoadingMsg: "",
  },
  reducers: {
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload.isLoading;
      state.pageLoadingMsg = action.payload.msg;
    },
    
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPageLoading } = counterSlice.actions

export default counterSlice.reducer