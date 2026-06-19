import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import type { RootState } from "../../store";
import { addTodo, deleteTodo, editTodo, type TodoItem, toggleTodo } from "./todoSlice";

export default function Todo() {
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.todo.items);
	const [newTodoText, setNewTodoText] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingText, setEditingText] = useState("");
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
	const editInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		document.title = "TO-DO | JDT-17";
	}, []);

	useEffect(() => {
		if (editingId && editInputRef.current) {
			editInputRef.current.focus();
		}
	}, [editingId]);

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodoText.trim()) return;
		dispatch(addTodo(newTodoText.trim()));
		setNewTodoText("");
	};

	const handleStartEdit = (todo: TodoItem) => {
		setEditingId(todo.id);
		setEditingText(todo.text);
	};

	const handleSaveEdit = (id: string) => {
		if (!editingText.trim()) return;
		dispatch(editTodo({ id, text: editingText.trim() }));
		setEditingId(null);
	};

	const handleCancelEdit = () => {
		setEditingId(null);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === "active") return !todo.isCompleted;
		if (filter === "completed") return todo.isCompleted;
		return true;
	});

	const completedCount = todos.filter((t) => t.isCompleted).length;
	const activeCount = todos.length - completedCount;

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
			{/* Top thin bar for Back to Hub navigation */}
			<div className="w-full bg-zinc-950/80 border-b border-zinc-900/40 py-2 relative z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
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
				</div>
			</div>

			<div className="flex-1 flex flex-col items-center justify-start sm:justify-center px-4 py-8 sm:py-12 relative z-10">
				{/* Color radial glow backdrop */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-137.5 h-137.5 bg-linear-to-tr from-amber-500/10 to-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

				<div className="w-full max-w-lg relative">
					{/* Header Badge */}
					<div className="flex justify-end mb-6">
						<Badge
							variant="outline"
							className="border-zinc-800 text-amber-500 py-1 px-3 text-[10px] uppercase font-bold tracking-widest"
						>
							Redux + Storage
						</Badge>
					</div>

					<Card className="border border-zinc-800/80 bg-zinc-900/35 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8">
						<div className="text-center pb-6 border-b border-zinc-800/60 mb-6">
							<CardTitle className="text-2xl font-extrabold text-zinc-50 tracking-tight">
								TO-DO
							</CardTitle>
							<CardDescription className="text-zinc-500 text-xs mt-1">
								Manage your daily schedules with automatic local persistence
							</CardDescription>
						</div>

						<CardContent className="p-0 space-y-6">
							{/* Todo input form */}
							<form onSubmit={handleAddTodo} className="flex gap-2">
								<input
									type="text"
									placeholder="Add a new task..."
									value={newTodoText}
									onChange={(e) => setNewTodoText(e.target.value)}
									className="flex-1 h-10 px-3.5 bg-zinc-950/40 border border-zinc-850 focus:border-amber-500/50 rounded-xl text-sm text-zinc-100 placeholder-zinc-650 outline-hidden transition-all duration-300 shadow-inner"
								/>
								<Button
									type="submit"
									disabled={!newTodoText.trim()}
									className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 h-10 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shrink-0 cursor-pointer"
								>
									Add Task
								</Button>
							</form>

							{/* Filters and Stats */}
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-b border-zinc-850/60 text-xs">
								<div className="flex gap-1">
									{(["all", "active", "completed"] as const).map((t) => (
										<button
											key={t}
											type="button"
											onClick={() => setFilter(t)}
											className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all ${
												filter === t
													? "bg-zinc-800 text-amber-500"
													: "text-zinc-400 hover:text-zinc-200"
											}`}
										>
											{t}
										</button>
									))}
								</div>
								<span className="text-zinc-500 font-medium">
									{activeCount} active · {completedCount} completed
								</span>
							</div>

							{/* Todo List */}
							<div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
								{filteredTodos.length === 0 ? (
									<div className="py-12 text-center text-zinc-500 text-sm">
										No tasks found in this view.
									</div>
								) : (
									filteredTodos.map((todo) => (
										<div
											key={todo.id}
											className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 group ${
												todo.isCompleted
													? "bg-zinc-950/20 border-zinc-900/60 opacity-60"
													: "bg-zinc-900/20 border-zinc-850 hover:border-zinc-800/80"
											}`}
										>
											<div className="flex items-center gap-3 flex-1 min-w-0">
												<input
													type="checkbox"
													checked={todo.isCompleted}
													onChange={() => dispatch(toggleTodo(todo.id))}
													className="h-5 w-5 md:h-4.5 md:w-4.5 rounded-md border-zinc-800 text-amber-500 focus:ring-amber-500/30 bg-zinc-950 cursor-pointer shrink-0"
												/>

												{editingId === todo.id ? (
													<input
														ref={editInputRef}
														type="text"
														value={editingText}
														onChange={(e) => setEditingText(e.target.value)}
														onKeyDown={(e) => {
															if (e.key === "Enter") handleSaveEdit(todo.id);
															if (e.key === "Escape") handleCancelEdit();
														}}
														onBlur={() => handleSaveEdit(todo.id)}
														className="flex-1 bg-zinc-950 border border-amber-500/50 rounded-lg px-2 py-0.5 text-sm text-zinc-100 focus:outline-hidden"
													/>
												) : (
													<button
														type="button"
														onDoubleClick={() => handleStartEdit(todo)}
														className={`bg-transparent border-none p-0 text-left font-normal w-full text-sm truncate select-none cursor-pointer flex-1 focus:outline-hidden focus:text-amber-500 ${
															todo.isCompleted ? "line-through text-zinc-500" : "text-zinc-200"
														}`}
													>
														{todo.text}
													</button>
												)}
											</div>

											<div className="flex items-center gap-1.5 shrink-0 ml-3">
												{editingId === todo.id ? (
													<>
														<button
															type="button"
															onClick={() => handleSaveEdit(todo.id)}
															className="p-2 md:p-1 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
															aria-label="Save changes"
														>
															<svg
																className="w-4 h-4"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
																strokeWidth={2.5}
																aria-hidden="true"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M5 13l4 4L19 7"
																/>
															</svg>
														</button>
														<button
															type="button"
															onClick={handleCancelEdit}
															className="p-2 md:p-1 text-zinc-400 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
															aria-label="Cancel editing"
														>
															<svg
																className="w-4 h-4"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
																strokeWidth={2.5}
																aria-hidden="true"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M6 18L18 6M6 6l12 12"
																/>
															</svg>
														</button>
													</>
												) : (
													<>
														<button
															type="button"
															onClick={() => handleStartEdit(todo)}
															className="p-2 md:p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 hover:opacity-100 cursor-pointer"
															aria-label="Edit task"
														>
															<svg
																className="w-3.5 h-3.5"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
																strokeWidth={2}
																aria-hidden="true"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
																/>
															</svg>
														</button>
														<button
															type="button"
															onClick={() => dispatch(deleteTodo(todo.id))}
															className="p-2 md:p-1.5 text-zinc-500 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all cursor-pointer"
															aria-label="Delete task"
														>
															<svg
																className="w-4 h-4"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
																strokeWidth={2}
																aria-hidden="true"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															</svg>
														</button>
													</>
												)}
											</div>
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
