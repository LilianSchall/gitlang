import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getWords } from "../../utils/storage";
import { searchWords } from "../../utils/search";
import Title from "../../components/Title/Title";
import SearchInput from "../../components/SearchInput/SearchInput";
import ResultsList from "../../components/ResultsList/ResultsList";
import AddButton from "../../components/AddButton/AddButton";
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
			<Title className="title" />
			<SearchInput
				value={searchQuery}
				onChange={setSearchQuery}
				className="search-input-container"
			/>
			<ResultsList
				results={results}
				searchQuery={searchQuery}
				totalWords={words.length}
				className="results-list-container"
			/>
			<AddButton onClick={() => navigate("/add-word")} />
		</div>
	);
}

export default LandingPage;
