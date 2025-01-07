import OurReview from "./OurReview/OurReview";

export default function ReviewPage() {
  return (
    <section>
      <div className="container px-2 mx-auto py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-5">
          <div className="">
            <div className="">
              <div className="px-4">
                <p className=" font-semibold">Our Testimonial__</p>
                <h1 className="capitalize text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold py-3 dark:text-[#fff] text-[#444444] hvf-dom-checked ">
                  What people Say About Us.
                </h1>
                <p>
                  Conducted comprehensive website analysis focusing on SEO, user
                  experience, and content relevance. Identified optimization
                  opportunities for enhanced visibility and engagement.
                  Presented actionable recommendations for improved performance
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <OurReview />
          </div>
        </div>
      </div>
    </section>
  );
}
