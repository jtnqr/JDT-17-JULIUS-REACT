import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useToken } from "./useToken";

const loginSchema = z.object({
	username: z.string().min(2, "Username must be at least 2 characters"),
	password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function Login() {
	const navigate = useNavigate();
	const { login } = useToken();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<Partial<LoginFields>>({});
	const [authError, setAuthError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		document.title = "Login | JDT-17";
		// Focus on desktop viewport only to avoid mobile keyboard popups
		if (usernameRef.current && window.matchMedia("(min-width: 768px)").matches) {
			usernameRef.current.focus();
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setAuthError(null);
		setErrors({});

		const result = loginSchema.safeParse({ username, password });

		if (!result.success) {
			const formattedErrors: Partial<LoginFields> = {};
			for (const issue of result.error.issues) {
				const path = issue.path[0] as keyof LoginFields;
				formattedErrors[path] = issue.message;
			}
			setErrors(formattedErrors);
			return;
		}

		try {
			setIsLoading(true);
			const response = await fetch("https://dummyjson.com/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					password,
					expiresInMins: 60,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Invalid credentials");
			}

			// Fetch full profile details
			const meResponse = await fetch("https://dummyjson.com/auth/me", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${data.accessToken}`,
				},
			});

			const meData = await meResponse.json();

			if (!meResponse.ok) {
				throw new Error(meData.message || "Failed to load profile details");
			}

			// Successful Login
			login(data.accessToken, {
				username: meData.username,
				email: meData.email,
				image: meData.image,
				password: password, // Save entered password for About page display
				firstName: meData.firstName,
				lastName: meData.lastName,
				gender: meData.gender,
				address: meData.address,
				ip: meData.ip,
			});

			navigate("/", { replace: true });
		} catch (err) {
			const msg = err instanceof Error ? err.message : "An unexpected error occurred";
			setAuthError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
			{/* Gradient Glow backdrop */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-125 h-125 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

			<div className="w-full max-w-md relative z-10">
				{/* Top Branding Logo */}
				<div className="flex flex-col items-center mb-8">
					{/* <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-xl shadow-xl shadow-amber-500/25 mb-3">
						PH
					</div> */}
					<h1 className="font-heading text-2xl font-bold tracking-tight text-zinc-50">Welcome</h1>
					<p className="text-zinc-500 text-xs mt-1">Part of the JDT-17 Hub Page</p>
				</div>

				<Card className="border border-zinc-800/80 bg-zinc-900/35 backdrop-blur-md rounded-2xl shadow-2xl p-6">
					<div className="mb-6">
						<CardTitle className="text-xl font-bold text-zinc-50">Sign In</CardTitle>
						<CardDescription className="text-zinc-400 text-xs">
							Enter your dummyjson account credentials to proceed
						</CardDescription>
					</div>

					<CardContent className="p-0">
						{authError && (
							<div className="mb-4 p-3 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
								{authError}
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="username"
									className="block text-xs font-semibold text-zinc-400 mb-1.5"
								>
									Username
								</label>
								<input
									id="username"
									ref={usernameRef}
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="e.g. emilys"
									className={`w-full h-10 px-3.5 rounded-lg border ${
										errors.username ? "border-destructive/50" : "border-zinc-850"
									} bg-zinc-950/40 text-zinc-100 text-sm placeholder-zinc-650 focus:border-amber-500/50 outline-none transition-all`}
								/>
								{errors.username && (
									<p className="text-destructive text-[11px] mt-1">{errors.username}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-xs font-semibold text-zinc-400 mb-1.5"
								>
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="••••••••"
										className={`w-full h-10 pl-3.5 pr-10 rounded-lg border ${
											errors.password ? "border-destructive/50" : "border-zinc-850"
										} bg-zinc-950/40 text-zinc-100 text-sm placeholder-zinc-650 focus:border-amber-500/50 outline-none transition-all`}
									/>
									<Button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										variant="ghost"
										size="xs"
										className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer h-7 w-7 flex items-center justify-center focus:outline-hidden"
										aria-label={showPassword ? "Hide password" : "Show password"}
									>
										{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</Button>
								</div>
								{errors.password && (
									<p className="text-destructive text-[11px] mt-1">{errors.password}</p>
								)}
							</div>

							<Button
								type="submit"
								disabled={isLoading}
								className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg mt-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
							>
								{isLoading ? "Signing In..." : "Sign In"}
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Help / Demo Credentials Box */}
				<div className="mt-6 p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 text-center text-xs">
					<p className="text-zinc-500 font-semibold mb-2">Demo Credentials:</p>
					<div className="flex flex-wrap gap-2 justify-center">
						<Badge
							variant="outline"
							className="border-zinc-800 text-zinc-400 py-1 px-2 text-[10px] lowercase font-medium"
						>
							username: <span className="text-amber-500 font-bold ml-1">emilys</span> / pass:{" "}
							<span className="text-amber-500 font-bold ml-1">emilyspass</span>
						</Badge>
						<Badge
							variant="outline"
							className="border-zinc-800 text-zinc-400 py-1 px-2 text-[10px] lowercase font-medium"
						>
							username: <span className="text-amber-500 font-bold ml-1">michaelw</span> / pass:{" "}
							<span className="text-amber-500 font-bold ml-1">michaelwpass</span>
						</Badge>
					</div>
				</div>
			</div>
		</div>
	);
}
