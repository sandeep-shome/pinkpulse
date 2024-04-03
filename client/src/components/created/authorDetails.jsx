import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

const AuthorDetails = () => {
  return (
    <div className="flex w-full items-center justify-center flex-col mt-28">
      <h6 className="text-lg text-slate-500 mb-4 max-sm:text-base">
        Disigned and enginnered in India
      </h6>
      <p className="flex items-center gap-2 text-slate-500">
        By
        <Link
          to={"/https://in.linkedin.com/in/sandeep-shome"}
          className="flex items-center gap-2 hover:text-slate-900 "
        >
          <Avatar className="w-7 h-7 md:w-8 md:h-8 ">
            <AvatarImage
              src={
                "https://media.licdn.com/dms/image/D4D35AQEX04fXZK_GWw/profile-framedphoto-shrink_400_400/0/1706097741048?e=1712736000&v=beta&t=avWtlHqE5aBeSX1ElSPg2oW55ZnVWFDSfC7a8gvA_lE"
              }
              alt="@shadcn"
            />
            <AvatarFallback>Sandeep</AvatarFallback>
          </Avatar>
          Sandeep Shome
        </Link>
      </p>
    </div>
  );
};

export default AuthorDetails;
