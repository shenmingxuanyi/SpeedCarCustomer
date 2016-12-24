import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';

/*
 Generated class for the Main page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {

    constructor(public navCtrl: NavController, public menuController: MenuController) {
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        this.menuController.enable(true);
    }

    ionViewDidLeave() {
        if (this.menuController.isOpen()) {
            this.menuController.close()
                .then(() => {
                    this.menuController.enable(false);
                });
        } else {
            this.menuController.enable(false);
        }
    }

}
