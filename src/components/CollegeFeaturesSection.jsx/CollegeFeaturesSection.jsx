import { BiSolidBookmarks } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const CollegeFeaturesSection = () => {
  return (
    <section>
      <div className="">
        <div className="container py-10 mx-auto px-2">
          <div className="flex flex-col sm:flex-row items-center justify-center justify-items-center gap-5">
            <div className="w-[100%] h-auto font-semibold">
              <h2 className="text-2xl">
                Explore Our Comprehensive College Listings and Find Your Perfect
                Match.
              </h2>
            </div>
            <div className="">
              <h2 className="text-base text-slate-800">
                Our platform provides a comprehensive selection of colleges
                suited to your preferences. Each entry features important
                details like application deadlines, upcoming events, and
                research opportunities. Find your perfect college and start your
                journey toward the future today!
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 sm:gap-10 py-5">
            <div className=" py-5 shadow-2xl">
              <div className="">
                <BiSolidBookmarks className="text-2xl mb-2" />
                <div className="px-1">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Discover Colleges with Unique Events and Research
                    Opportunities
                  </h2>
                  <p className="text-base py-2">
                    Stay informed about the latest happenings at your chosen
                    colleges.
                  </p>
                </div>
              </div>
              <div className="p-1">
                <button className="flex items-center text-base underline">
                  <span>view</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </button>
              </div>
            </div>
            <div className=" py-5 shadow-2xl">
              <BiSolidBookmarks className="text-2xl mb-2" />
              <div className="px-2">
                <div className="">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Engage with College Sports and Extracurricular Activities
                  </h2>
                  <p className="text-base py-2">
                    Explore the vibrant campus life and sports programs
                    available.
                  </p>
                </div>
                <div className="">
                  <button className="flex items-center text-base underline">
                    <span>Join</span>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" py-5 shadow-2xl">
              <BiSolidBookmarks className="text-2xl mb-2" />
              <div className="">
                <h2 className="text-lg font-semibold text-slate-800">
                  Access Detailed College Information and Admission Forms
                </h2>
                <p className="text-base py-2">
                  Get all the details you need to apply successfully.
                </p>
              </div>
              <div className="">
                <button className="flex items-center text-base underline">
                  <span>Apply</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeFeaturesSection;
