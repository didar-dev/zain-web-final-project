"use client";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type FormValues = {
  title: string;
  description: string;
  price?: number;
  image?: FileList;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const accessToken = Cookies.get("accessToken");
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    if (data.price) formdata.append("price", data.price.toString());
    if (data.image && data.image[0]) formdata.append("image", data.image[0]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/courses/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formdata,
      }
    );

    const result = await res.json();
    if (result?.success) {
      toast.success("Course created successfully!");
      reset();
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>

      <form className="space-y-4 max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div>
          <Input
            type="text"
            placeholder="Course Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Textarea
            placeholder="Course Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <Input
          type="number"
          placeholder="Course Price"
          {...register("price", { valueAsNumber: true })}
        />

        {/* Image */}
        <Input type="file" accept="image/*" {...register("image")} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
}
