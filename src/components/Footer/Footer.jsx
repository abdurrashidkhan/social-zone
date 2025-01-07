import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 pt-10">
        {/* Subscribe Section */}
        <div className="grid grid-cols-1  sm:grid-cols-2 items-center gap-5 justify-evenly mb-8 pb-5">
          <div className="">
            <h3 className="text-xl font-semibold text-gray-800">
              Subscribe to Updates
            </h3>
            <p className="text-gray-600">
              Stay informed about the latest college news and events.
            </p>
          </div>
          <div className="">
            <div className="mt-4 flex  items-center justify-center">
              <input
                type="email"
                placeholder="Your Email Here"
                className="border border-gray-400 rounded-l px-4 py-2 w-60 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-100"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700">
                Join
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              We respect your privacy and protect your personal information.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 text-gray-800">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold">
              <span className="text-4xl text-slate-700">7</span>Collage.
            </h3>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Resources Section</h4>
            <ul className="space-y-1">
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  College Guides
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Application Tips
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Scholarship Info
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Event Calendar
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Center */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Support Center</h4>
            <ul className="space-y-1">
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  FAQs{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Blog Posts{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  User Reviews{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  News Updates{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Events Page{" "}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Social Media</h4>
            <ul className="space-y-1">
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Facebook Page{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Twitter Feed{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  Instagram Gallery{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  YouTube Channel{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  {" "}
                  LinkedIn Profile{" "}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Company Info</h4>
            <ul className="space-y-1">
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Careers Page
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Press Releases
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Feedback Form
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Legal Information</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Accessibility Statement{" "}
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Cookie Policy{" "}
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  User Agreement{" "}
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Data Protection{" "}
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-slate-800 hover:tracking-[.5px] hover:text-slate-900 duration-700 ease-in-out"
                >
                  Terms of{" "}
                </Link>{" "}
                Use
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-300 pt-4 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
          <p className="mb-4 sm:mb-0">
            © 2024 College Connect. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Cookies Settings
            </Link>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-blue-600">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="hover:text-blue-600">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="hover:text-blue-600">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link href="#" className="hover:text-blue-600">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
