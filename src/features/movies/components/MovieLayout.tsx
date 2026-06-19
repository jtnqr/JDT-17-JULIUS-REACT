import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useToken } from "../../auth/useToken";

export default function MovieLayout() {
	const { user, logout } = useToken();
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

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

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
			{/* Top thin bar for Back to Hub navigation */}
			<div className="w-full bg-zinc-950/80 border-b border-zinc-900/40 py-2">
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

			{/* Header Navigation */}
			<header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
					{/* Logo & Links */}
					<div className="flex items-center gap-6 sm:gap-8 overflow-hidden">
						{/* Logo */}
						<Link to="/movies" className="flex items-center gap-2.5 group shrink-0">
							<span className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-base shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20">
								PH
							</span>
							<span className="font-bold text-lg tracking-tight text-zinc-50 group-hover:text-amber-400 transition-colors duration-300 hidden sm:inline">
								PilemHub
							</span>
						</Link>

						{/* Movie Navigation Links */}
						<nav
							className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar py-1"
							aria-label="Main movie navigation"
						>
							<NavLink
								to="/movies"
								end
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Popular
							</NavLink>
							<NavLink
								to="/movies/now-playing"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Now Playing
							</NavLink>
							<NavLink
								to="/movies/top-rated"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Top Rated
							</NavLink>
							<NavLink
								to="/movies/upcoming"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Upcoming
							</NavLink>
							<NavLink
								to="/movies/search"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Search
							</NavLink>
						</nav>
					</div>

					{/* Right Profile Dropdown Menu */}
					<div className="relative shrink-0" ref={dropdownRef}>
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
								className={`w-3.5 h-3.5 text-zinc-550 transition-transform duration-200 ${
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
									className="w-full text-left justify-start text-zinc-300 hover:text-zinc-50 hover:bg-zinc-850 px-3 py-2 rounded-xl text-xs font-semibold"
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

			{/* Main Content */}
			<main className="flex-1">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-3">
						<span className="h-7 w-7 rounded bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-xs">
							PH
						</span>
						<span className="text-zinc-400 text-sm font-semibold tracking-wide">
							PilemHub © {new Date().getFullYear()}
						</span>
					</div>
					<p className="text-zinc-500 text-xs text-center sm:text-left leading-relaxed">
						Crafted for cinema lovers. Movie metadata sourced from The Movie Database (TMDb).
					</p>
				</div>
			</footer>
		</div>
	);
}
