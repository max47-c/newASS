
import { useUser } from "@clerk/nextjs"; // Import client-side hook
import { getAnnouncements } from "@/lib/getAnnouncement"; // Import server-side data fetching logic
import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Announcement } from "@prisma/client";

import Image from "next/image";

 const role ="admin"
const AnnouncementListPage = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page = "1" } = searchParams || {};
  const p = parseInt(page, 10);

  // Fetch announcements on the server-side
  const { data, count } = await getAnnouncements(p);
  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: Announcement) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-300">
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semi">{item.title}</h3>
      </td>
      <td className="hidden md:table-cell">{item.message}</td>
      <td className="hidden md:table-cell">{item.datePosted?.toISOString().split("T")[0] || "-"}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel table="announcement" type="update" data={item} />
              <FormModel table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">Announcements</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/filter.png" alt="Filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/sort.png" alt="Sort" width={20} height={20} />
            </button>
            <FormModel table="announcement" type="create" />
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;
