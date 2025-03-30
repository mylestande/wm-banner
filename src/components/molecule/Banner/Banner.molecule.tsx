import React from "react";

import Image from "next/image";

const Banner: React.FC<BannerProps> = ({ formdata }) => {
  const { name, description, color, background, images } = formdata;
  return (
    <div
      className="w-full relative bg-white flex flex-row items-center justify-start shadow-md rounded-lg p-4 md:p-6 xl:px-8 overflow-clip gap-4 group"
      style={{ background: background }}
    >
      <div className="shrink-0 relative cursor-pointer size-16 md:size-20 xl:size-24 rounded-full overflow-hidden border border-gray-200">
        <Image
          src={images[0] ? URL.createObjectURL(images[0]) : "/image.png"}
          alt={name ?? "Image name"}
          width={400}
          height={400}
          className="object-cover w-full h-full rounded-full duration-200 scale-110 ease-in group-hover:scale-100 group-hover:blur-[1px] group-hover:brightness-75"
        />
        <figcaption className="line-clamp-2 text-center duration-200 ease-in opacity-0 text-white text-pretty font-bold  text-sm absolute top-1/2 translate-y-full left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:-translate-y-1/2">
          {name.slice(0, 13)}
        </figcaption>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1
          className="text-gray-800 font-semibold text-xl md:text-2xl xl:text-3xl"
          style={{ color: color }}
        >
          {name}
        </h1>
        <p
          className="text-gray-600 font-normal text-sm md:text-base"
          style={{ color: color }}
        >
          {description}
        </p>
      </div>
      <p className="absolute -bottom-12 -right-2 text-9xl font-black bg-clip-text text-transparent bg-gradient-to-br from-teal-400/20 to-yellow-200/20">
        {name.slice(0, 15)}
      </p>
    </div>
  );
};

export default Banner;

type BannerProps = {
  formdata: {
    name: string;
    description: string;
    images: File[];
    color: string;
    background: string;
  };
};
