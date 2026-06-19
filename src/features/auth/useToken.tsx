import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { loginSuccess, logoutSuccess, type User } from "./authSlice";

export const useToken = () => {
	const dispatch = useDispatch();
	const { user, token } = useSelector((state: RootState) => state.auth);

	const login = (token: string, user: User) => {
		dispatch(loginSuccess({ token, user }));
	};

	const logout = () => {
		dispatch(logoutSuccess());
	};

	return { user, token, login, logout };
};
