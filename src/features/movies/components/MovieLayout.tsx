import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { useToken } from "../../auth/useToken";

export default function MovieLayout() {
	const { user, logout } = useToken();
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [hasInPageSearch, setHasInPageSearch] = useState(false);

	// Automatically detect if a search input exists in the main page content
	useEffect(() => {
		const checkSearchInput = () => {
			const hasSearch = document.querySelector('main input[placeholder*="search" i]') !== null;
			setHasInPageSearch(hasSearch);
		};

		// Run initially and track location changes
		if (location.pathname) {
			checkSearchInput();
		}

		// Observe DOM modifications within the main content area
		const observer = new MutationObserver(checkSearchInput);
		const mainEl = document.querySelector("main");
		if (mainEl) {
			observer.observe(mainEl, { childList: true, subtree: true });
		}

		return () => observer.disconnect();
	}, [location.pathname]);

	const isDefaultMoviesPage = location.pathname === "/movies" || location.pathname === "/movies/";
	const urlQuery = searchParams.get("q") || "";
	const [navSearchQuery, setNavSearchQuery] = useState(urlQuery);
	const [showSearchOnScroll, setShowSearchOnScroll] = useState(false);

	// Synchronize navbar search input with URL search param
	useEffect(() => {
		setNavSearchQuery(urlQuery);
	}, [urlQuery]);

	// Handle scroll for search visibility on default movies page
	useEffect(() => {
		if (!isDefaultMoviesPage) {
			setShowSearchOnScroll(false);
			return;
		}
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setShowSearchOnScroll(true);
			} else {
				setShowSearchOnScroll(false);
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isDefaultMoviesPage]);

	// Automatically update search params on query change (only active on /movies/search)
	useEffect(() => {
		if (location.pathname !== "/movies/search") {
			return;
		}
		const timer = setTimeout(() => {
			const currentUrlQuery = searchParams.get("q") || "";
			if (navSearchQuery !== currentUrlQuery) {
				if (navSearchQuery.trim()) {
					setSearchParams({ q: navSearchQuery }, { replace: true });
				} else {
					setSearchParams({}, { replace: true });
				}
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [navSearchQuery, location.pathname, searchParams, setSearchParams]);

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

	const handleNavSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNavSearchQuery(e.target.value);
	};

	const handleNavSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = navSearchQuery.trim();
		if (location.pathname === "/movies/search") {
			if (trimmed) {
				setSearchParams({ q: trimmed }, { replace: true });
			} else {
				setSearchParams({}, { replace: true });
			}
		} else {
			if (trimmed) {
				navigate(`/movies/search?q=${encodeURIComponent(trimmed)}`);
			} else {
				navigate("/movies/search");
			}
		}
	};

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
			{/* Top thin bar for Back to Hub navigation & Profile */}
			<div className="w-full bg-zinc-950 border-b border-zinc-900/40 py-2 relative z-60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
					<Button
						asChild
						variant="ghost"
						className="text-zinc-455 hover:text-zinc-100 hover:bg-zinc-900 group gap-1.5 rounded-xl text-xs font-semibold h-9 md:h-8 px-3 md:px-2.5 flex items-center cursor-pointer"
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

					{/* Right Profile Dropdown Menu */}
					<div className="relative shrink-0 animate-in fade-in" ref={dropdownRef}>
						<Button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							variant="ghost"
							className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 h-9 md:h-8 px-3 md:px-2.5 rounded-xl flex items-center gap-2 cursor-pointer focus:outline-hidden text-xs font-semibold"
						>
							<span className="hidden sm:inline text-xs font-semibold">{user.username}</span>
							<div className="h-6 w-6 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
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
			</div>

			{/* Header Navigation */}
			<header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950">
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

						{/* Movie Navigation Links (Desktop) */}
						<nav
							className="hidden sm:flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar py-1"
							aria-label="Main movie navigation"
						>
							<NavLink
								to="/movies"
								end
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Movies
							</NavLink>
							<NavLink
								to="/movies/popular"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Popular
							</NavLink>
							<NavLink
								to="/movies/top-rated"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Top Rated
							</NavLink>
							<NavLink
								to="/movies/upcoming"
								className={({ isActive }) =>
									`text-xs sm:text-sm font-bold py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
										isActive ? "text-amber-500" : "text-zinc-450 hover:text-zinc-100"
									}`
								}
							>
								Upcoming
							</NavLink>
						</nav>
					</div>

					{/* Mobile Navigation Controls */}
					<div className="flex sm:hidden items-center gap-1.5 shrink-0">
						{/* Search Icon Link */}
						{location.pathname !== "/movies/search" && (!hasInPageSearch || showSearchOnScroll) && (
							<Link
								to="/movies/search"
								className="p-2 text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer flex items-center justify-center h-9 w-9"
								aria-label="Search movies"
							>
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<title>Search Icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</Link>
						)}

						{/* Hamburger Menu Toggle Button */}
						<Button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							variant="ghost"
							className="p-2 text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl cursor-pointer flex items-center justify-center h-9 w-9 focus:outline-hidden"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<title>Close Menu</title>
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<title>Open Menu</title>
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</Button>
					</div>

					{/* Navbar Search Input (hidden on popular page except when scrolled down, Desktop only) */}
					{location.pathname !== "/movies/search" &&
						(!hasInPageSearch || showSearchOnScroll) &&
						(!isDefaultMoviesPage || showSearchOnScroll) && (
							<form
								onSubmit={handleNavSearchSubmit}
								className="hidden sm:block relative w-full max-w-[160px] sm:max-w-[240px] animate-in fade-in slide-in-from-right-3 duration-250 shrink-0"
							>
								<button
									type="submit"
									className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 hover:text-zinc-350 cursor-pointer flex items-center justify-center p-0 border-0 bg-transparent focus:outline-hidden"
									aria-label="Submit search"
								>
									<svg
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<title>Search Icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</button>
								<input
									type="text"
									placeholder="Search movies..."
									value={navSearchQuery}
									onChange={handleNavSearchChange}
									className="w-full pl-9 pr-8 py-1.5 bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 focus:border-amber-500/50 rounded-xl text-xs text-zinc-150 placeholder-zinc-500 focus:outline-hidden transition-all duration-300 shadow-inner"
								/>
								{navSearchQuery && (
									<button
										type="button"
										onClick={() => setNavSearchQuery("")}
										className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
										aria-label="Clear search"
									>
										<svg
											className="w-3 h-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2.5}
										>
											<title>Clear Icon</title>
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								)}
							</form>
						)}
				</div>

				{/* Mobile Menu Dropdown Panel */}
				{isMobileMenuOpen && (
					<nav
						className="sm:hidden border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200"
						aria-label="Mobile movie navigation"
					>
						<NavLink
							to="/movies"
							end
							onClick={() => setIsMobileMenuOpen(false)}
							className={({ isActive }) =>
								`text-xs font-bold py-2.5 px-3 rounded-lg transition-colors duration-200 ${
									isActive
										? "text-amber-500 bg-zinc-900/50"
										: "text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900/20"
								}`
							}
						>
							Movies
						</NavLink>
						<NavLink
							to="/movies/popular"
							onClick={() => setIsMobileMenuOpen(false)}
							className={({ isActive }) =>
								`text-xs font-bold py-2.5 px-3 rounded-lg transition-colors duration-200 ${
									isActive
										? "text-amber-500 bg-zinc-900/50"
										: "text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900/20"
								}`
							}
						>
							Popular
						</NavLink>
						<NavLink
							to="/movies/top-rated"
							onClick={() => setIsMobileMenuOpen(false)}
							className={({ isActive }) =>
								`text-xs font-bold py-2.5 px-3 rounded-lg transition-colors duration-200 ${
									isActive
										? "text-amber-500 bg-zinc-900/50"
										: "text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900/20"
								}`
							}
						>
							Top Rated
						</NavLink>
						<NavLink
							to="/movies/upcoming"
							onClick={() => setIsMobileMenuOpen(false)}
							className={({ isActive }) =>
								`text-xs font-bold py-2.5 px-3 rounded-lg transition-colors duration-200 ${
									isActive
										? "text-amber-500 bg-zinc-900/50"
										: "text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900/20"
								}`
							}
						>
							Upcoming
						</NavLink>
					</nav>
				)}
			</header>

			{/* Main Content */}
			<main className="flex-1">
				<ErrorBoundary
					fallback={
						<div className="max-w-md mx-auto my-16 p-8 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-center space-y-5 animate-in fade-in duration-200 shadow-xl">
							<div className="mx-auto h-12 w-12 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<title>Warning Icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<div className="space-y-1.5">
								<h3 className="text-xl font-bold text-zinc-150">Could Not Load Content</h3>
								<p className="text-xs text-zinc-400">
									An error occurred while rendering this section.
								</p>
							</div>
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors duration-200 cursor-pointer shadow-lg shadow-amber-500/10 focus:outline-hidden"
							>
								Reload Page
							</button>
						</div>
					}
				>
					<Outlet />
				</ErrorBoundary>
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
