
import CountUp from "react-countup";

function StatisticsCard({ count,title,icon:Icon }) {
  return (
    <div className="p-6 my-6 ">
      <div className="container bg-stone-100 grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4 border">
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <Icon className="size-8"/>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold ">
              <CountUp start={0} end={count} delay={0}>
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
            </p>
            <p className="capitalize">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard;
