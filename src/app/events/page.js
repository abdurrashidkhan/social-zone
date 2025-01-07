"use client";

import allEvent from "@/database/find/allEvent/allEvent";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Events() {
  const [allContent, setAllContent] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const contentLoad = async () => {
    try {
      setLoading(true);
      const { allEvents } = await allEvent();

      // Ensure `allEvents` is an array
      if (Array.isArray(allEvents)) {
        setAllContent(allEvents);
      } else {
        console.error("Expected an array from allEvent but got:", allEvents);
        setAllContent([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    contentLoad();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="container mx-auto px-4 py-10 pt-[4rem] sm:pt-[8rem]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold uppercase text-slate-700 mb-6 text-center">Our College Events</h1>
          <p className="text-slate-700 font-medium py-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quam cum eius expedita commodi debitis libero nihil voluptas, perspiciatis minima iure harum aspernatur facilis voluptatum exercitationem porro corrupti dolores ipsa nisi autem, quod praesentium minus? Qui facere vitae ipsum quasi quisquam modi sequi, ea, quia, ducimus optio voluptas. Amet, tempora.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:md:grid-cols-3 xl:md:grid-cols-4 gap-5">
          {allContent.length > 0 ? (
            allContent.map((e) => (
              <Link href={`/event/${e?._id}`} key={e?._id} className="bg-white shadow-2xl p-2">
                <div className="relative w-full h-64">
                  {e?.image ? (
                    <Image
                      src={e?.image}
                      alt={e?.title || "Event Image"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p>No Image Available</p>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-medium  py-2">{e?.title?.length > 30 ? `${e?.title.slice(0, 28)}...` : e?.title || "Untitled Event"}</h2>
                <p className="text-gray-600">{e?.description?.length > 140 ? `${e?.description.slice(0, 140)} ....` : e?.description || "No description available."}</p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No events found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
