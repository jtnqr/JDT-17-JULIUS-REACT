import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserAddress {
	address: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

export interface User {
	username: string;
	email: string;
	image?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	address?: UserAddress;
	ip?: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
}

const getInitialState = (): AuthState => {
	const token = localStorage.getItem("token");
	const userStr = localStorage.getItem("user");
	return {
		token,
		user: userStr ? JSON.parse(userStr) : null,
	};
};

const authSlice = createSlice({
	name: "auth",
	initialState: getInitialState(),
	reducers: {
		loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
		},
		logoutSuccess: (state) => {
			state.token = null;
			state.user = null;
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		},
	},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
