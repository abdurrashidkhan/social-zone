"use client";

import allCollages from "@/database/find/allCollages/allCollages";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";
export default function Collages() {
  const [allContent, setAllContent] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const contentLoad = async () => {
    try {
      setLoading(true);
      const { allCollage } = await allCollages();

      // Ensure `allCollage` is an array
      if (Array.isArray(allCollage)) {
        setAllContent(allCollage);
      } else {
        console.error("Expected an array from allEvent but got:", allCollage);
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
      <div className="container mx-auto px-2 py-10 pt-[4rem] sm:pt-[8rem]">
        <div className="">
          <div className="text-center">
            <h1 className="text-slate-700 text-2xl font-bold mb-6 ">Our College</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime debitis sequi deserunt ab eos magni commodi beatae eius ipsum quidem et quos natus dolor facilis, totam obcaecati accusamus repellendus saepe. Accusantium nihil vitae impedit fugiat labore consequatur, ullam nostrum consectetur nemo, tempora repellendus. Tenetur, laudantium. Doloribus temporibus asperiores explicabo facilis.</p>
          </div>
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:md:grid-cols-3 xl:md:grid-cols-4 gap-5">
              {allContent.length > 0 ? (
                allContent.map((e) => (
                  <Link href={`/collage/${e?._id}`} key={e?._id} className="bg-white shadow-2xl p-2">
                    <div className="relative w-full h-[18rem] p-4">
                      {e?.image ? (
                        <Image
                          src={e?.image}
                          alt={e?.collageName || "Event Image"}
                          layout="fill"
                          // objectFit="cover"
                          className="rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <p>No Image Available</p>
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold  py-2">{e?.collageName?.length > 30 ? `${e?.collageName.slice(0, 28)}...` : e?.collageName || "Untitled Event"}</h2>
                    <p className="text-gray-600">{e?.description?.length > 140 ? `${e?.description.slice(0, 140)} ....` : e?.description || "No description available."}</p>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-600">No events found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
