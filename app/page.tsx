"use client";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[url('/bg-image.jpg')] bg-top bg-cover">
      <header className="flex justify-between items-center h-[90px] px-6">
        {/* <div className="rounded-3xl bg-white text-black px-3 py-2">Menu</div> */}
        <div className="rounded-3xl h-10 overflow-hidden">
          <img className=" w-[84px] px-5 bg-white" src="/logo.png" alt="" />
        </div>
        <Link
          href="#home"
          className="rounded-3xl bg-white text-black font-bold px-3 py-2 hover:bg-opacity-80"
        >
          Contact
        </Link>
      </header>

      <main className="grow">
        <div className="flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key}>
                  {({ selected }) => (
                    <span
                      className={selected ? "text-white" : "text-stone-600"}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full bg-stone-900 bg-opacity-80 max-w-[900px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel className="">All Photos</Tab.Panel>
              <Tab.Panel>Landscape pics</Tab.Panel>
              <Tab.Panel>Ocean pics</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="h-[60px] flex  justify-center items-center">
        <p>placeholder footer</p>
      </footer>
    </div>
  );
}
