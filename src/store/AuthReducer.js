import { createSlice, configureStore } from '@reduxjs/toolkit';

// Redux slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    email: '',
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = '';
      state.email = '';
      state.isLoggedIn = false;
    },
  },
});

// Redux store
const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const { login, logout } = authSlice.actions;

export default store;
