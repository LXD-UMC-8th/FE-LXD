interface FormInputProps {
  name?: string;
  placeholder: string;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
}

const FormInput = ({
  name,
  placeholder,
  input,
  onChange,
  onBlur,
  type = "text",
}: FormInputProps) => {
  return (
    <div className="space-y-[10px]">
      <div className="text-subhead3 font-medium">{name}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={input}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full h-14 px-8 py-4 border rounded-md 
              border-gray-300 bg-gray-50 placeholder-gray-400 text-body1
             focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default FormInput;
