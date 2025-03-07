"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SubmitButton from "./SubmitButton";
import { useFormStatus } from "react-dom";

const Pagination = ({ page, perPage, totalPage, spms1, spms1Value = "" }) => {
  let router = useRouter();
  let path = usePathname();
  let { pending } = useFormStatus();
  // let searchParams = useSearchParams();
  // let page = searchParams.get("page") ?? "1";
  //   let perPage = searchParams.get("perPage") ?? "3";
  let pageArr = Array.from({ length: totalPage }, (v, i) => i + 1);

  return (
    <div>
      <button
        disabled={page <= 1}
        onClick={() => {
          router.push(
            `${path}?${spms1}=${spms1Value}&page=${page - 1}&perPage=${perPage}`
          );
        }}
        className="btn btn-accent"
      >
        Previous
      </button>
      <span className={page <= 11 ? "hidden" : ""}>
        <button
          className="btn"
          onClick={() => {
            router.push(
              `${path}?${spms1}=${spms1Value}&page=1&perPage=${perPage}`
            );
          }}
        >
          1
        </button>
        ......
      </span>
      {pageArr.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            router.push(
              `${path}?${spms1}=${spms1Value}&page=${item}&perPage=${perPage}`
            );
          }}
          // className={item==page?'my-3 btn btn-primary':'btn'}
          className={
            item < page - 10 || item > page + 10
              ? "hidden"
              : item == page
              ? "my-3 btn btn-primary"
              : "btn"
          }
        >
          {item}
        </button>
      ))}
      <span className={page >= totalPage - 10 ? "hidden" : ""}>
        ......{" "}
        <button
          className="btn"
          onClick={() => {
            router.push(`${path}?page=${totalPage}&perPage=${perPage}`);
          }}
        >
          {" "}
          {totalPage}{" "}
        </button>
      </span>
      <button
        disabled={page >= totalPage}
        onClick={() => {
          router.push(
            `${path}?${spms1}=${spms1Value}&page=${page + 1}&perPage=${perPage}`
          );
        }}
        className="btn btn-accent"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
