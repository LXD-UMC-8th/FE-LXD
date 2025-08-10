interface FormInputProps {
  name?: string;
  placeholder: string;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
  disabled?: boolean;
}

const FormInput = ({
  name,
  placeholder,
  input,
  onChange,
  onBlur,
  type = "text",
  disabled,
}: FormInputProps) => {
   // type === "password"일 때 스페이스바 입력 방지
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "password" && (e.key === " " || e.code === "Space")) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-[10px]">
      <div className="text-subhead3 font-medium">{name}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={input}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className="w-full h-14 px-8 py-4 border rounded-md 
              border-gray-300 bg-gray-50 placeholder-gray-400 text-body1
             focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default FormInput;
