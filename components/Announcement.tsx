import Image from "next/image"

const Announcement = () => {
  return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold my-4">Announcement</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="rounded-md p-4 bg-[#bfdbfe]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">announcement title</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            2025-01-01
                        </span>
                    </div>
                        <p className="text-sm text-gray-500 mt-1">random text for the begining of a new life towqrd the our lovely god for the rest of the life </p>
                </div>
                <div className="rounded-md p-4 bg-[#cae2ff]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">announcement title</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            2025-01-01
                        </span>
                    </div>
                        <p className="text-sm text-gray-500 mt-1">random text for the beginning of a new life toward the our lovely god for the rest of the life </p>
                </div>
                <div className="rounded-md p-4 bg-[#deecfd]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">announcement title</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            2025-01-01
                        </span>
                    </div>
                        <p className="text-sm text-gray-500 mt-1">random text for the beginning of a new life towqrd the our lovely god for the rest of the life </p>
                </div>
            </div>
        </div>
  );
};
export default Announcement