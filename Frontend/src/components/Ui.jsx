import React, { useState } from "react";
import Input from "./Input";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export const BASE_URL = "https://hussem-ykxe.vercel.app";
export const FRONT_URL = "https://hussem.vercel.app";
const Ui = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [project, setproject] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [status, setstatus] = useState("");
  const [unique, setunique] = useState("");
  const [copied, setcopied] = useState(false);
  const pathname = window.location.pathname;
  const path = pathname.split("/");
  const url = path[2];

  const submission = async () => {
    if (name && company && project && email && phone) {
      try {
        const resp = await axios.post(`${BASE_URL}/form/create`, {
          name,
          company,
          project,
          email,
          phone,
          url,
        });
        if (resp.status === 201) {
          setstatus(resp.status);
          setunique(resp.data._id);
          setCompany("");
          setphone("");
          setName("");
          setemail("");
          setproject("");
        }
        if (resp.status === 204) {
          setstatus(resp.status);
        }

        console.log("response", resp.status, resp.data);
      } catch (error) {
        console.log("caught", error);
      }
    }
  };
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      setcopied(true);
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <a
        className=" mt-3 border-[3.5px] text-xl px-2 hover:bg-[#32a8a4] hover:scale-105 border-[#32a8a4] h-11 rounded-2xl w-20 flex items-center justify-center"
        href="/"
      >
        Home
      </a>
      <div className=" shadow-2xl shadow-[#32a8a4] flex w-full flex-col gap-3  py-8 items-center justify-center">
        <Input type="text" placehold="Enter name" value={name} fun={setName} />
        <Input
          type="text"
          placehold="Enter company name"
          value={company}
          fun={setCompany}
        />
        <Input
          type="text"
          placehold="Enter project id"
          value={project}
          fun={setproject}
        />
        <Input
          type="email"
          placehold="Enter email"
          value={email}
          fun={setemail}
        />
        <Input
          type="phone"
          placehold="Enter phone"
          value={phone}
          fun={setphone}
        />
        <button
          onClick={submission}
          className="text-black border-2 w-1/4 mt-5 py-4 hover:bg-[#05f0c9]  md:px-0 text-lg font-bold  border-black bg-[#32a8a4]  flex justify-center items-center rounded-full"
        >
          Submit
        </button>
        {status === 201 && !url && (
          <div className="flex flex-col items-center justify-center ">
            <p className="text-black border-2 border-black text-xs sm:text-base rounded-3xl px-2 py-1">
              {" "}
              {FRONT_URL}/{unique}{" "}
            </p>
            <button
              onClick={() => {
                copyTextToClipboard(`${FRONT_URL}/${unique}`);
              }}
              className={` ${
                copied ? "bg-[#05e644]" : ""
              }  text-black border-2 w-1/4 mt-5 py-4 hover:bg-[#05f0c9]  md:px-0 text-lg font-bold  border-black bg-[#32a8a4]  flex justify-center items-center rounded-full`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
        {status === 201 && url && (
          <div className="flex flex-col items-center justify-center ">
            <p className="text-black border-2 border-black text-xs sm:text-base rounded-3xl px-2 py-1">
              Submitted successfuly
            </p>
          </div>
        )}
        {status === 204 && (
          <p className="text-red-500 border-2 border-black text-xs sm:text-base rounded-3xl px-2 py-1">
            {" "}
            Url already Used!
          </p>
        )}
      </div>
    </div>
  );
};

export default Ui;
