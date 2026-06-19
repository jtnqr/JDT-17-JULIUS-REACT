import { configureStore, type Middleware } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { moviesApi } from "../features/movies/moviesApi";
import todoReducer from "../features/todo/todoSlice";

const localStorageMiddleware: Middleware = (storeApi) => (next) => (action) => {
	const result = next(action);

	if (action && typeof action === "object" && "type" in action) {
		const actionType = action.type;
		if (typeof actionType === "string" && actionType.startsWith("todo/")) {
			const state = storeApi.getState() as RootState;
			localStorage.setItem("jdt17_todos", JSON.stringify(state.todo.items));
		}
	}

	return result;
};

export const store = configureStore({
	reducer: {
		auth: authReducer,
		todo: todoReducer,
		[moviesApi.reducerPath]: moviesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(moviesApi.middleware).concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
