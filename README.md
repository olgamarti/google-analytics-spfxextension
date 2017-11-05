# Google Analytics SPFx Extension

This is a SPFx Extension (Application customizer) that adds Google Analytics to SharePoint Modern Sites. In addition, with a custom dimension and a custom report we will get the page views of the Office 365 user.

![reportuser](https://user-images.githubusercontent.com/12034051/32414762-498ed5a0-c22e-11e7-80e1-857299ae5520.PNG)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project in your SharePoint Site.


### Prerequisites

You need SPFx Development environment. 

If it's your first time with SPFx, follow the steps in this guide: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment

You need a Google Analytics account. If you don't have one, you can create one for free here: https://analytics.google.com/analytics/web/


### Installing

Clone this repository in your environment and install the packages:

```
npm install
```

Go to elements.xml under Assets and change the Google Analytics Tags for your own in ClientSideComponentProperties.

#### Google Analytics Configuration

In order to get information about what users are visting the intranet, you will have to create a dimension and a custom report in Google Analytics.

Go to Admin Settings in your Google Analytics account and searc for custom dimension.

![create_dimension](https://user-images.githubusercontent.com/12034051/32414765-6047cdce-c22e-11e7-8a47-e65892dfe599.PNG)

Create a new dimension, name it User, type Hint.

![dimension1](https://user-images.githubusercontent.com/12034051/32414769-69e5c796-c22e-11e7-8873-a41cb2f8de3f.PNG)

Go back to the principal page of your account and Create a custom report.

![customreport](https://user-images.githubusercontent.com/12034051/32414770-6e16f8b2-c22e-11e7-9f13-1eab96afe96a.PNG)

We will have to add or custom dimension and the properties that we want  (for example Page views, time on screen,...)

![createreportiwithcustomdimension](https://user-images.githubusercontent.com/12034051/32414772-703b26fe-c22e-11e7-90fb-8d6144d1dcc0.PNG)


## Debug

To debug the extension in your SharePoint Site run

```
gulp serve --nobrowser
```

Copy the generated querystring in the terminal after the build, and change prop1 for gtag and val1 for your Google Analytics Tag.

```
GAnalyticsApplicationCustomizer:
?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"79f80
0a6-9286-4965-891c-00017b35cd8d":{"location":"ClientSideExtension.ApplicationCustomizer","proper
ties":{"gtag":"UA-XXXXXXX-1"}}}
```

Paste it after your SharePoint Site URL.

Visit your Google Analytics portal and go to Real Time to check if the configuration is working correctly. 

The data of the custom dimension in our custom report may take time to appear (24h).

## Deployment

Create a CDN in your SharePoint Site. You can follow the steps here: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/hosting-extension-from-office365-cdn 

In the write-manifest.json, change the CDN URL for yours.

Run 

```
gulp bundle --ship
```
 
 and
 
 ```
gulp package-solution --ship
```

Copy the assets from temp/deploy to your CDN folder.

Load in your App Catalog the spkkg generated in sharepoint/solutions.

Install the Application in your SharePoint site.


## Authors

**Olga Martí** - @olgaamarti


