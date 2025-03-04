"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./context";
import Image from "next/image";
import Cookies from "js-cookie";
import { category } from "../helpers/categoryData";
import slugify from "slugify";

const NavMenu = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [drop1, setdrop1] = useState(false);
  const [drop2, setdrop2] = useState(false);

  let menuClose = () => setisMenuOpen(false);
  let { userInfo, setUserInfo, setToken } = useAuth();
  let router = useRouter();
  let path = usePathname();

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
            <li className=" border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
              <Link
                // className={"bg-amber-500"}
                className={path === "/" ? "underline text-lg" : ""}
                onClick={menuClose}
                href={"/"}
              >
                Home
              </Link>
            </li>
            <li className=" border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
              <Link onClick={menuClose} href={"/contact"}>
                Contact
              </Link>
            </li>

            <li
              onClick={() => setdrop1(!drop1)}
              className=" relative group  border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all"
            >
              <Link href={"#"}>
                <span className=" flex justify-center gap-2">
                  dropdown
                  <IoIosArrowDown
                    className={`mt-1 ${drop1 ? "rotate-180" : ""}`}
                  />{" "}
                </span>
              </Link>
              <ul
                className={`absolute top-full z-20  md:right-0 bg-zinc-300 w-full md:w-fit whitespace-nowrap origin-top duration-300 ${
                  drop1 ? "scale-y-100" : "scale-y-0"
                }`}
              >
                <li className=" hover:bg-zinc-400">
                  <Link
                    className="p-2 inline-block"
                    onClick={menuClose}
                    href={"/about"}
                  >
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
            <li className=" border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
              <Link onClick={menuClose} href={"/about"}>
                About
              </Link>
            </li>
            <li
              onClick={() => setdrop2(!drop2)}
              className=" relative group  border-b-1 border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all"
            >
              <Link href={"#"}>
                <span className=" flex justify-center gap-2">
                  dropdown2
                  <IoIosArrowDown
                    className={`mt-1 ${drop2 ? "rotate-180" : ""}`}
                  />{" "}
                </span>
              </Link>
              <ul
                className={`absolute top-full z-20  md:right-0 bg-zinc-300 w-full md:w-fit whitespace-nowrap origin-top duration-300 ${
                  drop2 ? "scale-y-100" : "scale-y-0"
                }`}
              >
                <li className=" hover:bg-zinc-400">
                  <Link
                    className="p-2 inline-block"
                    onClick={menuClose}
                    href={"/about"}
                  >
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
