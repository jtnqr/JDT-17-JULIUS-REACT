import { Navigate, Outlet } from "react-router";
import { useToken } from "../features/auth/useToken";

export default function ProtectedRoute() {
	const { token } = useToken();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}

export function AuthRoute() {
	const { token } = useToken();

	if (token) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
