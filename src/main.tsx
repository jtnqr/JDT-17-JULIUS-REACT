import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { TokenProvider } from "./features/auth/useToken";
import { router } from "./routes";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<TokenProvider>
				<RouterProvider router={router} />
			</TokenProvider>
		</StrictMode>,
	);
} else {
	console.error("Failed to find the root element");
}
