import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "Tailcloakify"
};

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

const paragraph = {
    color: '#777',
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
}

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`Someone just requested to change your ${exp("realmName")} account's credentials.`} locale = { locale }>
        <Text style={paragraph}>
            <p>
                Someone just requested to change your {exp("realmName")} account's credentials. If
                this was you, click on the link below to reset them.
            </p>
            <p>
                <a href={exp("link")}>Link to reset credentials</a>
            </p>
            <p>
                This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
            </p>
            <p>
                If you don't want to reset your credentials, just ignore this message and nothing
                will be changed.
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Reset Password";
};
