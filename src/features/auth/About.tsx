import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useToken } from "./useToken";

export default function About() {
	const { user, token, login, logout } = useToken();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "About | JDT-17";

		const hydrateProfile = async () => {
			if (
				user &&
				token &&
				(!user.firstName || !user.lastName || !user.gender || !user.address || !user.ip)
			) {
				try {
					const response = await fetch("https://dummyjson.com/auth/me", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const data = await response.json();
					if (response.ok) {
						login(token, {
							username: data.username,
							email: data.email,
							image: data.image,
							password: user.password, // preserve current password
							firstName: data.firstName,
							lastName: data.lastName,
							gender: data.gender,
							address: data.address,
							ip: data.ip,
						});
					}
				} catch (err) {
					console.error("Failed to hydrate profile details:", err);
				}
			}
		};

		hydrateProfile();
	}, [user, token, login]);

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	if (!user) {
		return null;
	}

	const formattedAddress = user.address
		? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}, ${user.address.country}`
		: "n/a";
	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
			{/* Top thin bar for Back to Hub navigation */}
			<div className="w-full bg-zinc-950/80 border-b border-zinc-900/40 py-2 relative z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
					<Button
						asChild
						variant="ghost"
						className="text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900 group gap-1.5 rounded-xl text-xs font-semibold px-2.5 py-1.5 cursor-pointer"
					>
						<Link to="/">
							<svg
								className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2.5}
							>
								<title>Arrow Left</title>
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
							Back to Hub Portal
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
				{/* Color radial glow backdrop */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-137.5 h-137.5 bg-linear-to-tr from-amber-500/10 to-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

				<div className="w-full max-w-xl relative">
					{/* Header Badge */}
					<div className="flex justify-end mb-6">
						<Badge
							variant="outline"
							className="border-zinc-800 text-amber-500 py-1 px-3 text-[10px] uppercase font-bold tracking-widest"
						>
							Profile Representation
						</Badge>
					</div>

					<Card className="border border-zinc-800/80 bg-zinc-900/35 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8">
						<div className="flex flex-col items-start sm:flex-row sm:items-center gap-6 pb-6 border-b border-zinc-800/60 mb-6">
							{/* Avatar Image */}
							<div className="relative group shrink-0">
								<div className="absolute -inset-0.5 bg-linear-to-tr from-amber-500 to-orange-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition duration-300" />
								<div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
									{user.image ? (
										<img
											src={user.image}
											alt={user.username}
											className="h-full w-full object-cover"
										/>
									) : (
										<div className="h-full w-full flex items-center justify-center text-zinc-700 text-3xl font-black bg-zinc-900">
											{user.username[0].toUpperCase()}
										</div>
									)}
								</div>
							</div>

							{/* Identity header */}
							<div>
								<CardTitle className="text-2xl font-extrabold text-zinc-50 tracking-tight text-left">
									{user.firstName || ""} {user.lastName || user.username}
								</CardTitle>
								<CardDescription className="text-zinc-500 text-sm mt-1 text-left">
									@{user.username} · Authorized via dummyjson
								</CardDescription>

								<div className="mt-3 flex gap-2">
									<Badge
										variant="outline"
										className="border-zinc-800 text-zinc-500 text-[10px] uppercase font-medium"
									>
										Active Session
									</Badge>
								</div>
							</div>
						</div>

						<CardContent className="p-0 space-y-4">
							<h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
								Profile Information
							</h4>

							{/* Name Info */}
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col p-3 rounded-xl border border-zinc-850/60 bg-zinc-950/20">
									<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
										First Name
									</span>
									<span className="text-sm font-medium text-zinc-200">
										{user.firstName || "n/a"}
									</span>
								</div>
								<div className="flex flex-col p-3 rounded-xl border border-zinc-850/60 bg-zinc-950/20">
									<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
										Last Name
									</span>
									<span className="text-sm font-medium text-zinc-200">
										{user.lastName || "n/a"}
									</span>
								</div>
							</div>

							{/* Gender & IP */}
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col p-3 rounded-xl border border-zinc-850/60 bg-zinc-950/20 items-center">
									<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
										Gender
									</span>
									<div className="flex items-center gap-1.5 mt-0.5">
										<Badge
											variant="secondary"
											className="text-[11px] capitalize font-semibold border-zinc-800 bg-zinc-900/50"
										>
											{user.gender || "n/a"}
										</Badge>
									</div>
								</div>
								<div className="flex flex-col p-3 rounded-xl border border-zinc-850/60 bg-zinc-950/20 items-center">
									<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
										IP Address
									</span>
									<code className="text-xs font-bold text-amber-500 font-mono mt-0.5">
										{user.ip || "n/a"}
									</code>
								</div>
							</div>

							{/* Email */}
							<div className="flex flex-col p-3.5 rounded-xl border border-zinc-850/60 bg-zinc-950/20 gap-1">
								<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
									Email Address
								</span>
								<span className="text-sm font-medium text-zinc-250">{user.email}</span>
							</div>

							{/* Address */}
							<div className="flex flex-col p-3.5 rounded-xl border border-zinc-850/60 bg-zinc-950/20 gap-1">
								<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
									Address Details
								</span>
								<span className="text-sm font-medium text-zinc-300 leading-relaxed">
									{formattedAddress}
								</span>
							</div>

							{/* Password */}
							<div className="flex flex-col p-3.5 rounded-xl border border-zinc-850/60 bg-zinc-950/20 gap-1 items-center">
								<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
									Session Password
								</span>
								<code className="text-sm font-bold text-zinc-400 font-mono">
									{user.password || "••••••••"}
								</code>
							</div>

							{/* Log out section */}
							<div className="pt-4 flex justify-end">
								<Button
									onClick={handleLogout}
									variant="destructive"
									className="bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive border-transparent font-bold py-2.5 px-6 rounded-xl gap-2 transition-all duration-300  cursor-pointer"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2.5}
									>
										<title>Sign Out</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
									Sign Out
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
