// src/components/MemoEditor.tsx
import type React from "react";
import type { Memo } from "./MemoList";

interface MemoEditorProps {
	memo: Memo | null;
	onTitleChange: (title: string) => void;
	onContentChange: (content: string) => void;
}

const MemoEditor: React.FC<MemoEditorProps> = ({
	memo,
	onTitleChange,
	onContentChange,
}) => {
	if (!memo) {
		return (
			<p className="text-gray-500 text-lg">Select or create a memo to begin.</p>
		);
	}

	return (
		<>
			<input
				type="text"
				value={memo.title}
				onChange={(e) => onTitleChange(e.target.value)}
				className="w-full text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent pb-2 mb-4"
				placeholder="Memo Title"
			/>

			<textarea
				value={memo.content}
				onChange={(e) => onContentChange(e.target.value)}
				className="w-full flex-1 resize-none p-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
				placeholder="Write your memo here..."
			/>
		</>
	);
};

export default MemoEditor;
