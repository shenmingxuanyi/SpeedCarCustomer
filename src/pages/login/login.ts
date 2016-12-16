import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MainPage} from "../main/main";
import {HttpResourceService} from "../../providers/http-resource-service/http-resource-service";
import {RESTFUL_RESOURCES} from "../../configs/resource.config";

/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    //type:1:正常登录,2:快捷登录
    driverModel: any = {driverMobile: null, password: null, verifyCode: null, type: 1};

    constructor(public navCtrl: NavController, public httpResourceService: HttpResourceService) {

    }

    ionViewDidLoad() {
        console.log('Hello LoginPage Page');
    }

    login($event, form) {
        this.httpResourceService.post(RESTFUL_RESOURCES.DRIVER.DRIVER_LOGIN, this.driverModel)
            .subscribe((data) => {
                console.log(data);
                this.navCtrl.setRoot(MainPage);
            })


    }

}
