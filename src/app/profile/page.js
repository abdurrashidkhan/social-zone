import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-lg font-bold">Instagram</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700">Home</button>
            <button className="text-gray-700">Search</button>
            <button className="text-gray-700">Explore</button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <Image
              src="/profile-pic.jpg"
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Rashid Khan</h2>
            <p className="text-gray-500">Full-stack Developer</p>
            <a
              href="https://github.com/abdurrashidkhan"
              target="_blank"
              className="text-blue-500 hover:underline"
              rel="noopener noreferrer"
            >
              github.com/abdurrashidkhan
            </a>

            {/* Stats */}
            <div className="flex space-x-6 mt-4">
              <div>
                <span className="font-bold">4</span> posts
              </div>
              <div>
                <span className="font-bold">53</span> followers
              </div>
              <div>
                <span className="font-bold">24</span> following
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-lg font-semibold mb-4">Posts</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Post 1 */}
          <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
            <Image
              src="/post1.jpg"
              alt="Post 1"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform"
            />
          </div>
          {/* Post 2 */}
          <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
            <Image
              src="/post2.jpg"
              alt="Post 2"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform"
            />
          </div>
          {/* Post 3 */}
          <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
            <Image
              src="/post3.jpg"
              alt="Post 3"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
