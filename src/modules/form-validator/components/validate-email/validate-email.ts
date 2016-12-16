import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

//验证依赖
const EMAIL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailValidator),
    multi: true
};

/*
 邮箱

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.email" name="email" type="text" validateEmail="true" placeholder="请输入Email"></ion-input>

 example2:
 this.formBuilder.group({email: ['', EmailValidator.validate]});

 */
@Directive({
    selector: '[validateEmail][formControlName],[validateEmail][formControl],[validateEmail][ngModel]',
    providers: [EMAIL_VALIDATOR],
    host: {'[attr.validateEmail]': 'validateEmail ? validateEmail : null'}
})
export class EmailValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateEmail(): boolean {
        return this._isValidate;
    }

    set validateEmail(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateEmail Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? EmailValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return EMAIL_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {email: true};
    }

}
