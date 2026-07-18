import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWord } from "../../utils/storage";
import Header from "../../components/Header/Header";
import AddWordForm from "../../components/AddWordForm/AddWordForm";
import "./AddWordPage.css";

interface FormData {
	word: string;
	translation: string;
	definition: string;
	usage: string;
	language: string;
}

function AddWordPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
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
			<Header
				title="Add New Word"
				onBackClick={() => navigate("/")}
				className="header"
			/>
			<AddWordForm
				formData={formData}
				isSubmitting={isSubmitting}
				onChange={handleChange}
				onSubmit={handleSubmit}
				className="add-word-form"
			/>
		</div>
	);
}

export default AddWordPage;
