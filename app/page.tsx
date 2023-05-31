"use client";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import classNames from "classnames";
import bgImage from "public/bg-image.jpg";
import ocean1 from "public/ocean-1.jpg";
import ocean2 from "public/ocean-2.jpg";
import ocean3 from "public/ocean-3.jpg";
import ocean4 from "public/ocean-4.jpg";
import ocean5 from "public/ocean-5.jpg";

import type { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lightGallery from "lightgallery";
import { useRef } from "react";

const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "oceans",
    display: "Ocenas",
  },
  {
    key: "forests",
    display: "Forests",
  },
];
const images = [ocean1, ocean2, ocean3, ocean4, ocean5];
export default function Home() {

  const lightboxRef = useRef<LightGallery | null>(null);
  return (
    <div className="h-full overflow-auto">
      <div className="fixed left-0 top-0 w-full h-full bg-gradient-to-t from-stone-900 z-10"></div>
      <Image
        className="fixed left-0 top-0 z-0"
        src={bgImage}
        alt="ocean-1"
        placeholder="blur"
      ></Image>

      <header className="fixed top-0 w-full z-30 flex justify-between items-center h-[90px] px-6">
        {/* <div className="rounded-3xl bg-white text-black px-3 py-2">Menu</div> */}
        <div className="rounded-3xl h-10 overflow-hidden">
          <img className=" w-[84px] px-5 bg-white" src="/logo.png" alt="" />
        </div>
        <Link
          href="#home"
          className="uppercase rounded-3xl bg-white text-black text-md px-3 py-2 hover:bg-opacity-80"
        >
          Contact
        </Link>
      </header>

      <main className="relative pt-[110px] z-20">
        <div className="flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12 ">
              {tabs.map((tab) => (
                <Tab key={tab.key}>
                  {({ selected }) => (
                    <span
                      className={classNames(
                        "uppercase text-lg",
                        selected ? "text-white" : "text-stone-600"
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full max-w-[900px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel className="">
                <Masonry
                  breakpointCols={2}
                  className="flex gap-4"
                  columnClassName="my-masonry-grid_column"
                >
                  {images.map((image, idx) => (
                    <Image
                      key={image.src}
                      src={image}
                      alt="ocean-1"
                      className="my-4 hover:opacity-90 cursor-pointer"
                      placeholder="blur"
                      onClick={() => {
                        lightboxRef.current?.openGallery(idx)
                      }}
                    ></Image>
                  ))}
                </Masonry>
                <LightGalleryComponent
                  onInit={(ref) => {
                    if(ref){
                      lightboxRef.current = ref.instance
                    }
                  }}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  dynamic
                  dynamicEl={images.map(image => ({
                    src: image.src,
                    thumb: image.src
                  }))}
                />
                
              </Tab.Panel>
              <Tab.Panel>Landscape pics</Tab.Panel>
              <Tab.Panel>Ocean pics</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="relative h-[90px] uppercase text-lg flex justify-center items-center z-20">
        <p>placeholder footer</p>
      </footer>
    </div>
  );
}
