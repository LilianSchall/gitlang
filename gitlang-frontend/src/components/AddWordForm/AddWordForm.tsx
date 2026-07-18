import FormGroup from "../FormGroup/FormGroup";
import "./AddWordForm.css";

interface FormData {
	word: string;
	translation: string;
	definition: string;
	usage: string;
	language: string;
}

interface AddWordFormProps {
	formData: FormData;
	isSubmitting: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	className?: string;
}

const LANGUAGE_OPTIONS = [
	{ value: "Korean", label: "Korean" },
	{ value: "Japanese", label: "Japanese" },
	{ value: "Chinese", label: "Chinese" },
	{ value: "Spanish", label: "Spanish" },
	{ value: "French", label: "French" },
	{ value: "German", label: "German" },
	{ value: "Italian", label: "Italian" },
	{ value: "Portuguese", label: "Portuguese" },
	{ value: "Russian", label: "Russian" },
	{ value: "Other", label: "Other" },
];

function AddWordForm({
	formData,
	isSubmitting,
	onChange,
	onSubmit,
	className,
}: AddWordFormProps) {
	return (
		<form
			className={`add-word-form ${className || ""}`}
			onSubmit={onSubmit}
		>
			<FormGroup
				label="Word in Target Language"
				id="word"
				name="word"
				type="text"
				value={formData.word}
				onChange={onChange}
				placeholder="e.g., 안녕하세요"
				required={true}
			/>

			<FormGroup
				label="Translation (Your Language)"
				id="translation"
				name="translation"
				type="text"
				value={formData.translation}
				onChange={onChange}
				placeholder="e.g., Hello"
				required={true}
			/>

			<FormGroup
				label="Language"
				id="language"
				name="language"
				type="select"
				value={formData.language}
				onChange={onChange}
				options={LANGUAGE_OPTIONS}
			/>

			<FormGroup
				label="Definition"
				id="definition"
				name="definition"
				type="textarea"
				value={formData.definition}
				onChange={onChange}
				placeholder="What does this word mean?"
				rows={3}
			/>

			<FormGroup
				label="Usage Example"
				id="usage"
				name="usage"
				type="textarea"
				value={formData.usage}
				onChange={onChange}
				placeholder="Example: 안녕하세요, 저는 한국인입니다"
				rows={3}
			/>

			<button
				type="submit"
				className="submit-button"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Adding..." : "Confirm"}
			</button>
		</form>
	);
}

export default AddWordForm;
