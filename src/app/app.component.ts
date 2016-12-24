import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {IndexPage} from "../pages/index/index";
import {LoginPage} from "../pages/login/login";
import {MainPage} from "../pages/main/main";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = IndexPage;


    constructor(public platform: Platform) {
        this.initializeApp();
        this.rootPage = MainPage;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            setTimeout(() => {
                Splashscreen.hide();
            }, 300);

        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    securityExit($event) {
        this.nav.setRoot(IndexPage)
    }
}
