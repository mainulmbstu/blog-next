"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

const NavMenu = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  let menuClose = () => setisMenuOpen(false);

  return (
    <div className="fixed top-0 w-full z-10 shadow-lg flex  justify-between md:items-center p-4  bg-zinc-200">
      <div className="">logo</div>
      <div
        className={`h-6  transition-all  duration-500 ${
          isMenuOpen ? "h-60 flex-1" : ""
        }`}
      >
        <nav className=" relative">
          <ul
            className={`${
              isMenuOpen
                ? "flex flex-col scale-y-100 pt-12 text-center transition-all  duration-500"
                : "scale-y-0"
            } md:flex md:gap-4 md:scale-y-100`}
          >
            <li className=" border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 hover:inset-shadow-indigo-300 transition-all">
              <Link onClick={menuClose} href={"/"}>
                Home
              </Link>
            </li>
            <li className=" border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 hover:inset-shadow-indigo-300 transition-all">
              <Link onClick={menuClose} href={"/contact"}>
                Contact
              </Link>
            </li>

            <li className=" relative group  border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 hover:inset-shadow-indigo-300 transition-all">
              <Link href={"#"}>
                <span className="group flex justify-center gap-1">
                  dropdown
                  <IoIosArrowDown
                    className={" mt-1 group-hover:rotate-180"}
                  />{" "}
                </span>
              </Link>
              <ul
                className="absolute top-full  md:right-0 bg-zinc-300 w-full whitespace-nowrap scale-y-0 group-hover:scale-y-100 origin-top duration-300"
                // className={
                //   isSubMenu
                //     ? "absolute top-9 md:right-0 bg-amber-300 w-fit whitespace-nowrap"
                //     : "hidden"
                // }
              >
                <li className="p-2 hover:bg-zinc-400">
                  <Link onClick={menuClose} href={"/about"}>
                    sub1 game and
                  </Link>
                </li>
                <li className="p-2 hover:bg-zinc-400">
                  <Link onClick={menuClose} href={"/about"}>
                    sub2
                  </Link>
                </li>
              </ul>
            </li>
            <li className=" border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 hover:inset-shadow-indigo-300 transition-all">
              <Link onClick={menuClose} href={"/about"}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="md:hidden cursor-pointer">
        <span onClick={() => setisMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <CgCloseR className=" hover:scale-125 transition-all text-2xl " />
          ) : (
            <FaBars className=" hover:scale-125 transition-all text-2xl " />
          )}
        </span>
      </div>
    </div>
  );
};

export default NavMenu;
