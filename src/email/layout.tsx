import { Body, Container, Head, Html, Preview, Tailwind } from "jsx-email";
import { PropsWithChildren, ReactNode } from "react";
import { createVariablesHelper } from "keycloakify-emails/variables";

const { exp } = createVariablesHelper("email-test.ftl");
const currentYear = new Date().getFullYear();

export const EmailLayout = ({
                                locale,
                                children,
                                preview
                            }: PropsWithChildren<{ preview: ReactNode; locale: string }>) => {
    return (
        <Html lang={locale}>
            <Head>
                <title>{exp("realmName")} Notification</title>
            </Head>
            <Preview>{preview}</Preview>
            <Body
                style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: "#ecf9ff",
                    backgroundImage:
                        "url('https://mailwind.blob.core.windows.net/website/blurred-background-transparency.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                }}
            >
                <Tailwind>
                    <Container>
                        <table
                            cellPadding={0}
                            cellSpacing={0}
                            border={0}
                            align="center"
                            style={{
                                paddingTop: "2.5rem",
                                paddingBottom: "2.5rem",
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                maxWidth: "512px",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                        >
                            <tbody>
                            <tr>
                                <td align="center">
                                    {/* Card */}
                                    <table
                                        cellPadding={0}
                                        cellSpacing={0}
                                        border={0}
                                        width="100%"
                                        style={{
                                            backgroundColor: "#ffffff",
                                            padding: "2.5rem 1rem",
                                            borderRadius: "0.5rem",
                                            boxShadow:
                                                "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
                                        }}
                                    >
                                        <tbody>
                                        <tr>
                                            <td align="center">
                                                {/* Logo */}
                                                <img
                                                    src="https://www.almig.de/typo3conf/ext/almig_package/Resources/Public/Images/almig-logo.png"
                                                    alt="ALMiG Compressor Systems Logo"
                                                    style={{ height: "40px" }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                align="left"
                                                style={{
                                                    marginTop: "2.5rem",
                                                    paddingTop: "1.5rem"
                                                }}
                                            >
                                                {children}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        {/* Footer */}
                        <table
                            cellPadding={0}
                            cellSpacing={0}
                            border={0}
                            align="center"
                            style={{
                                width: "100%",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                                textAlign: "center",
                                fontSize: "0.875rem",
                                opacity: 0.8,
                                color: "black"
                            }}
                        >
                            <tbody>
                            <tr>
                                <td style={{color: "black"}}>
                                    © {currentYear} {exp("realmName")}.
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Container>
                </Tailwind>
            </Body>
        </Html>
    );
};
