interface FormInputProps {
  name: string;
  placeholder: string;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  name,
  placeholder,
  input,
  onChange,
}: FormInputProps) => {
  return (
    <div className="space-y-[10px]">
      <div className="px-3 text-subhead3 font-medium">{name}</div>
      <input
        placeholder={placeholder}
        value={input}
        onChange={onChange}
        className="w-full h-[55px] px-[32px] py-[16px] border rounded-md 
              border-gray-400 bg-gray-50 text-gray-500 text-body1
             focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};
