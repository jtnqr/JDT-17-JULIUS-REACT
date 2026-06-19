import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function CV() {
	useEffect(() => {
		document.title = "CV Page | JDT-17 Page";
	}, []);

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-125 h-125 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

			<div className="w-full max-w-md relative z-10">
				<Button
					asChild
					variant="ghost"
					className="text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900 group gap-1.5 rounded-xl mb-6"
				>
					<Link to="/">
						<svg
							className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<title>Arrow Left</title>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back to Hub
					</Link>
				</Button>

				<Card className="border border-zinc-800/80 bg-zinc-900/35 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
					<Badge variant="outline" className="border-zinc-800 text-amber-500 mb-6 py-1 px-3">
						Curriculum Vitae
					</Badge>
					<CardTitle className="text-2xl font-bold text-zinc-50 mb-3">CV Page</CardTitle>
					<CardDescription className="text-zinc-400 text-sm leading-relaxed mb-6">
						This page is currently under construction. Check back later to see my professional
						resume and credentials.
					</CardDescription>
					<div className="flex justify-center">
						<div className="w-8 h-8 rounded-full border-2 border-t-amber-500 border-zinc-850 animate-spin" />
					</div>
				</Card>
			</div>
		</div>
	);
}
