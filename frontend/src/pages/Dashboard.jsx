import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import NavBar from "../components/NavBar";
import UserComponent from "../components/UserComponent";

const Dashboard = () => {
  return (
    <div>
      <NavBar heading={"Paytm"} name={"Ayush"} />
      <div className="w-full h-screen max-w-7xl mx-auto px-5">
        <div className="flex flex-col gap-5">
          <div className="text-lg font-bold">Your Balance: 8000</div>
          <InputBox label={"Users"} placeholder={"Search users..."} />
          <UserComponent name={"Ayush"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
