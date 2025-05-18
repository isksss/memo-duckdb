// src/components/Header.tsx
import type React from "react";

interface HeaderProps {
	onNew: () => void;
	onSave: () => void;
	onDelete: () => void;
	saveMessage: string | null;
}

const Header: React.FC<HeaderProps> = ({ onNew, onSave, onDelete, saveMessage }) => {
	return (
		<header className="bg-white shadow-md px-6 py-4 flex justify-between items-center flex-shrink-0">
			<h1 className="text-3xl font-bold">📝 Memo</h1>
			<div className="flex flex-col items-end space-y-1">
				<div className="flex space-x-3">
					<button
						type="button"
						onClick={onNew}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
					>
						New
					</button>
					<button
						type="button"
						onClick={onSave}
						className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
					>
						Save
					</button>
					<button
						type="button"
						onClick={onDelete}
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
					>
						Delete
					</button>
				</div>
				<div className="h-5">
					{saveMessage && (
						<span className="text-sm text-green-600 font-medium">
							{saveMessage}
						</span>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
