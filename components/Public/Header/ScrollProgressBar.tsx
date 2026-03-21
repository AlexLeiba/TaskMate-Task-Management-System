import React, { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
      const scrollY = window.scrollY;

      if (scrollY > 10) {
        const viewportHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolledPercentage = (scrollY / viewportHeight) * 100;
        return setProgress(scrolledPercentage);
      }
      setProgress(0);
    }

    return () => document.removeEventListener("scroll", handleScroll);
  });
  return (
    <div
      style={{ width: `${progress}%` }}
      className="h-px  bg-yellow-500 absolute left-0 bottom-0"
    ></div>
  );
}
