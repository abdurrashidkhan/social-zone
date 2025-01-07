import OurClientReview from "@/components/CollegeImgeSllider/CollegeImgeSllider";
import SubmitReview from "@/components/Review/SubmitReview";

export default function MyCollege() {
  return (
    <section>
      <div className="container mx-auto px-4 pt-20 sm:pt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-5">
          <div className="">
            <OurClientReview />
          </div>
          <div className="">
            <div className="px-4">
              <div className="">
                <p className="text-[#20b820] font-semibold">My College__</p>
                <h1 className="capitalize text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold py-3  text-slate-700 hvf-dom-checked ">
                  Dhaka university about us.
                </h1>
                {/* <p>
                  University of Dhaka || the highest echelon of academic
                  excellence. On the first day of July 1921 the University of
                  Dhaka opened its doors to students with Sir P.J. Hartog as the
                  first Vice-Chancellor of the University. The University was
                  set up in a picturesque part of the city known as Ramna on 600
                  acres of land.
                </p> */}
              </div>
              <div className=" py-5">
                <ul>
                  <li className="py-1">
                    <div className="flex items-center justify-start gap-3">
                      <p className="font-bold text-sm">01.</p>
                      <p className="font-medium ">
                        {" "}
                        World University Rankings: 554 in 2025
                      </p>
                    </div>
                  </li>
                  <li className="py-1">
                    <div className="flex items-center justify-start gap-3">
                      <p className="font-bold text-sm">02.</p>
                      <p className="font-medium ">
                        Asian University Rankings: #19 in Southern Asia
                      </p>
                    </div>
                  </li>
                  <li className="py-1">
                    <div className="flex items-center justify-start gap-3">
                      <p className="font-bold text-sm">03.</p>
                      <p className="font-medium ">
                        Approximately 39,496 students
                      </p>
                    </div>
                  </li>

                  <li className="py-1">
                    <div className="flex items-center justify-start gap-3">
                      <p className="font-bold text-sm">04.</p>
                      <p className="font-medium "> Around 1,999 teachers</p>
                    </div>
                  </li>

                  <li className="py-1.5">
                    <div className="flex items-center justify-center gap-3">
                      <p className="font-bold text-sm">05.</p>
                      <p className="font-medium ">
                        The university offers various facilities for its
                        students, including libraries, research centers, and
                        residential halls.
                      </p>
                    </div>
                  </li>
                  <li className="py-1.5">
                    <div className="flex items-center justify-center gap-3">
                      <p className="font-bold text-sm">06.</p>
                      <p className="font-medium ">
                        {" "}
                        Significant contributions in research across various
                        disciplines, evidenced by numerous publications and
                        citation.
                      </p>
                    </div>
                  </li>
                  <li className="py-1.5">
                    <div className="flex items-center justify-start gap-3">
                      <p className="font-bold text-sm">07.</p>
                      <p className="font-medium ">
                        Situated in Ramna, Dhaka, the university occupies 275
                        acres of land
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="py-8">
          <p className="tracking-[1px] leading-[30px]">
            On 31 January a delegation led by Nawab Sir Salimullah,Nawab Syed
            Nawab Ali Chowdhury and Sher e-Bangla A.K. Fazlul Hug met Viceroy
            Lord Hardinge on his visit to Dhaka (then Dacca) and raised the
            demand of the establishment of a University in the region.On 2
            February a communique was published stating the decision of the
            Government of India to recommend the Constitution of a University at
            Dhaka.On 4 April the Government of British India invited the
            Government of Bengal to submit a complete scheme of the
            University.On 27 May the Government of Bengal published resolution
            in regard to the proposed University and appointed a Committee of
            thirteen members with Sir Robert Nathaniel as President to frame the
            scheme. The Committee, known as Nathan committee, submitted the
            scheme in the same year.
          </p>
        </div>
        {/* review and qussen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-5 py-10">
          <div className="">
            {/* anther section */}
            <SubmitReview />
          </div>
          <div className="">
            <div className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title text-lg font-medium">
                  What are the eligibility criteria for admission?
                </div>
                <div className="collapse-content">
                  <p>The eligibility criteria vary depending on the faculty and program. Generally, candidates must have a certain GPA in both SSC and HSC exams or equivalent qualifications.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-lg font-medium">
                  How can I apply for admission?
                </div>
                <div className="collapse-content">
                  <p>Applications are typically submitted online through the official Dhaka University admission portal. Detailed instructions are provided on the university’s website during the admission period.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-lg font-medium">
                  What documents are required for the application?
                </div>
                <div className="collapse-content">
                  <p>Commonly required documents include SSC and HSC certificates and transcripts, a recent passport-sized photograph, and the application fee payment receipt.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-lg font-medium">
                  What is the admission test format?
                </div>
                <div className="collapse-content">
                  <p>The format varies by faculty, but it generally includes multiple-choice questions (MCQs) covering subjects relevant to the chosen program. Some faculties may also have written exams and practical tests.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-lg font-medium">
                  When are the admission tests held?
                </div>
                <div className="collapse-content">
                  <p>Admission tests are usually held in October-November for the academic year starting in the following year. The specific dates are announced on the university’s website.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
