import type { Word } from "../../types";
import "./ResultsList.css";

interface ResultsListProps {
	results: Array<{ item: Word; matchPercentage: number }>;
	searchQuery: string;
	totalWords: number;
	className?: string;
}

function ResultsList({
	results,
	searchQuery,
	totalWords,
	className,
}: ResultsListProps) {
	if (searchQuery && results.length > 0) {
		return (
			<div className={`results-list-container ${className || ""}`}>
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
		);
	}

	if (searchQuery) {
		return (
			<div className={`results-list-container ${className || ""}`}>
				<div className="no-results">
					<p>No words found matching "{searchQuery}"</p>
				</div>
			</div>
		);
	}

	return (
		<div className={`results-list-container ${className || ""}`}>
			<div className="initial-state">
				<p>Start typing to search for words</p>
				<p className="total-words">Total words: {totalWords}</p>
			</div>
		</div>
	);
}

export default ResultsList;
