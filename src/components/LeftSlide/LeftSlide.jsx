export default function LeftSlide() {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <aside className="hidden md:block w-1/5 border-r p-4">
        <ul className="space-y-2">
          <li className="text-lg font-medium">Home</li>
          <li className="text-gray-700">Explore</li>
          <li className="text-gray-700">Messages</li>
        </ul>
      </aside>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-1/5 border-l p-4">
        <h3 className="font-bold text-gray-800">Suggestions for you</h3>
        <ul className="mt-4 space-y-2">
          {["monalisa11934", "shopnil_ehsan", "sharif_hujaifa"].map(
            (user, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={`/suggestion-avatar-${index + 1}.jpg`}
                    alt={user}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p>{user}</p>
                </div>
                <button className="text-blue-500 font-medium">Follow</button>
              </li>
            )
          )}
        </ul>
      </aside>
    </div>
  );
}
