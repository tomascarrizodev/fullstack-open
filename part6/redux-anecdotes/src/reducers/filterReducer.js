import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterCreator = (value) => {
//   return {
//     type: 'SET_FILTER',
//     payload: value
//   }
// }

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer