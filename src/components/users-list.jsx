'use client";';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import Image from "next/image";

const Userslist = () => {
  const [fetchError, setFetchError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        setFetchError("Could not fetch users");
        setLoading(false);
        return;
      }
      if (data) {
        setUsers(data);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Table className="border-2 border-[#EEF9FF] shadow-2xl shadow-black rounded-lg">
      <TableHeader className="border-0 bg-white rounded-2xl">
        <TableRow className="border-0">
          <TableHead className="py-4">Name</TableHead>
          <TableHead className="py-4">Email Address</TableHead>
          <TableHead className="py-4">Date Joined</TableHead>
          <TableHead className="py-4">Itinerary Created</TableHead>
          <TableHead className="py-4">Status</TableHead>
          <TableHead className="py-4"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="odd:bg-light-200 border-0">
            <TableCell className="py-4">
              {user.first_name} {user.last_name}
            </TableCell>
            <TableCell className="py-4">{user.email}</TableCell>
            <TableCell className="py-4">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>{user.itinerary_created || 0}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <button className="cursor-pointer">
                <Image
                  src="/assets/icons/trash.svg"
                  alt="trash"
                  width={20}
                  height={20}
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default Userslist;
