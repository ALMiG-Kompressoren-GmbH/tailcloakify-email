import { GetMessages } from "keycloakify-emails";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";

const resources = {
    en: {
        translation: enTranslation
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
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
