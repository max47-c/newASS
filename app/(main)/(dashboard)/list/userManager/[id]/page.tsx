// components/SingleUserPage.tsx
import Image from "next/image";
import UserRequestHistory from "@/components/UserRequestHistory";
import FormModel from "@/components/FormModel";
import prisma from "@/lib/prisma";
import EventCalendar from "@/components/EventCalendar";

const SingleUserPage = async () => {
  const Id = "6764b3cdbf2a6c7831444ec1";
  const user = await prisma.user.findUnique({where:{id:Id}}) ;
  const user1 = await prisma.bloodRequest.findMany({
    where:{email: user?.email},
    select:{
  
      name: true,
      email: true,
      bloodType: true,
      note: true,
      date: true,
      bloodQty: true,
      status: true,
    }
  }) ;


  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* user card */}
          <div className="bg-[#e33535e3] py-6 px-6 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={user?.image}
                alt="user"
                width={100}
                height={100}
                className="w-36 h-36 rounded-full object-cover"
                />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className=" flex items-center gap-4">
                {/* <h1 className="text-xl font-semibold">{user.name}</h1> */}
                <FormModel table={"user"} type={"update"} data={
                  {id: user?.id,
                    name: user?.name,
                    firstName: user?.firstname,
                    lastName: user?.lastname,
                    bio: user?.bio,
                    address: user?.address,
                    dateBirth: user?.birthday,
                    bloodType: user?.bloodType,
                    email: user?.email,
                    phone: user?.image,}
                    } />
              </div>
              <p className="text-sm text-gray-500">{user?.bio}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  {/* <Image src="/date.png" alt="Date of birth" width={16} height={16} /> */}
                  <span className="font-bold ">ID: </span>
                  <span>{user?.id}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="Blood type" width={16} height={16} />
                  <span>{user?.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={16} height={16} />
                  <span>{user?.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={16} height={16} />
                  <span>{user?.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* small card */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="bg-white rounded-md flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4 items-center">
              <Image src="/singleAttendance.png" alt="Donations" width={24} height={24} />
              <h1 className="text-xl font-semibold">{user?.numDon}</h1>
              <span className="text-sm text-gray-400">Total Donations</span>
            </div>
            <div className="bg-white rounded-md flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4 items-center">
              <Image src="/singleClass.png" alt="Requests" width={24} height={24} />
              <h1 className="text-xl font-semibold">{user?.numDon}</h1>
              <span className="text-sm text-gray-400">Total Requests</span>
            </div>
            {/* <div className="bg-white rounded-md flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4 items-center">
              <Image src="/singleBranch.png" alt="Centers" width={24} height={24} />
              <h1 className="text-xl font-semibold">5</h1>
              <span className="text-sm text-gray-400">Nearby Centers</span>
            </div>
            <div className="bg-white rounded-md flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4 items-center">
              <Image src="/singleLesson.png" alt="Donation Status" width={24} height={24} />
              <div className={`w-3 h-3 rounded-full ${user?.donorStatus ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm text-gray-400">Next Donation</span>
            </div> */}
          </div>
        </div>

        {/* bottom sections */}
        <div className="mt-4 bg-white rounded-md p-4 h-[420px]">
          <div className="flex justify-between">
                <h1 className="text-xl font-semibold">blood Request Status</h1>
                <span className="text-sm text-gray-500 cursor-pointer">View All</span>
          </div>
          <UserRequestHistory data={user1} limit={10} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
