import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { render, Text } from "jsx-email";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">

const paragraph = {
    color: '#777',
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
}

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "Tailcloakify",
}

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

export const Template = ({locale}: TemplateProps) => (
    <EmailLayout preview = {"This is a test email"} locale={locale}>
        <Text style = { paragraph }>This is a test message from {exp("realmName")}</Text>
    </EmailLayout>
)

export const getTemplate: GetTemplate = async (props) => {
    return await render(<Template {...props} />, { plainText: props.plainText });
}

export const getSubject: GetSubject = async (_props) => {
    return "[KEYCLOAK] - SMTP Test Email";
};

