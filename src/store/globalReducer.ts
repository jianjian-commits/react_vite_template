import { createSlice } from '@reduxjs/toolkit'

const globalReducer = createSlice({
  // scoped
  name: 'globalReducer',
  // 初始化数据
  initialState: {
    userInfo: {},
  },
  // 修改数据的方法
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.userInfo = {}
    },
  },
})

export const { setUserInfo, clearUserInfo } = globalReducer.actions
export default globalReducer.reducer
