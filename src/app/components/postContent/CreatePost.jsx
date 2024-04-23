"use client";
import { useForm } from "react-hook-form";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CreatePost({ post }) {
  const [image,setImage] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();

  console.log(watch("postPhoto"));


  const convertToBlob = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Blob([reader.result]));
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", data.creatorId);
      postForm.append("username", data.username);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);

      if (data.postPhoto) {
        const fileBlob = await convertToBlob(data.postPhoto[0]);
        postForm.append("postPhoto", fileBlob, data.postPhoto[0].name);
      }

      const response = await fetch(`api/post/upload`, {
        method: "POST",
        body: postForm,
      });

      if (response.status === 200) {
        router.push(`/`);
        console.log("posted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-7 pb-24"
      onSubmit={handleSubmit(handlePublish)}
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-light-1 cursor-pointer"
      >
        {watch("postPhoto") ? (
          // Check profile photo is a string or a file
          typeof watch("postPhoto") === "string" ? (
            <Image
              src={watch("postPhoto")}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          )
        ) : (
          typeof watch("postPhoto") === "undefined" && (
            <>
              <AddPhotoAlternateIcon
                sx={{ fontSize: "100px", color: "white" }}
              />
              <p>Upload a photo</p>
            </>
          )
        )}
      </label>
      <input
        {...register("postPhoto", 
        {
          validate: (value) => {
            if (
              typeof value === "null" ||
              (Array.isArray(value) && value.length === 0) ||
              value === "underfined"
            ) {
              return "A photo is required!";
            }
            return true;
          },
        })}
        id="photo"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />
      {errors.postPhoto && (
        <p className="text-red-500">{errors.postPhoto.message}</p>
      )}

      <div>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          type="text"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full input"
          id="caption"
        />

        {errors.caption && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full input"
        />

        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Publish
      </button>
    </form>
  );
}

export default CreatePost;
