import { useEffect, useState } from "react";
import Header from "./components/Header";
import MemoList from "./components/MemoList";
import MemoEditor from "./components/MemoEditor";

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

	const selectedMemo = memos.find((m) => m.id === selectedMemoId) ?? null;

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
			<Header
				onNew={handleNew}
				onSave={handleSave}
				onDelete={handleDelete}
				saveMessage={saveMessage}
			/>

			<main
				className="flex flex-1 overflow-hidden"
				style={{ height: "calc(100vh - 80px)" }}
			>
				<MemoList
					memos={memos}
					selectedMemoId={selectedMemoId}
					onSelect={setSelectedMemoId}
				/>

				<section className="flex-1 p-6 flex flex-col overflow-y-auto">
					<MemoEditor
						memo={selectedMemo}
						onTitleChange={handleTitleChange}
						onContentChange={handleContentChange}
					/>
				</section>
			</main>
		</div>
	);
}

export default App;
