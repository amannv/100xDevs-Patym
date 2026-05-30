import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SigninPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100">
      <div className="bg-white max-w-sm p-5 border-neutral-800 rounded-md flex flex-col gap-4">
        <Heading text={"Sign In"} />
        <SubHeading text={"Enter your credentials to access your account"} />
        <InputBox type="email" label="Email" placeholder="johndoe@gmail.com" />
        <InputBox type="password" label="Password" placeholder="123456" />
        <Button label={"Sign In"} />
        <BottomWarning
          text={"Don't have an account?  "}
          placeholder={"Sign Up"}
          link={"http://localhost:5173/signup"}
        />
      </div>
    </div>
  );
};

export default SigninPage;
