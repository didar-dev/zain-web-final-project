import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const GetCourses = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    return null;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (data?.success) {
    return data?.data;
  } else {
    return null;
  }
};

export default async function page() {
  const courses = await GetCourses();
  return (
    <div className="w-full min-w-full">
      <div className="flex flex-row justify-between items-center p-4">
        <p>Courses</p>
        <Link
          href="/Admin/courses/create"
          className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Create New Course
        </Link>
      </div>
      <Table className="w-full">
        <TableCaption>List of all courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.map((course: any) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                {new Date(course.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div>
                  <Link
                    href={`/Admin/courses/edit/${course.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
