"use client";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import classNames from "classnames";

import ocean1 from 'public/ocean-1.jpg'
import ocean2 from 'public/ocean-2.jpg'
import ocean3 from 'public/ocean-3.jpg'
import ocean4 from 'public/ocean-4.jpg'
import ocean5 from 'public/ocean-5.jpg'

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
const images = [];
export default function Home() {
  return (
    <div className="h-full bg-[url('/bg-image.jpg')] bg-top bg-cover overflow-auto">
      <header className="fixed top-0 w-full z-10 flex justify-between items-center h-[90px] px-6">
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

      <main className="pt-[110px]">
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
                  <Image src={ocean1} alt="ocean-1" className="my-4" />
                  <Image src={ocean2} alt="ocean-2" className="my-4" />
                  <Image src={ocean3} alt="ocean-3" className="my-4" />
                  <Image src={ocean4} alt="ocean-4" className="my-4" />
                  <Image src={ocean5} alt="ocean-5" className="my-4" />
                </Masonry>
              </Tab.Panel>
              <Tab.Panel>Landscape pics</Tab.Panel>
              <Tab.Panel>Ocean pics</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="h-[90px] uppercase text-lg flex justify-center items-center">
        <p>placeholder footer</p>
      </footer>
    </div>
  );
}
