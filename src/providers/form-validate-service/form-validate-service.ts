import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";
import {NgForm, AbstractControl} from "@angular/forms";
import {VALIDATE_MESSAGE_CONSTANT} from "../../configs/validate.config";


/*
 Generated class for the FormValidateService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FormValidateService {

    constructor(public toastController: ToastController) {
    }

    validateNgForm(ngForm: NgForm, validateMessage?: any): boolean {

        for (let conrolKey in ngForm.controls) {
            if (ngForm.controls[conrolKey].invalid && ngForm.controls[conrolKey].enabled) {
                for (let errorKey in ngForm.controls[conrolKey].errors) {
                    let message = '请输入正确的信息';
                    if (validateMessage && validateMessage[conrolKey]) {
                        message = validateMessage[conrolKey][errorKey] || VALIDATE_MESSAGE_CONSTANT[errorKey];
                    } else {
                        message = VALIDATE_MESSAGE_CONSTANT[errorKey];
                    }
                    this.toastController.create({
                        message: message,
                        position: 'middle',
                        duration: 2000,
                        cssClass: 'toast-invalid-message',
                        dismissOnPageChange: true
                    }).present();
                    break;
                }
                break;
            }
        }

        return ngForm.valid;
    }

    validateNgControls(ngControls: {[key: string]: AbstractControl;}, validateMessage?: any): boolean {

        let valid = true;

        for (let conrolKey in ngControls) {
            if (ngControls[conrolKey].invalid && ngControls[conrolKey].enabled) {
                valid = false;
                for (let errorKey in ngControls[conrolKey].errors) {
                    let message = '请输入正确的信息';
                    if (validateMessage && validateMessage[conrolKey]) {
                        message = validateMessage[conrolKey][errorKey] || VALIDATE_MESSAGE_CONSTANT[errorKey];
                    } else {
                        message = VALIDATE_MESSAGE_CONSTANT[errorKey];
                    }
                    this.toastController.create({
                        message: message,
                        position: 'middle',
                        duration: 3000,
                        cssClass: 'toast-invalid-message',
                        dismissOnPageChange: true
                    }).present();
                    break;
                }
                break;
            }
        }

        return valid;
    }
}

