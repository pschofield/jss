import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { JssLayoutService } from './layout/jss-layout.service';
import { JssContextService } from './jss-context.service';
import { AppComponentsModule } from './components/app-components.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { JssTranslationClientLoaderService } from './i18n/jss-translation-client-loader.service';
import { JssTranslationLoaderService } from './i18n/jss-translation-loader.service';
import { GraphQLModule } from './jss-graphql.module';
import { JssDataFetcherService } from './jss-data-fetcher.service';
import { JssMetaService } from './jss-meta.service';

@NgModule({
  imports: [
    // withServerTransition is needed to enable universal rendering
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    HttpClientModule,
    GraphQLModule,
    RoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: () => new JssTranslationClientLoaderService(new JssTranslationLoaderService()),
        deps: [HttpClient, TransferState]
      }
    }),
    AppComponentsModule,
  ],
  providers: [
    JssContextService,
    JssDataFetcherService,
    JssLayoutService,
    JssMetaService,
    // IMPORTANT: you must set the base href with this token, not a <base> tag in the HTML.
    // the Sitecore Experience Editor will not work correctly when a base tag is used.
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
