import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
// Components
import {NotificationsComponent} from './components/notifications/notifications.component';
import {SecondPageModule} from './pages/modal/second/second.module';
import {GraphPageModule} from './pages/modal/graph/graph.module';
import {ProxyNamePipe} from './shared/pipe/proxy-name.pipe';
import {IonicStorageModule} from '@ionic/storage';
import {SeverityPipe} from './shared/pipe/severity.pipe';
import {MainPipe} from './shared/pipe/main-pipe.module';

// Modal Pages


@NgModule({
  declarations: [AppComponent, NotificationsComponent, ProxyNamePipe   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
      GraphPageModule,
      SecondPageModule
  ],
  entryComponents: [NotificationsComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
