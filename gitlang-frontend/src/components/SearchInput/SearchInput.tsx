import "./SearchInput.css";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

function SearchInput({ value, onChange, className }: SearchInputProps) {
	return (
		<div className={`search-input-container ${className || ""}`}>
			<input
				type="text"
				className="search-input"
				placeholder="Search a word or translation..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				autoFocus
			/>
		</div>
	);
}

export default SearchInput;
