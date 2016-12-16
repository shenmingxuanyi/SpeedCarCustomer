import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

/*
 Generated class for the Index page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-index',
    templateUrl: 'index.html'
})
export class IndexPage {

    constructor(public navCtrl: NavController) {
    }

    ionViewDidLoad() {
        console.log('Hello IndexPage Page');
    }

    goLoginPage($event) {
        this.navCtrl.push(LoginPage)
    }

    goRegisterPage($event) {
        this.navCtrl.push(RegisterPage)
    }


}
