import { useEffect, useState } from "react";

interface Memo {
	id: number;
	title: string;
	content: string;
}

function App() {
	const [memos, setMemos] = useState<Memo[]>([]);
	const [selectedMemoId, setSelectedMemoId] = useState<number | null>(null);
	const [saveMessage, setSaveMessage] = useState<string | null>(null);

	useEffect(() => {
		const saved = localStorage.getItem("memos");
		if (saved) {
			const parsed: Memo[] = JSON.parse(saved);
			setMemos(parsed);
			if (parsed.length > 0) setSelectedMemoId(parsed[0].id);
		}
	}, []);

	const selectedMemo = memos.find((m) => m.id === selectedMemoId);

	const handleNew = () => {
		const newMemo: Memo = {
			id: Date.now(),
			title: "Untitled",
			content: "",
		};
		setMemos((prev) => [...prev, newMemo]);
		setSelectedMemoId(newMemo.id);
	};

	const handleTitleChange = (title: string) => {
		setMemos((prev) =>
			prev.map((m) => (m.id === selectedMemoId ? { ...m, title } : m)),
		);
	};

	const handleContentChange = (content: string) => {
		setMemos((prev) =>
			prev.map((m) => (m.id === selectedMemoId ? { ...m, content } : m)),
		);
	};

	const handleDelete = () => {
		if (selectedMemoId === null) return;

		setMemos((prev) => {
			const newMemos = prev.filter((m) => m.id !== selectedMemoId);

			if (newMemos.length > 0) {
				setSelectedMemoId(newMemos[0].id);
			} else {
				setSelectedMemoId(null);
			}

			return newMemos;
		});
	};

	const handleSave = () => {
		localStorage.setItem("memos", JSON.stringify(memos));
		setSaveMessage("Saved!");
		setTimeout(() => setSaveMessage(null), 2000);
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
			<header className="bg-white shadow-md px-6 py-4 flex justify-between items-center flex-shrink-0">
				<h1 className="text-3xl font-bold">📝 Memo</h1>
				<div className="flex flex-col items-end space-y-1">
					<div className="flex space-x-3">
						<button
							type="button"
							onClick={handleNew}
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
						>
							New
						</button>
						<button
							type="button"
							onClick={handleSave}
							className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
						>
							Save
						</button>
						<button
							type="button"
							onClick={handleDelete}
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

			<main
				className="flex flex-1 overflow-hidden"
				style={{ height: "calc(100vh - 80px)" }} // header高さ80pxを引く
			>
				<aside className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
					{/* ここがスクロール領域 */}
					<div className="flex-1 overflow-y-auto p-4 space-y-2">
						{memos.map((memo) => (
							<div
								key={memo.id}
								onClick={() => setSelectedMemoId(memo.id)}
								className={`p-3 rounded-md cursor-pointer ${
									memo.id === selectedMemoId
										? "bg-blue-100"
										: "bg-gray-100 hover:bg-gray-200"
								}`}
							>
								{memo.title || "Untitled"}
							</div>
						))}
					</div>
				</aside>

				<section className="flex-1 p-6 flex flex-col overflow-y-auto">
					{selectedMemo ? (
						<>
							<input
								type="text"
								value={selectedMemo.title}
								onChange={(e) => handleTitleChange(e.target.value)}
								className="w-full text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent pb-2 mb-4"
								placeholder="Memo Title"
							/>

							<textarea
								value={selectedMemo.content}
								onChange={(e) => handleContentChange(e.target.value)}
								className="w-full flex-1 resize-none p-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Write your memo here..."
							/>
						</>
					) : (
						<p className="text-gray-500 text-lg">
							Select or create a memo to begin.
						</p>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
