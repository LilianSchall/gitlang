import "./Header.css";

interface HeaderProps {
	title: string;
	onBackClick: () => void;
	className?: string;
}

function Header({ title, onBackClick, className }: HeaderProps) {
	return (
		<div className={`header ${className || ""}`}>
			<button className="back-button" onClick={onBackClick}>
				← Back
			</button>
			<h1>{title}</h1>
		</div>
	);
}

export default Header;
