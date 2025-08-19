import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { variablesHelper } from "../util/VariablesHelper.ts";
import i18n, { TFunction } from "i18next";
import { previewLocale } from "../util/previewLocale.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "Tailcloakify"
};

export const templateName = "Invitation Email";

const { exp } = variablesHelper("invitation-email.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale, t }: TemplateProps) => (
    <EmailLayout
        preview={t("invitation-email.messagePreview", {
            email: exp("user.email"),
            orgName: exp("organization.name")
        })}
        locale={locale}
    >
        <Text style={paragraph}>
            <p>
                {t("invitation-email.messageBody", {
                    email: exp("user.email"),
                    orgName: exp("organization.name"),
                    realmName: exp("realmName"),
                    inviterName: exp("user.username")
                })}
            </p>
            <p>{t("invitation-email.furtherActions")}</p>
            <p>
                <a href={exp("link")}>{exp("link")}</a>
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    const t = i18n.getFixedT(_props.locale);
    return t("invitation-email.messageSubject");
};
