import Link from "next/link";
import React from "react";

///TODO , fetch courses and display them 

export default function page() {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center p-4">
        <p>Courses</p>
        <Link
          href="/Admin/courses/create"
          className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Create New Course
        </Link>
      </div>
    </div>
  );
}
