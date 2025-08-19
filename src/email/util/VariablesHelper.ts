import { BaseVars, LinkVars, OrganizationModel } from "keycloakify-emails/variables";

type UnknownObject = "object";

type Path<T, K extends keyof T = keyof T> = K extends string // Ensure keys are strings
    ? T[K] extends (...args: never[]) => never // Check if the property is a function
        ? `${K}()` | `${K}().${string}` // Append () and handle unknown return types
        : T[K] extends UnknownObject // Special handling for UnknownObject
          ? `${K}.${string}` // Produce `parent.${string}` for UnknownObject
          : T[K] extends object // If it's an object, recurse
            ? `${K}` | `${K}.${Path<T[K]>}` // Combine current key with sub-paths
            : `${K}` // For primitives or other types, just return the key
    : never;

interface CodeVars {
    code: string;
}

/**
 * src/main/java/io/phasetwo/keycloak/magic/auth/model/MagicLinkContinuationBean.java
 * */
interface MagicLinkContinuationBean {
    magicLink: string;
}

type OtpEmail = {
    emailId: "otp-email.ftl";
    vars: Path<CodeVars & BaseVars>;
};

type EmailVerificationWithCode = {
    emailId: "email-verification-with-code.ftl";
    vars: Path<CodeVars>;
};

/**
 * src/main/java/io/phasetwo/service/model/OrganizationModel.java
 * src/main/java/io/phasetwo/service/model/InvitationModel.java
 */
type InvitationEmail = {
    emailId: "invitation-email.ftl";
    vars: Path<
        BaseVars &
            LinkVars & {
                organization: OrganizationModel;
            }
    >;
};

type MagicLinkEmail = {
    emailId: "magic-link-email.ftl";
    vars: Path<
        BaseVars & {
            url: MagicLinkContinuationBean;
        }
    >;
};

type KcEmailVars =
    | OtpEmail
    | EmailVerificationWithCode
    | InvitationEmail
    | MagicLinkEmail;

function variablesHelper<EmailId extends KcEmailVars["emailId"]>(_emailId: EmailId) {
    return {
        exp: (
            name: (
                | Extract<
                      OtpEmail,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      EmailVerificationWithCode,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      InvitationEmail,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      MagicLinkEmail,
                      {
                          emailId: EmailId;
                      }
                  >
            )["vars"]
        ) => "${" + name + "}",

        v: (
            name: (
                | Extract<
                      OtpEmail,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      EmailVerificationWithCode,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      InvitationEmail,
                      {
                          emailId: EmailId;
                      }
                  >
                | Extract<
                      MagicLinkEmail,
                      {
                          emailId: EmailId;
                      }
                  >
            )["vars"]
        ) => name
    };
}

export {
    type OtpEmail,
    type EmailVerificationWithCode,
    type InvitationEmail,
    type MagicLinkEmail,
    variablesHelper
};
