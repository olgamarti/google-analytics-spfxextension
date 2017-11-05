import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import * as strings from 'GAnalyticsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GAnalyticsApplicationCustomizer';

export interface IGAnalyticsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  gtag: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GAnalyticsApplicationCustomizer
  extends BaseApplicationCustomizer<IGAnalyticsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    
    let userId = this.context.pageContext.user.email;
    let gtag: string = this.properties.gtag;
    if (!gtag) {
      console.log('Alert: No gtag provided');
    }

    let script: HTMLScriptElement = document.createElement("script");
    script.text =  `
    <!-- Google Analytics -->
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', '`+this.properties.gtag+`', 'auto');
    ga('send', 'pageview', {
      'dimension1': '`+ userId +`'});
    <!-- End Google Analytics -->
   `;
    script.type = "text/javascript";
    document.head.appendChild(script);

    return Promise.resolve();
  }
}
