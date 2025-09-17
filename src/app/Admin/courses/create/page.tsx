"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export default function page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(undefined as number | undefined);
  const [image, setImage] = useState<File | null>(null);

  const CreateCourseHandler = async () => {
    const accessToken = Cookies.get("accessToken");
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    if (price) formdata.append("price", price.toString());
    if (image) formdata.append("image", image);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formdata,
      }
    );
    const data = await res.json();
    if (data?.success) {
      alert("Course created successfully");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form
        className="space-y-4 max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          CreateCourseHandler();
        }}
      >
        <Input
          type="text"
          value={title}
          placeholder="Course Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          value={price}
          placeholder="Course Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Input
          type="file"
          value={""}
          placeholder="Course Image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
        <Button type="submit">Create Course</Button>
      </form>
    </div>
  );
}
