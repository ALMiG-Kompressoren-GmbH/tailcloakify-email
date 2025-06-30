import { GetMessages } from "keycloakify-emails";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import ICU from "i18next-icu";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: enTranslation
    }
};

i18n.use(ICU)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,
        interpolation: { escapeValue: false }
    });

export default i18n;

export const getMessages: GetMessages = props => {
    // this default properties are optional, if you omit them, they will be taken from a base theme
    switch (props.locale) {
        case "de":
            return {
                "requiredAction.WELCOME": "Wilkommen"
            };
        case "fr":
            return {
                "requiredAction.WELCOME": "Bienvenu"
            };
        case "ru":
            return {
                "requiredAction.WELCOME": "Добро пожаловать"
            };
        default:
            return {
                "requiredAction.WELCOME": "Welcome"
            };
    }
};
