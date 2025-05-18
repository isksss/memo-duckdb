// src/components/MemoList.tsx
import type React from "react";

export interface Memo {
	id: number;
	title: string;
	content: string;
}

interface MemoListProps {
	memos: Memo[];
	selectedMemoId: number | null;
	onSelect: (id: number) => void;
}

const MemoList: React.FC<MemoListProps> = ({
	memos,
	selectedMemoId,
	onSelect,
}) => {
	return (
		<aside className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
			<div className="flex-1 overflow-y-auto p-4 space-y-2">
				{memos.map((memo) => (
					<button
						key={memo.id}
						type="button"
						onClick={() => onSelect(memo.id)}
						className={`w-full text-left p-3 rounded-md cursor-pointer focus:outline-none ${
							memo.id === selectedMemoId
								? "bg-blue-100"
								: "bg-gray-100 hover:bg-gray-200"
						}`}
					>
						{memo.title || "Untitled"}
					</button>
				))}
			</div>
		</aside>
	);
};

export default MemoList;
