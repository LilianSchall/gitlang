import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWord } from "../../utils/storage";
import "./AddWordPage.css";

function AddWordPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		word: "",
		translation: "",
		definition: "",
		usage: "",
		language: "Korean",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.word.trim() || !formData.translation.trim()) {
			alert("Please fill in the required fields");
			return;
		}

		setIsSubmitting(true);

		try {
			addWord({
				word: formData.word,
				translation: formData.translation,
				definition: formData.definition,
				usage: formData.usage,
				language: formData.language,
			});

			// Reset form
			setFormData({
				word: "",
				translation: "",
				definition: "",
				usage: "",
				language: "Korean",
			});

			// Show success and redirect
			alert("Word added successfully!");
			navigate("/");
		} catch (error) {
			alert("Failed to add word");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="add-word-page">
			<div className="add-word-header">
				<button className="back-button" onClick={() => navigate("/")}>
					← Back
				</button>
				<h1>Add New Word</h1>
			</div>

			<form className="add-word-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="word">Word in Target Language *</label>
					<input
						id="word"
						type="text"
						name="word"
						value={formData.word}
						onChange={handleChange}
						placeholder="e.g., 안녕하세요"
						autoFocus
					/>
				</div>

				<div className="form-group">
					<label htmlFor="translation">
						Translation (Your Language) *
					</label>
					<input
						id="translation"
						type="text"
						name="translation"
						value={formData.translation}
						onChange={handleChange}
						placeholder="e.g., Hello"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="language">Language</label>
					<select
						id="language"
						name="language"
						value={formData.language}
						onChange={handleChange}
					>
						<option value="Korean">Korean</option>
						<option value="Japanese">Japanese</option>
						<option value="Chinese">Chinese</option>
						<option value="Spanish">Spanish</option>
						<option value="French">French</option>
						<option value="German">German</option>
						<option value="Italian">Italian</option>
						<option value="Portuguese">Portuguese</option>
						<option value="Russian">Russian</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="definition">Definition</label>
					<textarea
						id="definition"
						name="definition"
						value={formData.definition}
						onChange={handleChange}
						placeholder="What does this word mean?"
						rows={3}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="usage">Usage Example</label>
					<textarea
						id="usage"
						name="usage"
						value={formData.usage}
						onChange={handleChange}
						placeholder="Example: 안녕하세요, 저는 한국인입니다"
						rows={3}
					/>
				</div>

				<button
					type="submit"
					className="submit-button"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Adding..." : "Confirm"}
				</button>
			</form>
		</div>
	);
}

export default AddWordPage;
