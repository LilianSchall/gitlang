import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getWords } from "../../utils/storage";
import { searchWords } from "../../utils/search";
import "./LandingPage.css";

function LandingPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const words = getWords();

	const results = useMemo(() => {
		return searchWords(words, searchQuery);
	}, [searchQuery, words]);

	return (
		<div className="landing-page">
			<div className="landing-header">
				<h1>GitLang</h1>
				<p>Learn vocabulary efficiently</p>
			</div>

			<div className="search-container">
				<input
					type="text"
					className="search-input"
					placeholder="Search a word or translation..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					autoFocus
				/>
			</div>

			{searchQuery && results.length > 0 ? (
				<div className="results-container">
					{results.map(({ item: word, matchPercentage }) => (
						<div key={word.id} className="result-card">
							<div className="result-header">
								<h3 className="result-word">{word.word}</h3>
								<span className="match-percentage">
									{Math.round(matchPercentage)}%
								</span>
							</div>
							<p className="result-translation">
								{word.translation}
							</p>
							<p className="result-definition">
								{word.definition}
							</p>
							<p className="result-usage">
								<em>"{word.usage}"</em>
							</p>
						</div>
					))}
				</div>
			) : searchQuery ? (
				<div className="no-results">
					<p>No words found matching "{searchQuery}"</p>
				</div>
			) : (
				<div className="initial-state">
					<p>Start typing to search for words</p>
					<p className="total-words">Total words: {words.length}</p>
				</div>
			)}

			<button
				className="add-word-button"
				onClick={() => navigate("/add-word")}
				aria-label="Add new word"
			>
				+
			</button>
		</div>
	);
}

export default LandingPage;
