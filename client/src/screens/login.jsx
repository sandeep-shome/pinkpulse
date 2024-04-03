import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ToastAction, useToast } from "@/components/ui";
import { googleImg } from "@/assets";
import { GiFairy } from "react-icons/gi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.config";
import axios from "axios";
import { UserContext } from "@/context/userContext";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  //SIGN IN WITH GOOGLE
  const handleSignin = () => {
    try {
      signInWithPopup(auth, provider).then((res) => {
        const user = res.user;
        axios
          .post(
            import.meta.env.VITE_AUTH_URL + "/login",
            {
              username: user.displayName,
              email: user.email,
              profilePicture: user.photoURL,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            userContext.setUser(res.data);
            toast({
              variant: "default",
              title: "Signed in as " + user.displayName,
            });
            navigate("/periods");
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          });
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Link to={"/"} className="flex items-center justify-center gap-1 mb-3">
        <GiFairy className="text-4xl text-pink-400" />
        <p className="text-xl text-pink-400">PinkPulse</p>
      </Link>
      <h1 className="text-center mb-2 text-xl text-slate-700">
        Sign in your account
      </h1>
      <p className="mb-5 text-slate-500 text-center">
        Use your google account for social signin, we currently only available
        for google
      </p>
      <Button
        className="flex items-center justify-center gap-2 max-sm:w-[90%] text-base mb-5"
        onClick={handleSignin}
      >
        <img src={googleImg} alt="" className="w-5 h-5 " size="lg" />
        Sign in with Google
      </Button>
      <span className="text-center text-sm text-slate-500">
        By clicking you are accepting our privacy policy
      </span>
    </div>
  );
};

export default Login;
