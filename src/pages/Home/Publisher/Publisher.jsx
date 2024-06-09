import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import Marquee from "react-fast-marquee";

function Publisher() {
  const axiosCommon = useAxiosCommon();
  const { data: publishers = [], isLoading: publisherLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publishers");
      return data;
    },
  });
  return (
    <section className="flex justify-center items-center overflow-x-auto gap-10 mt-10 ">
      <Marquee className="h-24">
        {publishers.map((publisher) => (
          <img
            key={publisher._id}
            src={publisher.imageURL}
            className="h-24 opacity-30 hover:opacity-100  aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0"
            alt={publisher.name}
          />
        ))}
      </Marquee>
    </section>
  );
}

export default Publisher;
