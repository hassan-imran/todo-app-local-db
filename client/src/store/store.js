import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import error from './error'

export default configureStore({
  reducer: {
    auth: auth,
    error: error,
  },
})