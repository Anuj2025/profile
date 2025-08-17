import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePanel } from "../../provider/PanelProvider";

const wrapWords = (text, idx) =>
  text.split(" ").map((w, i) => (
    <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
      <span
        className={`word word-${idx}`}
        style={{ display: "inline-block", transform: "translateY(110%)" }}
      >
        {w}&nbsp;
      </span>
    </span>
  ));

const Panel = () => {
  const { isOpen, setIsOpen } = usePanel();
  const DivRef = useRef(null);

  useLayoutEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".word",
        { y: "0%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
        }
      );
    }
  }, [isOpen]);

  useLayoutEffect(() => {
  if (!isOpen.open) return;

  let ctx = gsap.context(() => {
    gsap.fromTo(
      ".Div",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
      }
    );
  }, DivRef);

  return () => ctx.revert(); 
}, [isOpen]);

  return (
    <div ref={DivRef} className="Div m-3">
      {isOpen.open && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/70">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-800/30 backdrop-blur-md sm:p-5">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isOpen.data.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                ✖
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 duration-300 ease-in">
              {isOpen.data.collection.map((d, idx) => (
                <div key={idx}>
                  <h1 className="text-white font-bold word">
                    {d.title ? d.title : "Title Undefined"}
                  </h1>

                  {d.discription && (
                    <p className="text-white p-2 border m-1 rounded-lg border-blue-300/30">
                      {wrapWords(d.discription, idx)}
                    </p>
                  )}

                  {d.embleds && (
                    <div className="flex">
                      {d.embleds.map((e, i) => (
                        <a
                          key={i}
                          href={e.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="m-1 bg-black/30 backdrop-blur-md w-auto p-1 rounded-lg duration-200 ease-in"
                        >
                          <e.icon className="word" color={e.color} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;
