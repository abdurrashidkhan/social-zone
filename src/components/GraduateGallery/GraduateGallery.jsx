import college5 from "@/assert/colleges/640px-Govt._Shaheed_Suhrawardi_College_10.jpeg";
import college4 from "@/assert/colleges/Begum_Badrunnesa_Govt._College.jpg";
import college3 from "@/assert/colleges/edanCollege.jpg";
import college7 from "@/assert/colleges/JKKNIU_Top_View.jpg";
import college1 from "@/assert/colleges/kabi-nazrul-college-e5079938-6d55-4f92-9ccf-dbf4c8d9c1c-resize-750.jpg";
import college2 from "@/assert/colleges/ob_1678024224.jpg";
import college6 from "@/assert/colleges/সরকারি_বাঙলা_কলেজ_ভবন.jpg";
import Image from "next/image";

export default function GraduateGallery() {
  const colleges = [
    { collageName: "Kabi Nazrul Govt. College", image: college1 },
    { collageName: "Dhaka College", image: college2 },
    { collageName: "Eden Mohila College", image: college3 },
    { collageName: "Begum Badrunnesa Govt. Girls College", image: college4 },
    { collageName: "Government Shaheed Suhrawardy College", image: college5 },
    { collageName: "Govt. Bangla College", image: college6 },
    { collageName: "Govt. Titumir College", image: college7 },
  ];

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl text-slate-800 font-semibold my-4">
            Gallery
          </h2>
          <p className="text-gray-600">
            Explore the vibrant achievements of our graduates.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Image */}
          <div className="lg:col-span-2 bg-gray-200 h-[50vh] sm:h-[60vh] lg:h-[91vh] relative shadow-2xl">
            <Image
              src={colleges[0]?.image}
              alt={colleges[0]?.collageName}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
            <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 p-2 text-sm font-medium text-gray-800 rounded">
              {colleges[0]?.collageName}
            </div>
          </div>

          {/* Smaller Images */}
          <div className="grid grid-rows-2 gap-4">
            {colleges.slice(1, 6).map((college, index) => (
              <div
                key={index}
                className="bg-gray-200 h-[20vh] sm:h-[25vh] lg:h-[17vh] relative shadow-2xl"
              >
                <Image
                  src={college.image}
                  alt={college.collageName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
                <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 p-2 text-sm font-medium text-gray-800 rounded">
                  {college.collageName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
