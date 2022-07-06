import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const requestData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }, 1000)
  })
}

export const fetchUserById = createAsyncThunk(
  'detail/aa',
  async (query: number) => {
    const data = await requestData()
    return data
  }
)

type Props = {
  loading: boolean
  detailData: string[]
}

const initialState: Props = {
  loading: false,
  detailData: [],
}

const Reducer = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false
      state.detailData = action.payload as string[]
    })
  },
})

export default Reducer.reducer
