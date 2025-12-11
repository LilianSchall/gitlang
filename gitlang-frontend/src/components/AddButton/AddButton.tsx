import "./AddButton.css";

interface AddButtonProps {
	onClick: () => void;
	className?: string;
}

function AddButton({ onClick, className }: AddButtonProps) {
	return (
		<button
			className={`add-button ${className || ""}`}
			onClick={onClick}
			aria-label="Add new word"
		>
			+
		</button>
	);
}

export default AddButton;
