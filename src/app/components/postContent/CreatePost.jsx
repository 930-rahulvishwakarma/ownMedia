"use client"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
function CreatePost({ post }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [tag, setTag] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const onSubmit = async (e) => {
    e.preventDefault();

    if (tag.length < 4 || caption.length < 4) {
      alert("caption and tag fields are required")
    } else {
      const postForm = new FormData();
      postForm.append('creatorId', post.creatorId)
      postForm.append('username', post.username)
      postForm.append('caption', caption)
      postForm.append('tag', tag)
      postForm.append('postPhoto', file)

      const response = await fetch(`api/post/upload`, {
        method: "POST",
        body: postForm,
      });

      if (response.status === 200) {
        router.push('/')
      }

    }


  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
    }
  };

  return (
    <form
      className="flex flex-col gap-7 pb-24"
      onSubmit={onSubmit}
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-light-1 cursor-pointer"
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="post"
            width={250}
            height={200}
            className="object-cover rounded-lg"
          />
        ) : (
          <>
          <AddPhotoAlternateIcon sx={{ fontSize: "100px", color: "white" }} />
          <h1>Upload the post</h1>
          </>
        )}
      </label>
      <input
        id="photo"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        required
      />

      <div>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          type="text"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full input"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required

        />


      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          type="text"
          placeholder="#tag"
          className="w-full input"
          required
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

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
