import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "./../locales/en/translation.json";
import tAR from "./../locales/AR/translation.json";

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

const Thank = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* thank you */}
      <div className="w-full flex items-center justify-center">
        <p className="text-black border-[8px] sm:w-full md:w-[80%] py-16 px-2  text-xl md:text-4xl mt-28 mb-8 font-bold border-[#32a8a4]  flex justify-center items-center rounded-[60px] mx-7">
          {t("success")}{" "}
        </p>
      </div>
      <div className="flex items-center justify-center mb-6">
        <p className="font-normal text-4xl">
          <span className="text-pink-500 font-medium">
            {t("thank")} {""}
          </span>
          {t("atten")}
        </p>
      </div>
      <div className="flex items-center flex-col justify-center mb-44 md:mb-0  ">
        <div className="w-4 h-4 rounded-full border-4 border-[#32a8a4]"></div>
        <div className="w-1 h-56  bg-[#32a8a4]"></div>
        <div className="w-full bg-[#0f080a] h-16 mt-0 "></div>
      </div>
    </div>
  );
};

export default Thank;
