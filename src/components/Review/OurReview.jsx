import OurReviewSlider from "./OurReviewSlider";
import "./style.css";

export default function OurReview() {
  return (
    <section className="container mx-auto px-2 py-10">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-5">
          {/* Animation Section */}
          <div>
            <div className="w-[98%] sm:w-[50%] h-auto mx-auto">
              <div className="w-full h-auto mx-auto"></div>
            </div>
            <div className="px-4 pt-5">
              <h1 className="text-3xl font-medium pb-6 sm:pb-0">
                <strong className="text-4xl font-semibold text-slate-800">
                  Student
                </strong>{" "}
                Feedback
              </h1>
              <p className="pt-5">
                Your journey begins here. See how our students describe their
                experiences and how we’ve helped them excel academically and
                personally.
              </p>
            </div>
          </div>
          {/* Review Slider Section */}
          <div>
            <OurReviewSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
