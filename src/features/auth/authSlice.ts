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
	try {
		return {
			token,
			user: userStr ? JSON.parse(userStr) : null,
		};
	} catch {
		localStorage.clear();
		return {
			token: null,
			user: null,
		};
	}
};

const authSlice = createSlice({
	name: "auth",
	initialState: getInitialState(),
	reducers: {
		loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		logoutSuccess: (state) => {
			state.token = null;
			state.user = null;
		},
	},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
