/**
 * @description 每个reducer在每个组件或者页面中自行管理 命名为 reducer.ts
 * @description 异步请求统一由reducer文件中处理，交给redux管理数据，并且通过 createAsyncThunk 创建
 * 中文文档 https://redux-toolkit-cn.netlify.app/api/createAsyncThunk
 */

import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './globalReducer'
import detailReducer from '@/pages/detail/reducer'

const store = configureStore({
  reducer: {
    globalReducer,
    detailReducer,
  },
  // 解决 A non-serializable value was detected in an action,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
