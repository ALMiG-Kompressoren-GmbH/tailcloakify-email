import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "Tailcloakify"
};

export const templateName = "Identity Provider Link";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={
            `Someone wants to link your ${exp("realmName")} account with ${exp("identityProviderDisplayName")}...`
        }
        locale={locale}
    >
        <Text style={paragraph}>
            <p>
                <p>
                    Someone wants to link your {exp("realmName")} account with {exp("identityProviderDisplayName")} account
                    of user {exp("identityProviderContext.username")}. If this was you, click the link below to link accounts
                </p>
                <p>
                    <a href={exp("link")}>Link to confirm account linking</a>
                </p>
                <p>This link will expire within {5}.</p>
                <p>
                    If you don't want to link account, just ignore this message. If you
                    link accounts, you will be able to login to {exp("realmName")} through {exp("identityProviderDisplayName")}.
                </p>
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Identity Provider Link";
};
