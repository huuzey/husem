import React, { useState } from "react";
import Satisfaction from "./Satisfaction";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "./../locales/en/translation.json";
import tAR from "./../locales/AR/translation.json";
import { Link, useNavigate } from "react-router-dom";
import Medium from "./Medium";
import axios from "axios";
import { BASE_URL } from "./Ui";

i18n
  .use(initReactI18next)
  // .use(LanguageDetector) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: tEn,
      },
      AR: {
        translation: tAR,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const Home = () => {
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [satisfy, setsatisfy] = useState("");
  const [service, setservice] = useState("");
  const [diff, setdiff] = useState("");
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const path = pathname.split("/");
  const url = path[1];

  const submiteval = async () => {
    if (satisfy && weaknesses && suggestion && service && diff && url) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          satisfy,
          weaknesses,
          suggestion,
          service,
          diff,
          url,
        }),
      };
      try {
        const resp = await fetch(`${BASE_URL}/client/eval`, requestOptions);
        const datas = await resp.json();
        navigate("/thank");
        console.log(datas);
      } catch (error) {
        console.log("caught", error);
      }
    }
  };

  return (
    <div>
      <div className="flex lg:hidden">
        <Medium />
      </div>
      <div className="lg:flex hidden justify-between gap-4 w-full flex-col  xs:mb-24 md:mb-0">
        {/* welcome */}
        <div className="flex flex-row gap-0 w-full relative pb-4">
          {/* sidebar */}
          <div className="bg-[#32a8a4] w-9  -mb-11"></div>

          <div className="flex flex-col w-full relative">
            {/* language  start*/}
            <div className="flex flex-row pl-4 gap-2 w-full mt-4  ">
              <h1 className="text-black font-bold text-2xl">{t("lang")}</h1>
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
                className="border-[3.5px]  text-xl px-2 hover:bg-[#32a8a4] hover:scale-105  border-[#32a8a4] h-11 rounded-2xl w-20 flex items-center justify-center"
              >
                Eng
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("AR");
                }}
                className="border-[3.5px] text-xl px-2 hover:bg-[#32a8a4] hover:scale-105 border-[#32a8a4] h-11 rounded-2xl w-20 flex items-center justify-center"
              >
                عربي
              </button>
              {/* {!url && (
                  <a
                    href="/form"
                    className="border-[3.5px] text-xl px-2 hover:bg-[#32a8a4] hover:scale-105 border-[#32a8a4] h-11 rounded-2xl w-20 flex items-center justify-center"
                  >
                    Form
                  </a>
                )} */}
            </div>
            {/* language end*/}
            {/* welcome start*/}
            <div
              className={` ${
                i18n.language === "AR" ? "mb-10" : ""
              } my-2 flex flex-row justify-around items-center`}
            >
              <img
                src="./assets/viv.png"
                alt="welcome "
                className={`h-1/2 aspect-[4/5] ${
                  i18n.language === "AR" ? " " : ""
                }     rounded-2xl`}
              />
              <p className="font-bold text-4xl  ">
                {t("welcome")}
                <span className=" ">
                  <br className=" " />
                  {t("satis")}
                </span>
              </p>
            </div>
            {/* welcome end*/}
            {/* <div className="flex flex-col gap-12 w-1/2 mt-8">
              <div className=" ">
                <div>
                  <img
                    src="./assets/pic2.png"
                    alt="welcome "
                    className={` ${
                      i18n.language === "AR"
                        ? "w-full h-full"
                        : "w-[80%] h-[280px]"
                    }      rounded-2xl mt-40`}
                  />
                </div>
              </div>
            </div> */}
            {/* seeting */}
            {/* desc start */}
            {/* arb desc start */}
            {i18n.language === "AR" && (
              <div className="flex flex-row justify-center items-center">
                <div>
                  {/* pic2 medium */}
                  <div
                    className={`flex ${
                      i18n.language === "AR" ? "flex" : "hidden"
                    } `}
                  >
                    <img
                      src="./assets/pic2.png"
                      alt="welcome "
                      className={` ${
                        i18n.language === "AR"
                          ? "flex w-full h-full "
                          : "hidden"
                      }      rounded-2xl mt-4`}
                    />
                  </div>
                </div>
                <div>
                  {i18n.language === "AR" && (
                    <>
                      {" "}
                      <div className="mt-1   w-[100%] h-[100%]  flex flex-col items-center justify-center">
                        <img
                          src="./assets/ARB.png"
                          alt="arabic description"
                          className="w-[100%] h-[100%] object-fill"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {/* eng desc start */}
            {i18n.language === "en" && (
              <div className="flex flex-row justify-center items-center">
                <div>
                  {i18n.language === "en" && (
                    <>
                      {" "}
                      <div className="mt-1   w-[100%] h-[100%]  flex flex-col items-start justify-start">
                        <img
                          src="./assets/mob desc.png"
                          alt="arabic description"
                          className="w-[100%] h-[100%] object-fill"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {/* pic2 medium */}
                  <div
                    className={` ${i18n.language === "AR" ? "hidden" : ""} `}
                  >
                    <img
                      src="./assets/pic2.png"
                      alt="welcome "
                      className={` ${
                        i18n.language === "AR" ? "hidden" : "flex w-full h-full"
                      }      rounded-2xl mt-4`}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* desc end */}
          </div>
        </div>
        {/* circle */}
        <div className="flex flex-col justify-center items-center relative    ">
          {i18n.language === "en" ? (
            <>
              <img
                src="../assets/eng circl.png"
                alt="circle"
                className="w-1/10 h-1/10  object-cover"
              />
            </>
          ) : (
            <>
              <img
                src="../assets/circl arb.png"
                alt="circle"
                className="w-1/10 h-1/10  object-cover"
              />
            </>
          )}
        </div>
        <div className="flex flex-row w-full mt-10  ">
          {/* inputs */}

          <div className="flex flex-col w-full pl-8 mt-16">
            {/* input 1 */}
            <div className="flex flex-col mr-3 ">
              <p className="text-black font-semibold text-lg">
                {i18n.language === "AR" ? (
                  <div className="flex flex-row">
                    <p> ما مدى رضاك عن خدماتنا؟</p>
                    <p>.1</p>
                  </div>
                ) : (
                  <>
                    {t("one")} {t("satisfied")}
                  </>
                )}
              </p>
              <div className=" grid-cols-4 grid gap-2 mt-2 items-start justify-start h-fit   w-[100%]">
                <Satisfaction
                  pic="./assets/sat very.png"
                  title={t("t9")}
                  fun={setsatisfy}
                  value="verysatisfied"
                  back={satisfy === "verysatisfied"}
                />
                <Satisfaction
                  back={satisfy === "satisfied"}
                  fun={setsatisfy}
                  value="satisfied"
                  pic="./assets/sat.png"
                  title={i18n.language === "AR" ? " راضٍ " : "Satisfied"}
                />
                <Satisfaction
                  pic="./assets/dis.png"
                  title={t("t2")}
                  fun={setsatisfy}
                  value="dissatisfied"
                  back={satisfy === "dissatisfied"}
                />
                <Satisfaction
                  pic="./assets/very disat.png"
                  title={t("t3")}
                  fun={setsatisfy}
                  value="verydissatisfied"
                  back={satisfy === "verydissatisfied"}
                />
              </div>
            </div>
            {/* input 2 */}

            <div className="flex flex-col">
              <p className="text-black font-semibold text-lg">
                {i18n.language === "AR" ? (
                  <div className="flex flex-row">
                    <p> ما هي الخدمات التي تستخدمها ؟ </p>
                    <p>.2</p>
                  </div>
                ) : (
                  <>{t("which")}</>
                )}
              </p>{" "}
              <div className="flex flex-row justify-around gap-2 mt-2 items-center w-[70%]">
                <Satisfaction
                  pic="./assets/crm.png"
                  title={t("t4")}
                  fun={setservice}
                  value="crm"
                  back={service === "crm"}
                />
                <Satisfaction
                  pic="./assets/call.png"
                  title={t("t5")}
                  fun={setservice}
                  value="call"
                  back={service === "call"}
                />
                <Satisfaction
                  pic="./assets/chat.png"
                  title={t("t6")}
                  fun={setservice}
                  value="chat"
                  back={service === "chat"}
                />
              </div>
            </div>
            {/* input 3 */}

            <div className="flex flex-col">
              {" "}
              <p className="text-black font-semibold text-lg">
                {i18n.language === "AR" ? (
                  <div className="flex flex-row">
                    <p>هل تواجه أي صعوبات في استخدام خدماتنا؟</p>
                    <p>.3</p>
                  </div>
                ) : (
                  <>{t("diffic")}</>
                )}
              </p>
              <div className="flex flex-row justify-around gap-2 mt-2 items-center w-[40%]">
                <Satisfaction
                  pic="./assets/yes.png"
                  title={t("t7")}
                  fun={setdiff}
                  value="yes"
                  back={diff === "yes"}
                />
                <Satisfaction
                  pic="./assets/no.png"
                  title={t("t8")}
                  fun={setdiff}
                  value="no"
                  back={diff === "no"}
                />
              </div>
            </div>
          </div>
          {/* image */}
          <div className="w-full ">
            <img
              src="./assets/pic1.png"
              alt="welcome "
              className="w-[90%]  md:h-[280px]    rounded-2xl mt-40"
            />
          </div>
          {/* sidebar */}
          <div className="bg-[#32a8a4] w-20 ml-8 -mb-11"></div>
        </div>

        {/* circle */}
        <div className="flex flex-col justify-center items-center relative     ">
          <div className="flex flex-col justify-center items-center relative    ">
            {i18n.language === "en" ? (
              <>
                <img
                  src="../assets/eng circl.png"
                  alt="circle"
                  className="w-1/10 h-1/10  object-cover"
                />
              </>
            ) : (
              <>
                <img
                  src="../assets/circl arb.png"
                  alt="circle"
                  className="w-1/10 h-1/10  object-cover"
                />
              </>
            )}
          </div>{" "}
        </div>
        {/* suggestion */}
        <div className="flex flex-row w-full gap-3">
          <div className="w-full ml-8 sm:flex md:hidden">
            <img
              src="./assets/pic3.png"
              alt="welcome "
              className="w-[85%] h-[280px]    rounded-2xl mt-40"
            />
          </div>
          {/* sidebar */}
          <div className="bg-[#32a8a4] w-20  -mb-11"></div>
          {/* image */}
          <div className="w-full ml-8 sm:hidden md:flex">
            <img
              src="./assets/pic3.png"
              alt="welcome "
              className="w-[85%] h-[280px]    rounded-2xl mt-40"
            />
          </div>
          {/* suggestion */}
          <div className="flex flex-col mr-20 w-full mt-28  ">
            <p className="text-black font-semibold text-lg mb-7">
              {i18n.language === "AR" ? (
                <div className="flex flex-row">
                  <p> ما هي الاقتراحات التي لديك لتحسين خدماتنا؟ </p>
                  <p>.4</p>
                </div>
              ) : (
                <>{t("suggest")}</>
              )}
            </p>
            <textarea
              type="text"
              value={suggestion}
              onChange={(e) => {
                setSuggestion(e.target.value);
              }}
              className="border-4 w-full mr-2 border-[#32a8a4] py-12 px-8 rounded-3xl text-[#32a8a4] "
            />
            <p className="text-black font-semibold text-lg mb-7">
              {i18n.language === "AR" ? (
                <div className="flex flex-row">
                  <p> ما هي نقاط الضعف التي تلاحظها في خدماتنا؟ </p>
                  <p>.5</p>
                </div>
              ) : (
                <>{t("weak")}</>
              )}
            </p>{" "}
            <textarea
              type="text"
              value={weaknesses}
              onChange={(e) => {
                setWeaknesses(e.target.value);
              }}
              className="border-4 w-full mr-2 border-[#32a8a4] py-12 px-8 rounded-3xl text-[#32a8a4] "
            />
            <button
              onClick={submiteval}
              className="text-black border-2 w-1/2 mt-5 py-4  md:px-0 text-lg font-bold  border-black bg-[#32a8a4]  flex justify-center items-center rounded-full"
            >
              {t("submit")}
            </button>
          </div>
        </div>

        <div className="last md:hidden">
          <img
            src="./assets/pic3.png"
            alt="welcome "
            className="w-[85%] h-[280px]    rounded-2xl "
          />
        </div>

        {/* <div className="flex items-center flex-col justify-center  ">
          <div className="w-4 h-4 rounded-full border-4 border-[#32a8a4]"></div>
          <div className="w-1 h-56  bg-[#32a8a4]"></div>
          <div className="w-full bg-[#0f080a] h-16 mt-0 "></div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
