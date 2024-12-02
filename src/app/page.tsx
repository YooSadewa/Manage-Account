import React from "react";
import { Carousel } from "flowbite-react";

export default function Home() {
  return (
    <div className="pt-[96px]">
      <div className="h-[620px] px-8">
        <Carousel>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img
              src="/carousel/Webslider.webp"
              alt="slider 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img
              src="/carousel/canteen.png"
              alt="slider 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img
              src="/carousel/image3.png"
              alt="slider 3"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img
              src="/carousel/image.png"
              alt="slider 4"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img
              src="/carousel/image2.png"
              alt="slider 5"
              className="h-full w-full object-cover"
            />
          </div>
        </Carousel>
      </div>
      <div className="lg:px-8 my-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          Universitas Internasional Batam
        </h2>
        <p className="mt-2 text-center w-full text-balance text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Welcome Admin to the manage account website
        </p>
      </div>
    </div>
  );
}
