import React, { useState } from "react";
import Satisfaction from "./Medsat";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "./../locales/en/translation.json";
import tAR from "./../locales/AR/translation.json";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./Ui";
import axios from "axios";

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
    lng: "AR", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const Medium = () => {
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
      <div className="flex  justify-between gap-4 h-screen w-screen flex-col overflow-x-hidden   xs:mb-24 md:mb-0">
        {/* welcome */}
        <div className="flex flex-row  gap-0 w-screen  relative pb-4">
          {/* sidebar */}
          <div className="bg-[#32a8a4] w-7 mr-0 -mb-11"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full relative overflow-x-hidden">
            {/* language */}
            <div className="flex flex-col gap-2 w-1/2 mt-8 ml-2">
              <div className="flex flex-row  gap-2 w-full  ">
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
              </div>

              <div className=" ">
                <div className="hidden ">
                  <img
                    src="./assets/pic2.png"
                    alt="welcome "
                    className={` ${
                      i18n.language === "AR"
                        ? "w-full h-full"
                        : "w-[80%] h-[180px]"
                    }      rounded-2xl mt-40`}
                  />
                </div>
              </div>
            </div>
            {/* seeting */}
            <div
              className={`hidden  flex-col mt-2  ${
                i18n.language === "AR" ? "w-full" : "w-1/2"
              }`}
            >
              <div
                className={` ${
                  i18n.language === "AR" ? "" : "justify-end items-end"
                }  flex flex-row  gap-x-4 mt-5`}
              >
                {" "}
                <img
                  src="./assets/viv.png"
                  alt="welcome "
                  className={`w-[20%] h-[80px] ${
                    i18n.language === "AR" ? "mt-2 " : ""
                  }     rounded-2xl  mt-14`}
                />
                <p className="font-bold text-base w-full  mt-8  ">
                  {t("welcome")}
                  {t("satis")}
                </p>
              </div>
              {/* desc start */}
              {i18n.language === "en" ? (
                <>
                  {/* <div
                    className={`  ${
                      i18n.language === "AR" ? "mb-10 w-full" : "w-full"
                    } relative overflow-x-hidden overflow-y-hidden  `}
                  >
                    <div
                      className={`bg-[#95bcbf] rounded-full w-[290px] h-[290px] ${
                        i18n.language === "AR"
                          ? " h-[215px] w-[215px] top-6 md:-right-28"
                          : ""
                      } absolute  -right-36 bottom-0 -z-30 `}
                    ></div>
                    <p
                      className={`  text-xs font-normal tracking-wide leading-5  ${
                        i18n.language === "AR" ? "md:leading-[55px]" : ""
                      }} mt-36 z-50 	`}
                    >
                      {t("desc")}.
                    </p>
                  </div> */}
                  <div className="mt-36 mr-0 w-[100%] h-[100%] flex flex-col items-center justify-center">
                    <img
                      src="./assets/mob desc.png"
                      alt="arabic description"
                      className="w-[100%] h-[100%] object-fill"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-36 w-[100%] h-[100%] flex flex-col items-center justify-center">
                    <img
                      src="./assets/ARB.png"
                      alt="arabic description"
                      className="w-[100%] h-[100%] object-fill"
                    />
                  </div>
                </>
              )}
              {/* desc end */}
            </div>
            {/* seeting mobile */}
            <div className="flex h-[20vh] sm:hidden flex-row items-center mx-3 justify-around gap-4 w-full">
              <img
                src="./assets/viv.png"
                alt="welcome "
                className={` h-1/2 aspect-[4/5] ${
                  i18n.language === "AR" ? "mt-2 " : ""
                }     rounded-2xl`}
              />
              <p className="font-bold text-xs  mt-8 w-3/4   ">
                {t("welcome")}
                <span className=" ">
                  <br className=" " />
                  {t("satis")}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
        {/* welcome medium */}
        <div className="sm:flex h-[20vh] hidden flex-row items-center mx-3 justify-around gap-4 w-full">
          <div className="bg-[#32a8a4] w-8 mr-0 "></div>

          <img
            src="./assets/viv.png"
            alt="welcome "
            className={` h-1/2 aspect-[4/5] ${
              i18n.language === "AR" ? "mt-2 " : ""
            }     rounded-2xl`}
          />
          <p className="font-bold text-xl  mt-8 w-3/4   ">
            {t("welcome")}
            <span className=" ">
              <br className=" " />
              {t("satis")}
            </span>{" "}
          </p>
        </div>
        {/* mobile description */}
        <div className="flex sm:hidden">
          <div>
            {i18n.language === "en" ? (
              <>
                {" "}
                <div className="mt-6   w-[90%] h-[100%]  flex flex-col items-center justify-center">
                  <img
                    src="./assets/mob desc.png"
                    alt="arabic description"
                    className="w-[100%] h-[100%] object-fill"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mt-6 w-[100%] h-[100%] flex flex-col items-center justify-center">
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

        {/* desc medium eng */}
        <div className="hidden sm:flex">
          <div>
            {i18n.language === "en" && (
              <>
                {" "}
                <div className="mt-6   w-[90%] h-[100%]  flex flex-col items-center justify-center">
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
              className={`hidden sm:flex ${
                i18n.language === "AR" ? "hidden" : ""
              } `}
            >
              <img
                src="./assets/pic2.png"
                alt="welcome "
                className={` ${
                  i18n.language === "AR" ? "hidden" : "w-[80%] h-[180px]"
                }      rounded-2xl mt-40`}
              />
            </div>
          </div>
        </div>
        {/* arabic medium desc */}
        <div className="hidden sm:flex flex-row justify-center items-center">
          <div>
            {/* pic2 medium */}
            <div
              className={`hidden sm:flex ${
                i18n.language === "AR" ? "flex" : "hidden"
              } `}
            >
              <img
                src="./assets/pic2.png"
                alt="welcome "
                className={` ${
                  i18n.language === "AR" ? "flex w-full h-full " : "hidden"
                }      rounded-2xl mt-4`}
              />
            </div>
          </div>
          <div>
            {i18n.language === "AR" && (
              <>
                {" "}
                <div className="mt-6   w-[100%] h-[100%]  flex flex-col items-center justify-center">
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

        {/* desc end */}
        {/* circle */}
        <div className="hidden sm:flex flex-col justify-center items-center relative     ">
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
        <div className="flex flex-row w-full mt-10  ">
          {/* sidebar */}

          <div className="bg-[#32a8a4] w-12  ml-0 -mb-11"></div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* image */}
            <div className="w-full hidden sm:flex ">
              <img
                src="./assets/pic1.png"
                alt="welcome "
                className="w-[90%]  md:h-[280px]    rounded-2xl mt-0"
              />
            </div>
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
                <div className=" flex flex-row gap-2 mt-2 items-center justify-around h-fit   w-[100%]">
                  <Satisfaction
                    pic="./assets/sat very.png"
                    title={t("t9")}
                    fun={setsatisfy}
                    value="verysatisfied"
                    back={satisfy === "verysatisfied"}
                  />
                  <Satisfaction
                    fun={setsatisfy}
                    back={satisfy === "satisfied"}
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
                <p className="text-black font-semibold text-xs">
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
          </div>
        </div>

        {/* circle */}
        <div className=" hidden sm:flex flex-col justify-center items-center relative     ">
          <div className=" flex flex-col justify-center items-center relative    ">
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
        <div className=" flex flex-row  w-full gap-3 mt-16 sm:mt-0">
          {/* sidebar */}
          <div className="bg-[#32a8a4] w-10  -mb-11"></div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* suggestion */}
            <div className="flex flex-col  items-center justify-center   ">
              <p className="text-black font-semibold text-lg mb-7">
                {i18n.language === "AR" ? (
                  <div className="flex flex-row mr-1">
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
                  <div className="flex flex-row mr-1">
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
                className="border-4 border-[#32a8a4] py-12 px-8 w-full mr-2 rounded-3xl text-[#32a8a4] "
              />
              <button
                onClick={submiteval}
                class="subunder"
                className="text-black  border-2 w-1/2 mt-5 py-4  md:px-0 text-lg font-bold  border-black bg-[#32a8a4]  flex justify-center items-center rounded-full"
              >
                {t("submit")}
              </button>
            </div>
            {/* image */}
            <div className="w-full hidden sm:flex  ">
              <img
                src="./assets/pic3.png"
                alt="welcome "
                className="w-[85%] h-[280px]    rounded-2xl mt-40"
              />
            </div>
          </div>
        </div>
        {/* thank you */}

        {/* <div className="flex items-center flex-col justify-center mb-44 sm:mb-0  ">
          <div className="w-4 h-4 rounded-full border-4 border-[#32a8a4]"></div>
          <div className="w-1 h-56  bg-[#32a8a4]"></div>
          <div className="w-full bg-[#0f080a] h-16 mt-0 "></div>
        </div> */}
      </div>
    </div>
  );
};

export default Medium;
