const BottomWarning = ({ text, onClick, placeholder }) => {
  return (
    <div>
      <p className="text-md text-neutral-900 text-center">
        {text}
        <a onClick={onClick} className="underline">
          {placeholder}
        </a>
      </p>
    </div>
  );
};

export default BottomWarning;
