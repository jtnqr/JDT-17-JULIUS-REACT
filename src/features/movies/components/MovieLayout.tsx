import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useToken } from "../../auth/useToken";

export default function MovieLayout() {
	const { user, logout } = useToken();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
			{/* Header Navigation */}
			<header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					{/* Logo */}
					<Link to="/movies" className="flex items-center gap-3 group">
						<span className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-base shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20">
							PH
						</span>
						<span className="font-bold text-lg tracking-tight text-zinc-50 group-hover:text-amber-400 transition-colors duration-300">
							PilemHub
						</span>
					</Link>

					{/* Center Nav Link (Back to Hub) */}
					<nav aria-label="Module navigation" className="flex items-center gap-2">
						<Button
							asChild
							variant="ghost"
							className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 px-3 py-2 rounded-xl text-sm font-semibold gap-1"
						>
							<Link to="/">
								<svg
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<title>Home Icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								Hub Portal
							</Link>
						</Button>
					</nav>

					{/* Right Profile / Logout */}
					<div className="flex items-center gap-4">
						<Button
							asChild
							variant="ghost"
							className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 p-2 rounded-xl"
						>
							<Link to="/about">
								<div className="flex items-center gap-2">
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
								</div>
							</Link>
						</Button>

						<Button
							onClick={handleLogout}
							variant="ghost"
							className="text-zinc-400 hover:text-destructive hover:bg-destructive/10 px-3 py-1.5 text-xs font-bold rounded-xl cursor-pointer"
						>
							Log Out
						</Button>
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
