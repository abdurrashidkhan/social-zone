"use client";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required moduless
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa6";
import clientImage from "../../assets/images/start-now-cover.ea60f005.png";
export default function CollegeImageCard() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  // slider content
  const reviewContent = [
    {
      id: 1,
      name: "Tom curs",
      position: "seo of lab info",
      image: clientImage,
      location: "Dhaka, Bangladesh",
      review:
        "Sure! For a concise review: Evaluated client's digital marketing. Website analyzed for SEO and UX. Content strategy and social media presence reviewed. Paid ads and email campaigns assessed. Conversion optimization and analytics examined. Recommendations provided for improvement",
    },
    {
      id: 2,
      name: "Tom curs",
      position: "seo of lab info",
      image: clientImage,
      location: "Dhaka, Bangladesh",
      review:
        "Sure! For a concise review: Evaluated client's digital marketing. Website analyzed for SEO and UX. Content strategy and social media presence reviewed. Paid ads and email campaigns assessed. Conversion optimization and analytics examined. Recommendations provided for improvement",
    },
    {
      id: 3,
      name: "Tom curs",
      position: "seo of lab info",
      image: clientImage,
      location: "Dhaka, Bangladesh",
      review:
        "Sure! For a concise review: Evaluated client's digital marketing. Website analyzed for SEO and UX. Content strategy and social media presence reviewed. Paid ads and email campaigns assessed. Conversion optimization and analytics examined. Recommendations provided for improvement",
    },
  ];
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
        {reviewContent.map((r) => (
          <SwiperSlide key={r.id}>
            <div className="bg-[#fff] dark:bg-[#122033] shadow-2xl p-2">
              <div className="">
                <p className="text-base">{r.review}</p>
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
                    className="mx-auto rounded-full  shadow-2xl"
                    loading="lazy"
                    //
                    src={r.image}
                    width={"80"}
                    height={"auto"}
                    alt="Picture of the author"
                  />
                </div>
                <div className="">
                  <h2>{r.name}</h2>
                  <p className="text-sm">{r.location}</p>
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
