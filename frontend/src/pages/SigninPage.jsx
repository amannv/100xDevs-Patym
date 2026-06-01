import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username: username.current?.value,
          password: password.current?.value,
        },
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("User signed in successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message === "User not exists") {
        alert("User not exists");
        navigate("/signup");
      } else {
        console.log(error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100">
      <div className="bg-white max-w-sm p-5 border-neutral-800 rounded-md flex flex-col gap-4">
        <Heading text={"Sign In"} />
        <SubHeading text={"Enter your credentials to access your account"} />
        <InputBox
          ref={username}
          type="email"
          label="Email"
          placeholder="johndoe@gmail.com"
        />
        <InputBox
          ref={password}
          type="password"
          label="Password"
          placeholder="123456"
        />
        <Button label={"Sign In"} onClick={signin} />
        <BottomWarning
          text={"Don't have an account?  "}
          placeholder={"Sign Up"}
          onClick={() => {
            navigate("/signup");
          }}
        />
      </div>
    </div>
  );
};

export default SigninPage;
