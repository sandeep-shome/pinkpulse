import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiFairy } from "react-icons/gi";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  useToast,
  ToastAction,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/";
import axios from "axios";
import { UserContext } from "@/context/userContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActiveNav, setIsActiveNav] = useState(false);
  const { toast } = useToast();
  const userContxet = useContext(UserContext);

  //NAVBAR TOGGLE ACTIVATION
  const toggleNavbar = () => {
    window.scrollY > 0 ? setIsActiveNav(true) : setIsActiveNav(false);
  };

  //NAVBAR CLEANUP
  useEffect(() => {
    window.addEventListener("scroll", () => toggleNavbar());
    return () => {
      window.removeEventListener("scroll", () => toggleNavbar());
    };
  }, []);

  //GETTING USER DATA
  const getUserData = () => {
    axios
      .get(import.meta.env.VITE_AUTH_URL + "/get", {
        withCredentials: true,
      })
      .then((res) => {
        userContxet.setUser(res.data);
      });
  };

  //SIGN OUT
  const signOut = () => {
    axios
      .get(import.meta.env.VITE_AUTH_URL + "/logout", {
        withCredentials: true,
      })
      .then(() => {
        userContxet.removeUser();
        navigate("/");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  useEffect(() => {
    if (!window.localStorage.getItem("userdata")) getUserData();
  }, []);

  return (
    <nav
      className={`flex items-center justify-between w-full px-5 md:px-36 py-5 fixed top-0 left-0 z-30 ${
        isActiveNav && "blur-background"
      }`}
    >
      <Link to={"/"} className="flex items-center justify-center gap-1">
        <GiFairy className="text-4xl text-pink-400" />
        <p className="text-lg text-pink-400">PinkPulse</p>
        <div className="px-4 h-7 bg-red-100 rounded flex items-center justify-center text-slate-700 text-[12px]">
          BETA
        </div>
      </Link>
      <div className="">
        {userContxet.userData === null && (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </Button>
        )}

        {userContxet.userData && (
          <Popover>
            <PopoverTrigger>
              <div className="" onClick={() => {}}>
                <Avatar className="w-7 h-7 md:w-8 md:h-8">
                  <AvatarImage
                    src={userContxet.userData.profilePicture}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {userContxet.userData.username}
                  </AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center gap-3 flex-col">
                <span className="text-slate-700 text-sm">
                  {userContxet.userData.username}
                </span>
                <span className="text-slate-700 text-sm">
                  {userContxet.userData.email}
                </span>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex items-center justify-center gap-2">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-sm:w-[90%]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. once you loged out you
                        have to login in again in your account
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
