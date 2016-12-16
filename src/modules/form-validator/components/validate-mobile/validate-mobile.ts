import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const MOBILE_REGEXP = /^1[0-9]{10}$/;

//验证依赖
const MOBILE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MobileValidator),
    multi: true
};

/*
 手机号

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.mobile" name="mobile" type="text" validateMobile="true" placeholder="请输入手机号"></ion-input>

 example2:
 this.formBuilder.group({mobile: ['', MobileValidator.validate]});

 */
@Directive({
    selector: '[validateMobile][formControlName],[validateMobile][formControl],[validateMobile][ngModel]',
    providers: [MOBILE_VALIDATOR],
    host: {'[attr.validateMobile]': 'validateMobile ? validateMobile : null'}
})
export class MobileValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateMobile(): boolean {
        return this._isValidate;
    }

    set validateMobile(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateMobile Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? MobileValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return MOBILE_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {mobile: true};
    }

}
