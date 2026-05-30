const BottomWarning = ({ text, link, placeholder }) => {
  return (
    <div>
      <p className="text-md text-neutral-900 text-center">
        {text}
        <a className="underline" href={link}>
          {placeholder}
        </a>
      </p>
    </div>
  );
};

export default BottomWarning;
