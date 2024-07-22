import Image from "next/image";
import { Darkmode } from "@/components/darkmode";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="p-10 flex-col dark:bg-black bg-slate-100 space-y-5 ">
            <h1 className="text-5xl font-bold">
              Welcome to bacgPack
              <br />
              <br />
              Storing everything for you and your business needs here
            </h1>
            <p className="dark:text-slate-200 pb-20">
              Welcome to our cutting-edge data storage solution, tailored to meet both your personal and business needs. Our platform offers a secure, efficient, and user-friendly environment where you can store, manage, and access your data with ease. Whether you are looking to safeguard your personal files or streamline your business operations, our robust system ensures that your data is always protected and readily available. Experience the convenience and reliability of our services designed to keep your data at your fingertips.
            </p>
            <Link
              className="flex cursor-pointer bg-blue-600 p-5 w-fit"
              href={'/dashboard'}
            >
              try it for free!
              <ArrowRight className="ml-5" />
            </Link>
          </div>

        </div>
        <div>
          <h1>footer</h1>
        </div>
      </main>
    </>
  );
}
