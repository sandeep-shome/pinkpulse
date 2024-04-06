import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useToast } from "../ui/";

const PeriodBox = ({
  startDate,
  endDate,
  remark,
  previousDate,
  index,
  length,
  user_id,
  id,
  reload,
}) => {
  //ARRAY OF MONTHS
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [gapStatus, setGapStatus] = useState("");
  const date1 = new Date(endDate);
  const date2 = new Date(previousDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const lastedFor =
    parseInt(endDate.split("T")[0].split("-")[2]) -
    parseInt(startDate.split("T")[0].split("-")[2]);
  const { toast } = useToast();

  //CHECKING SUFFIX FOR DATE
  const dateRank = (date) => {
    if (date === "01") return "st";
    else if (date === "02") return "nd";
    else if (date === "03") return "rd";
    else return "th";
  };

  const startDateRank = dateRank(startDate.split("T")[0].split("-")[2]);
  const endDateRank = dateRank(endDate.split("T")[0].split("-")[2]);

  //CHECKING GAP BETWEEN TWO PERIODS
  const checkGap = () => {
    if (diffDays < 25) {
      setGapStatus("Early");
    } else if (diffDays >= 25 && diffDays <= 35) {
      setGapStatus("On Time");
    } else {
      setGapStatus("Late");
    }
  };

  //CHECKINH FOR HOW MANY DAYS PERIOD LASTED
  const checkLasting = () => {
    if (lastedFor < 3) return "Early";
    else if (lastedFor >= 3 && lastedFor <= 7) return "Healthy";
    else return "Unhealthy";
  };
  const checkLastStatus = checkLasting();

  //REMOVING PERIOD
  const removePeriod = () => {
    const data = JSON.parse(window.localStorage.getItem("user-data"));
    axios
      .delete(
        import.meta.env.VITE_PERIOD_URL +
          `/remove/?id=${id}&userid=${user_id}&token=${data.token}`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        reload();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
  };

  useEffect(() => {
    checkGap();
  }, []);

  return (
    <div className="w-full my-4 bg-red-100 px-2 py-3 rounded">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <p className="text-slate-700 flex items-center gap-1">
            <span>
              {startDate.split("T")[0].split("-")[2] + startDateRank + " "}
              {months[parseInt(startDate.split("T")[0].split("-")[1]) - 1]}
            </span>
            -
            <span>
              {endDate.split("T")[0].split("-")[2] + endDateRank + " "}
              {months[parseInt(endDate.split("T")[0].split("-")[1]) - 1]},{" "}
            </span>
            {startDate.split("T")[0].split("-")[0]}
          </p>
          {index != length - 1 && (
            <div className="px-3 h-7 bg-red-200 rounded flex items-center justify-center text-slate-700">
              {gapStatus}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <FaTrash
            className="text-slate-600 hover:text-slate-700 cursor-pointer"
            onClick={removePeriod}
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <p className="text-slate-700">
          Lasted for: {lastedFor} days
          <span className="ms-2 text-sm text-red-300">{checkLastStatus}</span>
        </p>
        <p className="mt-1 text-base text-slate-700">
          <span className="text-slate-800 font-medium">Remark: </span>
          {remark ? remark : "Remark not added!"}
        </p>
      </div>
    </div>
  );
};

export default PeriodBox;
