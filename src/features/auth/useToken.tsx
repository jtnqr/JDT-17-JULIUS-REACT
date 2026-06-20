import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { loginSuccess, logoutSuccess, type User } from "./authSlice";

export const useToken = () => {
	const dispatch = useDispatch();
	const { user, token } = useSelector((state: RootState) => state.auth);

	const login = useCallback(
		(token: string, user: User) => {
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			dispatch(loginSuccess({ token, user }));
		},
		[dispatch],
	);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		dispatch(logoutSuccess());
	}, [dispatch]);

	return { user, token, login, logout };
};
