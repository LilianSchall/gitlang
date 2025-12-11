import "./FormGroup.css";

interface FormGroupProps {
	label: string;
	id: string;
	type?: "text" | "textarea" | "select";
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	placeholder?: string;
	required?: boolean;
	rows?: number;
	options?: { value: string; label: string }[];
	className?: string;
}

function FormGroup({
	label,
	id,
	type = "text",
	name,
	value,
	onChange,
	placeholder,
	required = false,
	rows = 3,
	options = [],
	className,
}: FormGroupProps) {
	return (
		<div className={`form-group ${className || ""}`}>
			<label htmlFor={id}>
				{label}
				{required && " *"}
			</label>
			{type === "textarea" ? (
				<textarea
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					rows={rows}
				/>
			) : type === "select" ? (
				<select id={id} name={name} value={value} onChange={onChange}>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			) : (
				<input
					id={id}
					type="text"
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
}

export default FormGroup;
