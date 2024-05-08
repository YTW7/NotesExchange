"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function EditTopicForm({ id, title, description, price, drivelink }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newDriveLink, setNewDriveLink] = useState(drivelink);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [driveLinkError, setDriveLinkError] = useState("");

  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!newTitle.trim()) {
      setTitleError("*Title is required.");
      isValid = false;
    }
    if (!newDescription.trim()) {
      setDescriptionError("*Description is required.");
      isValid = false;
    }
    if ( !newPrice) {
      setPriceError("*Price is required.");
      isValid = false;
    }
    if ( newPrice<=0) {
      setPriceError("*Price can't be negative or zero.");
      isValid = false;
    }
    if (!newDriveLink) {
      setDriveLinkError("*Drive Link is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const res = await fetch(`https://notes-exchange.vercel.app/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newPrice, newDriveLink }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      // router.push("/");
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    <h1 className="font-bold text-2xl">Edit your Sell Ad</h1>
    <div>
        <span style={{marginRight:"4rem"}}>Title :</span>
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
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
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="text"
        placeholder="Notes Description(Course, Session, Semester)"
        style={{width:"75%"}}
      />
            {descriptionError && <div className="text-red-500">{descriptionError}</div>}
      </div>


      <div>
        <span style={{marginRight:"1.5rem"}}>Drive Link :</span>
      <input
        onChange={(e) => setNewDriveLink(e.target.value)}
        value={newDriveLink}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="text"
        placeholder="Drive Link"
        style={{width:"75%"}}
      />
      {driveLinkError && <div className="text-red-500">{driveLinkError}</div>}
      </div>
      
      <div>
        <span style={{marginRight:"3.7rem"}}>Price :</span>
      <input
        onChange={(e) => setNewPrice(e.target.value)}
        value={newPrice}
        className="border border-slate-500 px-8 py-2 rounded-lg"
        type="number"
        placeholder="Notes Price"
        style={{width:"75%"}}
      />
      {priceError && <div className="text-red-500">{priceError}</div>}
      </div>


      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg">
        Update Topic
      </button>
    </form>
  );
}
