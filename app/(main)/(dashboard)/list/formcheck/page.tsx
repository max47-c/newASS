import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, UserData } from "@/lib/data";
import { BloodRequest, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma"
import { data } from "framer-motion/client";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { AnyCnameRecord } from "dns";



const columns = [
  {
    header: "Info",
    accessor: "info"
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Blood Type",
    accessor: "bloodType",
    className: "hidden md:table-cell",
  },
  {
    header: "Sex",
    accessor: "sex",
    className: "hidden md:table-cell",
  },
  {
    header: "Blood Quantity",
    accessor: "bloodQty",
    className: "hidden md:table-cell",
  },
  {
    header: "Urgency",
    accessor: "urgency",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden md:table-cell",
  },

  {
    header: "Action",
    accessor: "action",
  },
];
const RequestReview = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page, ...queryParams } = searchParams ?? {};
  const p: number = page ? parseInt(page) : 1;

  const renderRow = (item: BloodRequest) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-300">
      <td className="flex items-center gap-4 p-4">
        {/* <Image src={/*item.photo ||*/ "/noAvatar.png"} alt="User" width={50} height={50} className="md:hidden lg:block w-10 h-10 rounded-full object-cover" /> */}
        <div className="flex flex-col">
          <h3 className="font-semi">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className="hidden md:table-cell">{item.bloodType}</td>
      <td className="hidden md:table-cell">{item.sex}</td>
      <td className="hidden lg:table-cell">{item.bloodQty}</td>
      <td className="hidden lg:table-cell">{item.urgency}</td>
      <td className="hidden lg:table-cell">{item.status}</td>
     
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/bloodBankManager/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/view.png" alt="View" width={15} height={15} />
            </button>
          </Link> */}
          {role === "admin" && (

            <>
              <FormModel table={"bloodBank"} type={"update"} data={item} />
              <FormModel table={"bloodBank"} type={"delete"} id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );



  const [data, count] = await prisma.$transaction([

    prisma.bloodRequest.findMany({

      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,

    }),
    prisma.bloodRequest.count(),


  ])
  //  console.log(data,count)
  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      {/* Top Row: Title and Controls on the Same Line */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">Blood Manager</h1>
        {/* Controls: Search and Buttons */}
        <div className="flex  flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* <TableSearch /> */}
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/filter.png" alt="Filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/sort.png" alt="Sort" width={20} height={20} />
            </button>
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/plus.png" alt="Add" width={20} height={20} />
            </button> */}
            <FormModel table={"bloodBank"} type={"create"} />
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default RequestReview; 
