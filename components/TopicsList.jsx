
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { SiGoogledocs } from "react-icons/si";

const getTopics = async () => {
  try {
    const res = await fetch("https://notes-exchange.vercel.app/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList({ user }) {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex gap-5 items-start rounded-lg"
        >
          <div className="icon-column">
            <SiGoogledocs size={100} />
          </div>

          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
            <div>Selling for: ₹{t.price}</div>
            <div>Posted By <b>{t.userName}</b></div>
            {/* <button onClick={() => checkout(quantity, itemPrice, itemName)}>Buy</button> */}
            <Link href={`/purchase/${t._id}`} >
              <p className="inline-block px-3  rounded-lg text-white font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700">BUY</p>
            </Link>
          </div>

         { (user===t.userName)?<div className="flex gap-2" style={{marginLeft:"15rem"}}>
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>:""}
        </div>
      ))}
    </>
  );
}