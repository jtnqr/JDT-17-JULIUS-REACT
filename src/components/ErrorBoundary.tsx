import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onReset?: () => void;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
	}

	private handleReset = () => {
		if (this.props.onReset) {
			this.props.onReset();
		}
		this.setState({ hasError: false, error: null });
	};

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-150">
					{/* Gradient backdrop glow */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

					<div className="relative z-10 w-full max-w-md bg-zinc-900/90 border border-zinc-800 p-8 rounded-2xl shadow-2xl text-center space-y-6 animate-in fade-in duration-300">
						{/* Icon wrapper */}
						<div className="mx-auto h-16 w-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
							<svg
								className="w-8 h-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<title>Error Warning Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>

						<div className="space-y-2">
							<h2 className="text-2xl font-bold text-zinc-50 tracking-tight">
								Something Went Wrong
							</h2>
							<p className="text-sm text-zinc-400 max-w-sm mx-auto">
								An unexpected rendering crash occurred.
								{this.state.error?.message && (
									<code className="block mt-2 px-2.5 py-1.5 bg-zinc-950 rounded-lg text-xs font-mono text-amber-500/90 break-all border border-zinc-900">
										{this.state.error.message}
									</code>
								)}
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<button
								type="button"
								onClick={this.handleReset}
								className="flex-1 bg-amber-505 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors duration-200 cursor-pointer shadow-lg shadow-amber-500/10 focus:outline-hidden"
							>
								Try Again
							</button>
							<a
								href="/"
								className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors duration-200 cursor-pointer border border-zinc-700/50 flex items-center justify-center focus:outline-hidden"
							>
								Back to Hub
							</a>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
