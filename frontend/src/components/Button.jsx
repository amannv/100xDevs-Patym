const Button = ({ label, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-neutral-900 text-white w-full rounded-md max-w-md text-center py-2 px-4 text-sm"
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
