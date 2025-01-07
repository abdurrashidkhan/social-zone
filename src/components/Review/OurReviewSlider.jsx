"use client";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Loading from "@/app/loading";
import allReviewInfo from "@/database/find/reviewFind/reviewFind";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa6";
export default function OurReview() {
  const [isLoading, setLoading] = useState(false);
  const [reviewInfo, setReviewInfo] = useState([]);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  //

  const allReview = async () => {
    setLoading(true);
    const { reviewInfo } = await allReviewInfo();
    setReviewInfo(reviewInfo);
    setLoading(false);
  };
  // console.log(reviewInfo);
  useEffect(() => {
    allReview();
  }, []);

  //
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="hover:cursor-pointer">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {reviewInfo?.map((r) => (
          <SwiperSlide key={r._id}>
            <div className="bg-[#fff] text-slate-800 shadow-2xl p-2 rounded border ">
              <div className="">
                <p className="text-base text-center pt-5">
                  {`${r.reviewDescription.slice(0, 200)}...`}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-4">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStarHalf className="text-yellow-500" />
                <FaRegStar className="text-yellow-500" />
              </div>
              <div className="flex items-center justify-center gap-6 py-10">
                <div className="">
                  <Image
                    loading="lazy"
                    quality={100}
                    src={r.image}
                    width={70}
                    height={60}
                    alt="Picture of the author"
                    className="mx-auto rounded-full  shadow-2xl h-auto"
                  />
                </div>
                <div className="">
                  <h2>{r.displayName}</h2>
                  <p className="text-sm">{r.location || "Unknown"}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
