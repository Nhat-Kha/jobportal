export default function InputField({
  label,
  value,
  onChange,
  className,
  placeholder,
  onBlur,
  type,
  error,
}) {
  return (
    <div className={className}>
      <div className="flex gap-2">
        <label className="block text-black text-sm font-semibold mb-2">
          {label}
          <span className="text-[#ff3131]">*</span>
        </label>

        <label className="text-[#ff3131] text-sm font-semibold mb-2">
          {error}
        </label>
      </div>
      <input
        className="block border border-grey-light w-full p-3 rounded focus:ring-primary focus:border-primary"
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}
