import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "Tailcloakify"
};

export const templateName = "Email Verification";

const { exp } = createVariablesHelper("email-verification.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={
           `Someone has created a ${exp("realmName")} account with this email address`
        }
        locale={locale}
    >
        <Text style={paragraph}>
            <p>
                Someone has created a {exp("realmName")} account with this email address.
                If this was you, click the link below to verify your email address
            </p>
            <p>
                <a href={exp("link")}>Link to e-mail address verification</a>
            </p>
            <p>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}.
            </p>
            <p>If you didn''t create this account, just ignore this message.</p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Email Verification";
};
