"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from 'next/link'
import { SiGoogledocs } from "react-icons/si";

export default function Sidebar() {

    const { data: session } = useSession();
    const handleSignOut = () => {
        signOut(); // Call signOut function
        window.reload(); // Reload the page
      };

    return (
        <>
        <div
      class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
    >
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
          {/* <i class="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i> */}
          <SiGoogledocs size={24} className="text-blue-600"/>
          <h1 class="font-bold text-gray-200 text-[15px] ml-3">Notes Exchange</h1>
          <i
            class="bi bi-x cursor-pointer ml-28 lg:hidden"
            onclick="openSidebar()"
          ></i>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      {/* <div
        class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
      >
        <i class="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
        />
      </div> */}
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i class="bi bi-house-door-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i class="bi bi-bookmark-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Purchases</span>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onclick="dropdown()"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div class="flex justify-between w-full items-center">
          <Link href="/addTopic"><span class="text-[15px] ml-4 text-gray-200 font-bold">Sell Notes</span></Link>
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div class="my-4 bg-gray-600 h-[1px]"></div>
      {/* <div
        class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
        id="submenu"
      >
        <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Sell Notes
        </h1>
        <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Profile
        </h1>
        <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Friends
        </h1>
      </div> */}
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 text-white"
      >
      
        <i class="bi bi-box-arrow-in-right"></i>
        {session?<>
        <p class="text-[15px] ml-4 text-gray-200 font-bold">Welcome {session?.user?.name}!</p>
        {/* <span onClick={handleSignOut} class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span> */}
        </>:
        <span class="text-[15px] ml-4 text-gray-200 font-bold"></span>
        }
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
      >
      
        <i class="bi bi-box-arrow-in-right"></i>
        {session?<>
        {/* <p class="text-[15px] ml-4 text-gray-200 font-bold">Welcome {session?.user?.name}!</p> */}
        <span onClick={handleSignOut} class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span></>:
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Login</span>}
      </div>


      
    </div>
        </>
    )

}