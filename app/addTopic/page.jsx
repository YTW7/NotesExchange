"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice]=useState()
  const [userEmail, setUserEmail]=useState()
  const [userName, setUserName]=useState()
  const [drivelink, setDriveLink]=useState("")

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [driveLinkError, setDriveLinkError] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    // Set user state only if session exists
    if (session) {
      setUserEmail(session?.user?.email);
      setUserName(session?.user?.name);
      console.log(userEmail)
      console.log(userName)
    }
  }, [session, userEmail, userName]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!title.trim()) {
      setTitleError("Title is required.");
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required.");
      isValid = false;
    }
    if ( !price) {
      setPriceError("Price is required.");
      isValid = false;
    }
    if ( price<=0) {
      setPriceError("Price can't be negative or zero.");
      isValid = false;
    }
    if (!drivelink.trim()) {
      setDriveLinkError("Drive Link is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const res = await fetch("https://notes-exchange.vercel.app/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, price, userName, userEmail, drivelink }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {session?
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl">Post a Sell Ad</h1>
      <div>
        <span style={{marginRight:"4rem"}}>Title :</span>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="text"
        placeholder="Notes Title"
        style={{width:"75%"}}
      />
      {titleError && <div className="text-red-500">{titleError}</div>}
      </div>

      <div>
        <span style={{marginRight:"0.7rem"}}>Description :</span>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="text"
        placeholder="Notes Description(Course, Session, Semester )"
        style={{width:"75%"}}
      />
      {descriptionError && <div className="text-red-500">{descriptionError}</div>}
      </div>

      <div>
        <span style={{marginRight:"1.5rem"}}>Drive Link :</span>
      <input
        onChange={(e) => setDriveLink(e.target.value)}
        value={drivelink}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="text"
        placeholder="E.g. drive.com"
        style={{width:"75%"}}
      />
      {driveLinkError && <div className="text-red-500">{driveLinkError}</div>}
      </div>

      <div>
        <span style={{marginRight:"3.7rem"}}>Price :</span>
      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="number"
        placeholder="Notes Price"
        style={{width:"75%"}}
      />
      {priceError && <div className="text-red-500">{priceError}</div>}
      </div>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg"
      >
        Post Ad
      </button>
    </form>
    
    :

    <form  className="flex flex-col gap-3">
    Login First
  </form>
}
  </>
  );
}