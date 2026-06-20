import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { store } from "./store";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<ErrorBoundary>
					<RouterProvider router={router} />
				</ErrorBoundary>
			</Provider>
		</StrictMode>,
	);
} else {
	console.error("Failed to find the root element");
}
