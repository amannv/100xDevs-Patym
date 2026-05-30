import Button from "./Button";

const UserComponent = ({ name, onClick }) => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center rounded-full w-10 h-10 bg-neutral-200 font-bold">
          {name[0]}
        </div>
        <div className="text-lg font-bold text-neutral-900 text-center ">
          {name}
        </div>
      </div>
      <Button label={"Send Money"} onClick={onClick} />
    </div>
  );
};

export default UserComponent;
