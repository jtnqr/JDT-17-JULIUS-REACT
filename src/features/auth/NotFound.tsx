import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
			<div className="absolute inset-0 -z-10 bg-linear-to-b from-amber-500/5 to-transparent blur-3xl rounded-full" />
			<div className="max-w-md space-y-6">
				<div className="inline-flex items-center justify-center p-4 bg-amber-500/10 rounded-2xl text-amber-500 mb-2">
					<ShieldAlert className="h-12 w-12" />
				</div>
				<h1 className="text-4xl font-black text-zinc-50 tracking-tight">404</h1>
				<h2 className="text-lg font-bold text-zinc-300">Page Not Found</h2>
				<p className="text-sm text-zinc-450 leading-relaxed">
					The page you are looking for does not exist, has been removed, or is temporarily
					unavailable.
				</p>
				<div className="pt-4">
					<Button
						asChild
						className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl cursor-pointer"
					>
						<Link to="/">Back to Hub Portal</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
