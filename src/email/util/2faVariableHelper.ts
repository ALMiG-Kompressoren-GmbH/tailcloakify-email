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

interface BaseVars {
  locale: string;
  properties: UnknownObject;
  realmName: string;
}

interface CodeVars {
  code: string,
  realmName: string;
}

type OtpEmail = {
  emailId: "otp-email.ftl";
  vars: Path<CodeVars & BaseVars>;
}

type KcEmailVars = OtpEmail;

function variablesHelper<EmailId extends KcEmailVars["emailId"]>(_emailId: EmailId) {
  return {
  exp: (name: (Extract<OtpEmail, {
    emailId: EmailId;
  }>)["vars"]) => "${" + name + "}",

      v:(name: (Extract<OtpEmail, {
    emailId: EmailId;
  }>)["vars"]) => name,
}
}

export {
  type OtpEmail,
  variablesHelper,
}