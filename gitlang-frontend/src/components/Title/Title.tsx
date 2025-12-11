import "./Title.css";

interface TitleProps {
	className?: string;
}

function Title({ className }: TitleProps) {
	return (
		<div className={`title ${className || ""}`}>
			<h1>GitLang</h1>
			<p>Learn vocabulary efficiently</p>
		</div>
	);
}

export default Title;
