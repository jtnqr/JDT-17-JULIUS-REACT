import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TodoItem {
	id: string;
	text: string;
	isCompleted: boolean;
}

interface TodoState {
	items: TodoItem[];
}

const getInitialState = (): TodoState => {
	const saved = localStorage.getItem("jdt17_todos");
	if (!saved) {
		return { items: [] };
	}
	try {
		return { items: JSON.parse(saved) };
	} catch (err) {
		console.error("Failed to parse todos from localStorage:", err);
		localStorage.removeItem("jdt17_todos");
		return { items: [] };
	}
};

const todoSlice = createSlice({
	name: "todo",
	initialState: getInitialState(),
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			state.items.push({
				id: crypto.randomUUID(),
				text: action.payload,
				isCompleted: false,
			});
		},
		toggleTodo: (state, action: PayloadAction<string>) => {
			const item = state.items.find((i) => i.id === action.payload);
			if (item) {
				item.isCompleted = !item.isCompleted;
			}
		},
		editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (item) {
				item.text = action.payload.text;
			}
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
	},
});

export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
