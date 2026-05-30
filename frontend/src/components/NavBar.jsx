const NavBar = ({ name, heading }) => {
  return (
    <nav className="w-full h-16 bg-white border-b border-neutral-200  flex justify-between items-center px-35 mb-5">
      <h1 className="text-2xl mb-1 font-bold text-neutral-900 text-center">
        {heading}
      </h1>
      <div className="flex items-center gap-2">
        <p className="font-bold">Hello, {name}</p>
        <div className="flex justify-center items-center rounded-full w-10 h-10 bg-neutral-200 font-bold">
          {name[0]}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
