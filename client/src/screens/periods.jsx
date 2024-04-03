import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRanger, PeriodBox, PeriodBoxSkeleton } from "@/components/created";
import { Button, useToast } from "@/components/ui";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import moment from "moment";

const Periods = () => {
  const userContext = useContext(UserContext);
  const [periodsList, setPeriodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [remark, setRemark] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const saveButton = useRef(null);

  //GET ALL PERIODS
  const getPeriods = () => {
    axios
      .get(import.meta.env.VITE_PERIOD_URL + "/get", {
        withCredentials: true,
      })
      .then((response) => {
        setPeriodList(response.data);
        setIsLoading(false);
      });
  };

  //CHECKING FOR AUTHENTICATION
  const checkAuth = () => {
    if (!window.localStorage.getItem("userdata")) {
      navigate("/auth");
    }
  };

  //ADD PERIOD
  const addPeriod = () => {
    setIsLoading(true);
    saveButton.current.setAttribute("disabled", "");
    axios
      .post(
        import.meta.env.VITE_PERIOD_URL + "/add",
        {
          startDate: moment(date[0].startDate).add(1, "day"),
          endDate: moment(date[0].endDate).add(1, "day"),
          remark,
          user_id: userContext.userData.id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast({
          variant: "default",
          title: "New Period Added",
        });
        setIsLoading(false);
        saveButton.current.removeAttribute("disabled");
        setRemark("");
        getPeriods();
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
  };

  useEffect(() => {
    checkAuth();
    getPeriods();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between gap-10 flex-col-reverse lg:flex-row">
        <div className="flex-1">
          <div className=" w-full flex items-center justify-between">
            {periodsList.length > 0 && (
              <h1 className="text-xl md:text-2xl text-slate-600">
                {showAll ? "Your All Periods" : "Your Recent Periods"}
              </h1>
            )}
            {periodsList.length > 5 && (
              <Button
                variant="ghost"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {" "}
                {showAll ? "See less" : "see all"}
              </Button>
            )}
          </div>
          <div className="w-full">
            {isLoading && (
              <>
                <PeriodBoxSkeleton />
                <PeriodBoxSkeleton />
                <PeriodBoxSkeleton />
                <PeriodBoxSkeleton />
                <PeriodBoxSkeleton />
              </>
            )}
            {periodsList.length === 0 && !isLoading && (
              <p className="text-center my-20 text-slate-700">
                Add your first period
              </p>
            )}
            {!isLoading && periodsList && (
              <>
                {periodsList.map((period, index) => {
                  if (!showAll) {
                    if (index < 5) {
                      return (
                        <PeriodBox
                          startDate={period.startDate}
                          endDate={period.endDate}
                          remark={period.remark}
                          id={period._id}
                          previousDate={
                            periodsList.length - 1 != index &&
                            periodsList[index + 1].endDate
                          }
                          key={index}
                          index={index}
                          length={periodsList.length}
                          user_id={period.user_id}
                          reload={getPeriods}
                        />
                      );
                    }
                  } else {
                    return (
                      <PeriodBox
                        startDate={period.startDate}
                        endDate={period.endDate}
                        remark={period.remark}
                        id={period._id}
                        previousDate={
                          periodsList.length - 1 != index &&
                          periodsList[index + 1].endDate
                        }
                        key={index}
                        index={index}
                        length={periodsList.length}
                        user_id={period.user_id}
                        reload={getPeriods}
                      />
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center flex-col max-sm:mb-5">
          <h3 className="mb-2 text-slate-600">How long it last?</h3>
          <DateRanger setDate={setDate} date={date} />
          <textarea
            className="w-[335px] resize-none mt-3 h-[200px] p-2 rounded border-pink-400 outline-pink-300 text-slate-700"
            placeholder="Enter your remark on this period"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
          <Button
            className="mt-3 flex items-center justify-center"
            size="lg"
            onClick={addPeriod}
            ref={saveButton}
          >
            {!isLoading ? (
              "Save"
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Periods;
