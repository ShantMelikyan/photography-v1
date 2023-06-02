"use client";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import classNames from "classnames";

import * as nodeFetch from "node-fetch";
import bgImage from "public/bg-image.jpg";

import type { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lightGallery from "lightgallery";
import React, { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import { createApi } from "unsplash-js";

type Photo = {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
};

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

type HomeProps = {
  oceans: Photo[];
  forests: Photo[];
};

async function getData() {
  console.log("hello");

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch.default as unknown as typeof fetch,
  });
  const oceans = await unsplash.search.getPhotos({
    query: "oceans",
  });

  const forests = await unsplash.search.getPhotos({
    query: "forests",
  });

  const mappedOcenas: Photo[] = [];
  const mappedForests: Photo[] = [];
  if (oceans.type === "success") {
    const oceanArr = oceans.response.results.map((ocean) => ({
      src: ocean.urls.full,
      thumb: ocean.urls.thumb,
      width: ocean.width,
      height: ocean.height,
      alt: ocean.alt_description ?? "ocean-image",
      blur: ocean.blur_hash
    }));
    mappedOcenas.push(...oceanArr);
  } else {
    console.log("could not get ocean photos");
  }

  if (forests.type === "success") {
    const forestsArr = forests.response.results.map((forest) => ({
      src: forest.urls.full,
      thumb: forest.urls.thumb,
      width: forest.width,
      height: forest.height,
      alt: forest.alt_description ?? "forest-image",
    }));
    mappedForests.push(...forestsArr);
  } else {
    console.log("could not get ocean photos");
  }

  return {
    props: {
      oceans: mappedOcenas,
      forests: mappedForests,
    },
  };
}

export default function Home() {
  const [oceans, setOceans] = useState<Photo[]>([]);
  const [forests, setForests] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const { oceans, forests } = data.props;
        setOceans(oceans);
        setForests(forests);
      } catch (error) {
        // Handle any errors that occur during the data retrieval
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
                <Gallery photos={[...oceans, ...forests]} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={oceans} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={forests} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className="relative h-[90px] text-sm flex justify-center items-center z-20">
        <p>Shant Melikyan ©</p>
      </footer>
    </div>
  );
}

type GalleryProps = {
  photos: Photo[];
};
function Gallery({ photos }: GalleryProps) {
  const lightboxRef = useRef<LightGallery | null>(null);

  return (
    <>
      <Masonry breakpointCols={2} className="flex gap-4" columnClassName="">
        {photos.map((photo, idx) => (
          <Image
            key={photo.src}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            className="my-4 hover:opacity-90 cursor-pointer"
            // placeholder="blur"
            
            onClick={() => {
              lightboxRef.current?.openGallery(idx);
            }}
          ></Image>
        ))}
      </Masonry>
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightboxRef.current = ref.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.src,
        }))}
      />
    </>
  );
}
