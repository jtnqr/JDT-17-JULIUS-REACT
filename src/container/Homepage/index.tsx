import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useToken } from "../../features/auth/useToken";

export default function Home() {
	const { user, logout } = useToken();
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.title = "Home | JDT-17 Page";
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	if (!user) {
		return null;
	}

	const hubItems = [
		{
			title: "Movie Explorer",
			description:
				"Browse popular, now playing, upcoming and top rated films powered by the TMDB API.",
			path: "/movies",
			badge: "API Connected",
			icon: (
				<svg
					className="w-8 h-8 text-amber-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<title>Movie Explorer Icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
					/>
				</svg>
			),
		},
		{
			title: "Professional CV",
			description: "Explore my interactive resume, experience, skills, and work credentials.",
			path: "/cv-page",
			badge: "Interactive CV",
			icon: (
				<svg
					className="w-8 h-8 text-amber-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<title>Professional CV Icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
					/>
				</svg>
			),
		},
		{
			title: "TO-DO",
			description:
				"Manage your daily schedules and todos with interactive JSON API synchronization.",
			path: "/todo",
			badge: "Redux + Storage",
			icon: (
				<svg
					className="w-8 h-8 text-amber-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<title>TO-DO Icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
					/>
				</svg>
			),
		},
	];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between relative overflow-hidden">
			{/* Dynamic Glow Background */}
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-175 h-112.5 bg-linear-to-tr from-amber-500/10 to-orange-500/5 blur-[140px] rounded-full pointer-events-none" />

			{/* Navigation Header */}
			<header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-3">
						<span className="font-bold text-lg tracking-tight text-zinc-50">JDT-17 Hub</span>
					</div>

					{/* Profile Avatar Dropdown Menu */}
					<div className="relative" ref={dropdownRef}>
						<Button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							variant="ghost"
							className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 p-2 rounded-xl flex items-center gap-2 cursor-pointer focus:outline-hidden"
						>
							<span className="hidden sm:inline text-xs font-semibold">{user.username}</span>
							<div className="h-8 w-8 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
								{user.image ? (
									<img
										src={user.image}
										alt={user.username}
										className="h-full w-full object-cover"
									/>
								) : (
									<span className="text-zinc-300 font-bold text-xs">
										{user.username[0].toUpperCase()}
									</span>
								)}
							</div>
							<svg
								className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
									isDropdownOpen ? "rotate-180 text-zinc-300" : ""
								}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2.5}
							>
								<title>Dropdown Arrow</title>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</Button>

						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
								<Button
									asChild
									variant="ghost"
									onClick={() => setIsDropdownOpen(false)}
									className="w-full text-left justify-start text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800/60 px-3 py-2 rounded-xl text-xs font-semibold"
								>
									<Link to="/about" className="flex items-center gap-2">
										<svg
											className="w-4 h-4 text-amber-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<title>Profile Icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										About Profile
									</Link>
								</Button>

								<div className="h-px bg-zinc-800/80 my-1" />

								<Button
									onClick={() => {
										setIsDropdownOpen(false);
										handleLogout();
									}}
									variant="ghost"
									className="w-full text-left justify-start text-zinc-400 hover:text-destructive hover:bg-destructive/10 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
								>
									<span className="flex items-center gap-2">
										<svg
											className="w-4 h-4 text-destructive"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<title>Logout Icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Log Out
									</span>
								</Button>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Main Selection Area */}
			<main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10 border-transparent text-[10px] uppercase font-bold tracking-widest px-3 py-1 mb-5">
						Application Portal
					</Badge>
					<h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-50 leading-tight mb-4">
						Explore JDT-17 Modules
					</h1>
					<p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
						Select a dashboard module below to test real-time movie directories, task trackers, and
						profile authentication.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
					{hubItems.map((item) => (
						<Link to={item.path} key={item.path} className="group">
							<Card className="h-full border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-amber-500/25 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/2 flex flex-col justify-between">
								<div>
									<div className="flex items-center justify-between mb-6">
										<div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											{item.icon}
										</div>
										<Badge
											variant="outline"
											className="border-zinc-800 text-zinc-550 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5"
										>
											{item.badge}
										</Badge>
									</div>
									<CardTitle className="text-lg sm:text-xl font-bold text-zinc-50 group-hover:text-amber-400 transition-colors duration-300 mb-2">
										{item.title}
									</CardTitle>
									<CardDescription className="text-zinc-455 text-sm leading-relaxed">
										{item.description}
									</CardDescription>
								</div>

								<div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-500 group-hover:text-amber-400">
									Open Module
									<svg
										className="w-4 h-4 transition-transform group-hover:translate-x-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2.5}
									>
										<title>Arrow Right</title>
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</Card>
						</Link>
					))}
				</div>
			</main>

			{/* Footer */}
			<footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<span className="text-zinc-400 text-sm font-semibold tracking-wide">
							JDT-17 © {new Date().getFullYear()}
						</span>
						<span className="hidden sm:inline text-zinc-800">|</span>
						<a
							href="https://github.com/jtnqr/JDT-17-JULIUS-REACT"
							target="_blank"
							rel="noreferrer"
							className="text-zinc-500 hover:text-zinc-355 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
						>
							<img
								src="https://cdn.simpleicons.org/github/71717a"
								alt=""
								className="h-3.5 w-3.5 object-contain filter hover:brightness-125 transition-all"
								loading="lazy"
							/>
							View on GitHub
						</a>
					</div>
					<p className="text-zinc-500 text-xs text-center sm:text-left leading-relaxed">
						Project 1: Module Selection Hub
					</p>
				</div>
			</footer>
		</div>
	);
}
