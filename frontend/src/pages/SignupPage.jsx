import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SignupPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100">
      <div className="bg-white max-w-sm p-5 border-neutral-800 rounded-md flex flex-col gap-4">
        <Heading text={"Sign Up"} />
        <SubHeading text={"Enter your information to create your account"} />
        <InputBox type="text" label="First Name" placeholder="John" />
        <InputBox type="text" label="Last Name" placeholder="Doe" />
        <InputBox type="email" label="Email" placeholder="johndoe@gmail.com" />
        <InputBox type="password" label="Password" placeholder="123456" />
        <Button label={"Sign Up"} />
        <BottomWarning
          text={"Already have an account?  "}
          placeholder={"Sign In"}
          link={"http://localhost:5173/signin"}
        />
      </div>
    </div>
  );
};

export default SignupPage;
