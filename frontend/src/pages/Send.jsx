import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import UserComponent from "../components/UserComponent";

const Send = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100">
      <div className="bg-white w-md p-5 border-neutral-800 rounded-md flex flex-col gap-4">
        <Heading text={"Send Money"} />
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center rounded-full w-10 h-10 bg-neutral-200 font-bold">
            U
          </div>
          <div className="text-lg font-bold text-neutral-900 text-center ">
            Friend's Name
          </div>
        </div>
        <InputBox
          type="text"
          label="Amount (in Rs)"
          placeholder="Enter Amount"
        />
        <Button label={"Initiate transfer"} />
      </div>
    </div>
  );
};

export default Send;
