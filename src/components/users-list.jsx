'use client";';

import { fetchUsersData } from "../lib/supabase";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaginationComponent } from "./pagination";
import { UserListHeaderComponent } from "./user-list-header";
import UserData from "./user-data";

const Userslist = () => {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", page], // Key changes with page number
    queryFn: () => fetchUsersData(page, limit),
    keepPreviousData: true, // Keeps the old data visible while fetching the new page
  });

  if (status === "error") return <div>Error: {error.message}</div>;
  const totalPages = data ? Math.ceil(data.count / limit) : 0;
  const delta = 1;
  const start = Math.max(1, page - delta);
  const end = Math.min(totalPages, page + delta);
  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  return (
    <>
      <div className="border border-[#EEF9FF] rounded-lg overflow-auto p-6">
        <UserListHeaderComponent />
        <UserData data={data} status={status} />
        <PaginationComponent
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          isPlaceholderData={isPlaceholderData}
          visiblePages={visiblePages}
        />
      </div>
    </>
  );
};
export default Userslist;
