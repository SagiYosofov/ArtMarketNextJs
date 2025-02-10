// Form Field Component
export const FormField = ({ label, children, hint }) => (
    <div>
        <label className="block mb-1">{label}</label>
        {children}
        {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
)

// Select Field Component
export const SelectField = ({ label, name, value, onChange, options, required = false }) => (
    <FormField label={label}>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required={required}
        >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    </FormField>
)
