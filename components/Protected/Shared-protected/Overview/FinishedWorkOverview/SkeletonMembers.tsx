import React from "react";

export function SkeletonMembers() {
  const array = Array.from({ length: 3 }, (_, index) => index);
  return (
    <>
      {array.map((item, index) => (
        <div
          className="animate-pulse bg-gray-500 rounded-md  w-full h-11"
          key={index}
        ></div>
      ))}
    </>
  );
}
