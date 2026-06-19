/* eslint-disable react-refresh/only-export-components */
import type React from "react";
import { createContext, useContext, useState } from "react";

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
	image: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	address?: UserAddress;
	ip?: string;
}

interface TokenContextType {
	token: string | null;
	user: User | null;
	login: (token: string, user: User) => void;
	logout: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
	const [token, setTokenState] = useState<string | null>(() => {
		const val = localStorage.getItem("access_token");
		return val && val !== "undefined" ? val : null;
	});

	const [user, setUserState] = useState<User | null>(() => {
		const savedUser = localStorage.getItem("user_info");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const login = (newToken: string, newUser: User) => {
		setTokenState(newToken);
		setUserState(newUser);
		localStorage.setItem("access_token", newToken);
		localStorage.setItem("user_info", JSON.stringify(newUser));
	};

	const logout = () => {
		setTokenState(null);
		setUserState(null);
		localStorage.removeItem("access_token");
		localStorage.removeItem("user_info");
	};

	return <TokenContext value={{ token, user, login, logout }}>{children}</TokenContext>;
}

export function useToken() {
	const context = useContext(TokenContext);
	if (context === undefined) {
		throw new Error("useToken must be used within a TokenProvider");
	}
	return context;
}
