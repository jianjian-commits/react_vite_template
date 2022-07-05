import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './globalReducer'

const store = configureStore({
  reducer: {
    globalReducer,
  },
})

export default store
