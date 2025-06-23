import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "Tailcloakify"
};

export const templateName = "Email Update Confirmation";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={
            `To update your ${exp("realmName")} account with email address ${exp("newEmail")}`
        }
        locale={locale}
    >
        <Text style={paragraph}>
            <p>
                To update your {exp("realmName")} account with email address{" "}
                {exp("newEmail")}, click the link below
            </p>
            <p>
                <a href={exp("link")}>{exp("link")}</a>
            </p>
            <p>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}.
            </p>
            <p>
                If you don''t want to proceed with this modification, just ignore this
                message.
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Email Verification";
};
