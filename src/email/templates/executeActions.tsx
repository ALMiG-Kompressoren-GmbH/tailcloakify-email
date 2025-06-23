import { render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { EmailLayout } from "../layout.tsx";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { getMessages } from "../i18n.ts";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

export const previewProps: TemplateProps = {
    locale: "en",
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

const hasWelcomeMessage = Object.values(requiredActionsText).some(value =>
    value.includes("Welcome")
);

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={`We have just created your ${exp("realmName")} account. Please set your initial password by clicking on the link below`}
        locale={locale}
    >
        <Text style={paragraph}>
            {hasWelcomeMessage ? (
                <>
                    <p>
                        We have just created your {exp("realmName")} account. Please set
                        your initial password by clicking on the link below.
                    </p>
                    <p>
                        <a href={exp("link")}>Set Your Password</a>
                    </p>
                    <p>
                        This link will expire within{" "}
                        {exp("linkExpirationFormatter(linkExpiration)")}.
                    </p>
                    <p>
                        If the link has already expired, try to reset you password with
                        your email at our login page.
                        <br />
                        If you have any questions or think you are the wrong person
                        receiving this email, please reach out to{" "}
                        <a href="mailto:compass@almig.de">compass@almig.de</a> for help.
                    </p>
                </>
            ) : (
                <>
                    <p>
                        Your administrator has just requested that you update your{" "}
                        {exp("realmName")} account by performing the following action(s):{" "}
                        <ul>
                            {Object.values(requiredActionsText).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        . Click on the link below to start this process.
                    </p>
                    <p>
                        <a href={exp("link")}>Link to account update</a>
                    </p>
                    <p>
                        This link will expire within{" "}
                        {exp("linkExpirationFormatter(linkExpiration)")}.
                    </p>
                    <p>
                        If you are unaware that your administrator has requested this,
                        just ignore this message and nothing will be changed.
                    </p>
                </>
            )}
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Your Account";
};
