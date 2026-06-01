import { useRef } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const username = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username: username.current?.value,
          password: password.current?.value,
          firstName: firstName.current?.value,
          lastName: lastName.current?.value,
        },
      );

      if (response.status === 200) {
        alert("User signed up successfully");
        navigate("/signin");
      }
    } catch (error) {
      if (error.response?.data?.message === "Already User exists") {
        alert("User already exists");
        navigate("/signin");
      } else {
        console.log(error);
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100">
      <div className="bg-white max-w-sm p-5 border-neutral-800 rounded-md flex flex-col gap-4">
        <Heading text={"Sign Up"} />
        <SubHeading text={"Enter your information to create your account"} />
        <InputBox
          ref={firstName}
          type="text"
          label="First Name"
          placeholder="John"
        />
        <InputBox
          ref={lastName}
          type="text"
          label="Last Name"
          placeholder="Doe"
        />
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
          placeholder="12345678"
        />
        <Button onClick={signup} label={"Sign Up"} />
        <BottomWarning
          text={"Already have an account?  "}
          placeholder={"Sign In"}
          onClick={() => {
            navigate("/signin");
          }}
        />
      </div>
    </div>
  );
};

export default SignupPage;
