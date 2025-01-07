import answer from "@/images/svg/undraw_my-answer_dwu4.svg";
import Image from "next/image";
export default function QuestionAndAns() {
  return (
    <section>
      <div className="container mx-auto px-2  py-14">
        <div className=""></div>
        <div className="">
          <div className="">
            <div className="flex  flex-col-reverse  sm:flex-row items-center sm:gap-5  shadow-2xl px-4">
              <div className="">
                <div className="join join-vertical w-full">
                  <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-lg font-medium">
                      Differentiate between direct marketing and branding?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Direct marketing has a direct impact on top-line
                        revenue. Typically, a high level of urgency and priority
                        is assigned. Brand marketing has a long-term impact on
                        brand equity and serves as a barrier to market
                        pressures. It&rsquo;s not urgent, but it&rsquo;s
                        critical.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-lg font-medium">
                      List a few disadvantages of Digital Marketing?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Skills and training - Make sure your staff has the
                        expertise and experience they need to properly deploy
                        digital marketing. Tools, platforms, and trends change
                        quickly, so being up to date is essential.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-lg font-medium">
                      What are some of the popular digital marketing tools?
                    </div>
                    <div className="collapse-content">
                      <p>
                        In Digital Marketing, there are a variety of techniques
                        that can be utilized to achieve a specific aim. Here are
                        a few examples:
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-lg font-medium">
                      What are the best practices to rank your YouTube videos?
                    </div>
                    <div className="collapse-content">
                      <ul>
                        <li>
                          1. Create content that’s informative and engaging
                        </li>
                        <li>
                          2. Optimize your videos. Some ways to do this are:{" "}
                        </li>
                        <li>
                          3. The title needs to have a high search volume and
                          low difficulty
                        </li>
                        <li>
                          4. Use a captivating thumbnail and relevant hashtag
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-lg font-medium">
                      What is the use of anchor tags in SEO?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Anchor tags are basically tags that are attached to a
                        word or a phrase, that brings down the readers to a
                        different section of the page as opposed to another
                        webpage. This means you are creating a unique URL within
                        the same page. Some of the benefits of using the anchor
                        tags include:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-[98%] sm:w-[50%] h-auto ml-auto mr-0 mx-auto ">
                  <Image className="w-full" src={answer} alt="loading"></Image>
                </div>
                <div className="py-4 sm:py-8 sm:pb-10 text-start sm:text-end ">
                  <h1 className="text-3xl font-medium pb-6 sm:pb-0">
                    সচরাচর জানতে চাওয়া{" "}
                    <strong className="text-4xl font-semibold text-slate-800">
                      প্রশ্নের উত্তর
                    </strong>{" "}
                  </h1>
                  <p className="  sm:pb-0 sm:pt-6 text-[19px]">
                    আপনাদের কমন কিছু প্রশ্নের উত্তর আমরা এখানে লিস্ট করে দিয়েছি।
                    আমাদের কে প্রশ্ন করার পূর্বে এই লিস্টটি একবার পড়ে নেয়ার
                    অনুরোধ থাকলো। তাহলে আমাদের উত্তরের জন্য আপনাকে অপেক্ষা করতে
                    হবেনা এবং আপনার মূল্যবান সময় বেঁচে যাবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
