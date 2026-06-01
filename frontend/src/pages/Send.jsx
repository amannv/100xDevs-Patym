import { data, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useRef } from "react";
import axios from "axios";

const Send = () => {
  const [searchParams] = useSearchParams();
  const amountRef = useRef(null);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const sendMoney = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          toAccountId: id,
          amount: amountRef.current?.value,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (e) {
      console.error("something went wrong", e);
      alert("something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100">
      <div className="bg-white w-md p-5 border-neutral-800 rounded-md flex flex-col gap-4">
        <Heading text={"Send Money"} />
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center rounded-full w-10 h-10 bg-neutral-200 font-bold">
            {name[0]}
          </div>
          <div className="text-lg font-bold text-neutral-900 text-center ">
            {name}
          </div>
        </div>
        <InputBox
          type="text"
          ref={amountRef}
          label="Amount (in Rs)"
          placeholder="Enter Amount"
        />
        <Button label={"Initiate transfer"} onClick={sendMoney} />
      </div>
    </div>
  );
};

export default Send;
