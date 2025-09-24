import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const GetRecentCategorieAndCourses = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/recent-courses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (data?.success) {
      return data?.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export default async function Categories() {
  const categories = await GetRecentCategorieAndCourses();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      {categories?.map((category: any) => (
        <div className="" key={category.id}>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {category.name}
          </h1>
          <div>
            {category?.courses?.length === 0 ? (
              <p className="text-gray-600">No courses available.</p>
            ) : (
              <div className="flex flex-row items-center gap-4 overflow-x-auto">
                {category?.courses?.map((course: any) => (
                  <Card
                    key={course.id}
                    className="mb-4 !p-0 min-w-[250px] w-[250px]"
                  >
                    <CardHeader className="!p-0">
                      <Image
                        src={course?.image || "/placeholder.png"}
                        alt={course.title}
                        width={400}
                        height={200}
                        className="rounded-t-lg object-cover h-48 w-full"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg font-semibold">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {course.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
