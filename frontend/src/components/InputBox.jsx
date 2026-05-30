const InputBox = ({ type, placeholder, label, ref }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-lg text-neutral-900">{label}</label>
      <input
        ref={ref}
        className="border border-neutral-300 w-full rounded-md max-w-md py-2 px-2 text-sm"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
