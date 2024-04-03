import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { AuthorDetails } from "@/components/created";
import { img1, img2, img3 } from "@/assets";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full items-center h-[100vh] justify-center flex-col">
        <motion.h1
          className="text-pink-400 text-4xl sm:text-3xl lg:text-5xl text-center"
          initial={{ opacity: 0, bottom: "10px" }}
          animate={{ opacity: 1, bottom: "0px" }}
          transition={{ duration: 1.5 }}
        >
          Track your periods in just one click
        </motion.h1>
        <motion.p
          className="text-slate-500 mt-3 text-base sm:mt-3 sm:text-xl text-center"
          initial={{ opacity: 0, bottom: 10 }}
          animate={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 2 }}
        >
          Manage all your periods seemlessly withount any hesitation for free in
          just one click <br /> Just click one the get started and start your
          journy
        </motion.p>
        <Button
          className="mt-12"
          size="lg"
          onClick={() => navigate("/periods")}
        >
          Get Started
        </Button>
      </div>
      <motion.div
        className="w-full flex flex-col lg:flex-row items-center justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src={img1}
            alt=""
            className="w-[250px] border border-slate-300"
          />
        </div>
        <div className="flex-1 max-sm:mt-5">
          <h2 className="text-2xl lg:text-4xl text-pink-400 mb-2 ">
            Date range
          </h2>
          <p className="text-slate-500">
            Get amazing date range feature, just select the dates and click on
            save, it will handle everything for you. It will automatically
            understand your dates and sort them accordingly, so dont worry about
            missing
          </p>
        </div>
      </motion.div>
      <motion.div
        className="w-full flex flex-col justify-center lg:flex-row-reverse items-center lg:justify-between mt-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src={img2}
            alt=""
            className="w-[250px] border border-slate-300"
          />
        </div>
        <div className="flex-1 lg:flex lg:items-end lg:flex-col max-sm:mt-5">
          <h2 className="text-2xl lg:text-4xl text-pink-400 mb-2 ">
            All in one
          </h2>
          <p className="text-slate-500">
            Get all your recorded periods, in just one click, with out any
            hesitations, you can remove as you want any time you need. Get
            minimal stats about your period that will ensure your menstrual
            health is fine
          </p>
        </div>
      </motion.div>
      <motion.div
        className="w-full flex flex-col lg:flex-row items-center justify-between mt-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src={img3}
            alt=""
            className="w-[250px] border border-slate-300"
          />
        </div>
        <div className="flex-1 max-sm:mt-5">
          <h2 className="text-2xl lg:text-4xl text-pink-400 mb-2 ">
            Minimal Signin
          </h2>
          <p className="text-slate-500">
            Just use your google account to signin without hesitation, Forget
            about remembering boring passwords and all the stuffs. Currecntly
            avilable only for google signin, new social signin options will be
            available soon
          </p>
        </div>
      </motion.div>
      <AuthorDetails />
    </>
  );
};

export default Home;
