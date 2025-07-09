import { Raw, render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";
import i18n, { getMessages } from "../i18n.ts";
import { previewLocale } from "../util/previewLocale.ts";
import { TFunction } from "i18next";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Execute Actions";

const { exp } = createVariablesHelper("executeActions.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

const requiredActionsText = getMessages(previewProps);

export const Template = ({ locale, t }: TemplateProps) => {
    const hasWelcomeMessage = Object.values(requiredActionsText).some(value =>
        value.includes(t("execute-actions.invitation"))
    );
    return (
        <EmailLayout preview={t("execute-actions.messagePreview")} locale={locale}>
            <Text style={paragraph}>
                {hasWelcomeMessage ? (
                    <>
                        <p>
                            {t("execute-actions.messageBody", {
                                realmName: exp("realmName")
                            })}
                        </p>
                        <p>
                            <a href={exp("link")}>{t("execute-actions.messageLink")}</a>
                        </p>
                        <p>{t("execute-actions.linkExpiry", { linkExpiration: 5 })}</p>
                        <p>
                            {t("execute-actions.resetPassword")}
                            <br />
                            {t("execute-actions.furtherActions", {
                                contactEmail: "compass@almig.de"
                            })}
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            {t("execute-actions.adminMessageBody", {
                                realmName: exp("realmName")
                            })}
                            <Raw content="<#assign requiredActionsText><#if requiredActions??><#list requiredActions><#items as reqActionItem>${msg('requiredAction.${reqActionItem}')}<#sep>, </#sep></#items></#list></#if></#assign>" />
                            {t("execute-actions.adminMessageLink")}
                        </p>
                        <p>
                            <a href={exp("link")}>
                                {t("execute-actions.adminLinkToAccountUpdate")}
                            </a>
                        </p>
                        <p>{t("execute-actions.linkExpiry", { linkExpiration: 5 })}</p>
                        <p>{t("execute-actions.adminIgnoreMessage")}</p>
                    </>
                )}
            </Text>
        </EmailLayout>
    );
};

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("execute-actions.messageSubject");
};
