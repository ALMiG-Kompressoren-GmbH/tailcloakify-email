// This file is auto-generated by the `update-kc-gen` command. Do not edit it manually.
// Hash: c1696d6c33a7878c597eec407f59d0004ca6f40ada9be5d254039effcdb641d3

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { lazy, Suspense, type ReactNode } from "react";

export type ThemeName = "Tailcloakify";

export const themeNames: ThemeName[] = ["Tailcloakify"];

export type KcEnvName =
    | "styles"
    | "scripts"
    | "meta"
    | "TAILCLOAKIFY_ADDITIONAL_SCRIPTS"
    | "TAILCLOAKIFY_ADDITIONAL_STYLES"
    | "TAILCLOAKIFY_ADDITIONAL_META"
    | "TAILCLOAKIFY_HIDE_LOGIN_FORM"
    | "TAILCLOAKIFY_BACKGROUND_LOGO_URL"
    | "TAILCLOAKIFY_BACKGROUND_VIDEO_URL"
    | "TAILCLOAKIFY_HEADER_LOGO_URL"
    | "TAILCLOAKIFY_FAVICON_URL"
    | "TAILCLOAKIFY_FOOTER_IMPRINT_URL"
    | "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL"
    | "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT"
    | "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA"
    | "TAILCLOAKIFY_SHOW_SOCIAL_PROVIDERS_ON_REGISTER";

export const kcEnvNames: KcEnvName[] = [
    "styles",
    "scripts",
    "meta",
    "TAILCLOAKIFY_ADDITIONAL_SCRIPTS",
    "TAILCLOAKIFY_ADDITIONAL_STYLES",
    "TAILCLOAKIFY_ADDITIONAL_META",
    "TAILCLOAKIFY_HIDE_LOGIN_FORM",
    "TAILCLOAKIFY_BACKGROUND_LOGO_URL",
    "TAILCLOAKIFY_BACKGROUND_VIDEO_URL",
    "TAILCLOAKIFY_HEADER_LOGO_URL",
    "TAILCLOAKIFY_FAVICON_URL",
    "TAILCLOAKIFY_FOOTER_IMPRINT_URL",
    "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL",
    "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT",
    "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA",
    "TAILCLOAKIFY_SHOW_SOCIAL_PROVIDERS_ON_REGISTER"
];

export const kcEnvDefaults: Record<KcEnvName, string> = {
    styles: "",
    scripts: "",
    meta: "",
    TAILCLOAKIFY_ADDITIONAL_SCRIPTS: "",
    TAILCLOAKIFY_ADDITIONAL_STYLES: "",
    TAILCLOAKIFY_ADDITIONAL_META: "",
    TAILCLOAKIFY_HIDE_LOGIN_FORM: "",
    TAILCLOAKIFY_BACKGROUND_LOGO_URL: "",
    TAILCLOAKIFY_BACKGROUND_VIDEO_URL: "",
    TAILCLOAKIFY_HEADER_LOGO_URL: "",
    TAILCLOAKIFY_FAVICON_URL: "",
    TAILCLOAKIFY_FOOTER_IMPRINT_URL: "",
    TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL: "",
    TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT: "",
    TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA: "TRUE",
    TAILCLOAKIFY_SHOW_SOCIAL_PROVIDERS_ON_REGISTER: ""
};

/**
 * NOTE: Do not import this type except maybe in your entrypoint.
 * If you need to import the KcContext import it either from src/login/KcContext.ts or src/account/KcContext.ts.
 * Depending on the theme type you are working on.
 */
export type KcContext = import("./login/KcContext").KcContext;

declare global {
    interface Window {
        kcContext?: KcContext;
    }
}

export const KcLoginPage = lazy(() => import("./login/KcPage"));

export function KcPage(props: { kcContext: KcContext; fallback?: ReactNode }) {
    const { kcContext, fallback } = props;
    return (
        <Suspense fallback={fallback}>
            {(() => {
                switch (kcContext.themeType) {
                    case "login":
                        return <KcLoginPage kcContext={kcContext} />;
                }
            })()}
        </Suspense>
    );
}

// NOTE: This is exported here only because in Webpack environnement it works differently
export const BASE_URL = import.meta.env.BASE_URL;

// NOTE: This is only exported here because you're supposed to import type from different packages
// Depending of if you are using Vite, Webpack, ect...
export type { Meta, StoryObj } from "@storybook/react-vite";
