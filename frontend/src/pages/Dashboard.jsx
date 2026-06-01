import { useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import NavBar from "../components/NavBar";
import UserComponent from "../components/UserComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUsers] = useState([]);
  const [balance, setBalance] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getUsers = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setUsers(response.data.users);
      };
      getUsers();
    } catch (error) {
      console.error(error);
    }
  }, [filter]);

  useEffect(() => {
    try {
      const getUserBalance = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setBalance(response.data.balance);
      };
      getUserBalance();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <NavBar heading={"Paytm"} name={"User"} />
      <div className="w-full h-screen max-w-7xl mx-auto px-5">
        <div className="flex flex-col gap-5">
          <div className="text-lg font-bold">Your Balance: {balance}</div>
          <InputBox
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            label={"Users"}
            placeholder={"Search users..."}
          />
          {user &&
            user.map((user) => (
              <UserComponent
                key={user.id}
                name={user.firstName + " " + user.lastName}
                onClick={() => {
                  navigate(`/send?id=${user.id}&name=${user.firstName}`);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
