import { createSlice } from '@reduxjs/toolkit'

const globalReducer = createSlice({
  // scoped
  name: 'globalReducer',
  // 初始化数据
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')!) || {},
    token: JSON.parse(localStorage.getItem('token')!) || undefined,
  },
  // 修改数据的方法
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    },
    clearUserInfo(state) {
      state.userInfo = {}
    },
    clearUserToken(state) {
      state.token = undefined
    },
  },
})

export const { setUserInfo, setToken, clearUserInfo, clearUserToken } =
  globalReducer.actions
export default globalReducer.reducer
