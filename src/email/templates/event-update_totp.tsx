import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "Tailcloakify"
};

export const templateName = "Event Update Totp";

const { exp } = createVariablesHelper("event-update_totp.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={
            `OTP was updated for your account on ${exp("event.date")} from ${exp("event.ipAddress")}.`
        }
        locale={locale}
    >
        <Text style={paragraph}>
            <p>
                OTP was updated for your account on {exp("event.date")} from {exp("event.ipAddress")}. If this was not you,
                please contact an administrator.
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Update OTP";
};
