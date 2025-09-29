<p align="center">
    <i>🚀 <a href="https://github.com/ALMiG-Kompressoren-GmbH/tailcloakify">Tailcloakify</a> V1  🚀</i>
    <br/>
    <br/>
</p>
<img src="./public/Tailcloakify-login-page.png" alt="keycloak theme config" width="1905">
<img src="./public/Tailcloakify-email-template.png" alt="keycloak theme config" width="1905">

Tailcloakify is a [Keycloak](https://github.com/keycloak/keycloak) Theme that is based on 
[Keycloakify](https://github.com/keycloakify/keycloakify), layered with [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) and inspired by [Keywind](https://github.com/lukin/keywind) 
UI design approach.

# How to Use

1. Place the provided JAR file in the <keycloak-home>/providers/ directory or use the example Dockerfile from this repository to add the provided JAR file into your Docker Image.
2. Set environment variables or localization messages to customize the theme with the out of the box configuration functionalities.
3. Restart your Keycloak server or deploy your built docker image to your server.
4. Log in to the Keycloak Admin Console.  
Go to Realm Settings > Themes.  
Select the `Tailcloakify` Login theme from the dropdown.  
Select the `Tailcloakify` Email theme from the dropdown.   
Save your settings.

# Supported Login Pages & Email Templates

Tailcloakify aims to provide support for all default login pages and email templates, which are currently available. If you think, there is something missing let us know.

We also support using the following plugins:

- [X] [apple-identity-provider](https://github.com/klausbetz/apple-identity-provider-keycloak)
- [X] [keycloak-magic-link](https://github.com/p2-inc/keycloak-magic-link)
- [X] [keycloak-orgs](https://github.com/p2-inc/keycloak-orgs)

## Customizing the Theme

Tailcloakify provides several ways of customizing your theme without the need to rebuild the theme while using the prebundled JAR file. You can either use environment variables, the keycloak localization system or deploy your custom theme extending Tailcloakify.

## Environment variables

| Name                                                      | Description                                                                                        |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| TAILCLOAKIFY_ADDITIONAL_SCRIPTS                           | Use it to add other external scripts                                                               |
| TAILCLOAKIFY_ADDITIONAL_STYLES                            | Use it to add other external styles                                                                |
| TAILCLOAKIFY_ADDITIONAL_META                              | Use it to add other meta tags                                                                      |
| TAILCLOAKIFY_HIDE_LOGIN_FORM                              | Use it to hide the default login form for using IDPs only                                          |
| TAILCLOAKIFY_BACKGROUND_LOGO_URL                          | Use it to add an image of your logo                                                                |
| TAILCLOAKIFY_HEADER_LOGO_URL                              | Use it to add an image of your logo to the header                                                  |
| TAILCLOAKIFY_BACKGROUND_VIDEO_URL                         | Use it to add a MP4 format background video on your register and login pages                       |
| TAILCLOAKIFY_FAVICON_URL                                  | Use it to add a url to your Favicon                                                                |
| TAILCLOAKIFY_FOOTER_IMPRINT_URL                           | Use it to add an Impressum                                                                         |
| TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL                    | Use it to add url to your data protection document                                                 |
| TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT                | Use it to integrate Orestbida cookie consent plugin                                                |
| TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA | Provide any falsy value to disable the cookie section for the google captcha                       |
| TAILCLOAKIFY_SHOW_SOCIAL_PROVIDERS_ON_REGISTER            | Use it to show social identity providers on the registration page (set to "TRUE")                  |
| TAILCLOAKIFY_EMAIL_BACKGROUND_IMAGE_URL                   | Use it to add a default background image for your email templates                                  |
| TAILCLOAKIFY_EMAIL_LOGO                                   | Use it to add an image of your logo to your email templates                                        |
| TAILCLOAKIFY_EMAIL_FONT_FAMILY                            | Use it to add your preferred font with good cross-platform compatibility                           |
| TAILCLOAKIFY_EMAIL_CONTACT                                | Use it to add your contact email address. Preferably the email address used to contact your users. |


## Keycloak localization feature

Some customizations are possible through Keycloak's Localization System, allowing setting up different configurations for each language. You can either add custom localization by adding those into the keycloak server or by manually setting them within the realm settings. You can also use this feature to overwrite default variables for each realm by providing at least the default language as configuration.

| Name                     | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| backgroundLogoUrl        | The localized enabled alternative to env: TAILCLOAKIFY_BACKGROUND_LOGO_URL         |
| headerLogoUrl            | The localized enabled alternative to env: TAILCLOAKIFY_HEADER_LOGO_URL             |
| backgroundVideoUrl       | The localized enabled alternative to env: TAILCLOAKIFY_BACKGROUND_VIDEO_URL        |
| faviconUrl               | The localized enabled alternative to env: TAILCLOAKIFY_FAVICON_URL                 |
| footerImprintUrl         | The localized enabled alternative to env: TAILCLOAKIFY_FOOTER_IMPRINT_URL          |
| footerDataprotectionUrl  | The localized enabled alternative to env: TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL   |
| showSocialProvidersOnRegister | The localized enabled alternative to env: TAILCLOAKIFY_SHOW_SOCIAL_PROVIDERS_ON_REGISTER |

**_Note_**: Unlike the Login theme, the Email theme does not include a feature for adding localized variables directly from the Keycloak admin console. Therefore, the email environment variables in the above section
denoted with the prefix `TAILCLOAKIFY_EMAIL_` can only be configured as arguments in a Dockerfile, or Docker Compose yml configuration. These runtime docker environment variables will override 
the build time environment variables set in the `vite.config.ts` file under `esbuild` options. This means, you can either set these variables in your Docker configs or in the `vite.config.ts`
file.


## Using a child Theme

If you want to customize this theme, by extending it with your own files to be loaded as scripts or styles you can follow the following steps.

1. [Deploy Keywind Login Theme](https://www.keycloak.org/docs/latest/server_development/#deploying-themes)
2. [Create your own Login Theme](https://www.keycloak.org/docs/latest/server_development/#creating-a-theme)
3. Specify parent theme in [theme properties](https://www.keycloak.org/docs/latest/server_development/#theme-properties) and add additional files to be loaded in the header

```
parent=tailcloakify
scripts=first-script.js second-script.js
styles=custom-styles.css
meta=name==content name2=content2
```

# Developer Quick Start

If you want to customize the theme beyond the outlined capabilities, you can do so by forking this repository and performing manual changes yourself.

Here do you find a Quick Start, how to setup your development environment:

```bash
  git clone https://github.com/ALMiG-Kompressoren-GmbH/tailcloakify
  cd tailcloakify
  yarn install  # Or use an other package manager, just be sure to delete the yarn.lock if you use another package manager.
```

## Testing the Theme Locally

```bash
  npm run dev
```

Alternatively, to run the theme locally via Keycloak:

```bash
  npx keycloakify start-keycloak
```

Or you can preview the pages using the storybook:

```bash
  npm run storybook
```

## Building the theme

You need to have [Maven](https://maven.apache.org/) installed to build the theme (Maven >= 3.1.1, Java >= 7).  
The `mvn` command must be in the $PATH.

- On macOS: `brew install maven`
- On Debian/Ubuntu: `sudo apt-get install maven`
- On Windows: `choco install openjdk` and `choco install maven` (Or download from [here](https://maven.apache.org/download.cgi))

```bash
  npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets).

## GitHub Actions

Tailcloakify comes with a generic GitHub Actions workflow that builds the theme and publishes
the jars [as GitHub releases artifacts](https://github.com/ALMiG-Kompressoren-GmbH/tailcloakify/releases/tag/v1.1.17).
To release a new version **just update the `package.json` version and push**.

To enable the workflow go to your fork of this repository on GitHub then navigate to:
`Settings` > `Actions` > `Workflow permissions`, select `Read and write permissions`.

# Contributing

If you would like to introduce additional changes, please read the [Contributing Guidelines](CONTRIBUTING.md).

# Code of Conduct

Anyone who interacts with Tailcloakify in any space, including but not limited to this GitHub repository, must follow
our [Code of Conduct](CODE_OF_CONDUCT.md).

# License

Licensed under the [MIT License](LICENSE).

# Authors

[Paul Werner](https://github.com/paulwer)

[Wayne Kirimi](https://github.com/waynemorphic)
