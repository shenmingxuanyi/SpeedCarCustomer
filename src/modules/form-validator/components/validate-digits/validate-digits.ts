import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const DIGITS_REGEXP = /^[1-9][0-9]*$/;

//验证依赖
const DIGITS_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DigitsValidator),
    multi: true
};

/*
 整数

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.digits" name="digits" type="text" validateDigits="true" placeholder="请输入整数"></ion-input>

 example2:
 this.formBuilder.group({digits: ['', DigitsValidator.validate]});

 */
@Directive({
    selector: '[validateDigits][formControlName],[validateDigits][formControl],[validateDigits][ngModel]',
    providers: [DIGITS_VALIDATOR],
    host: {'[attr.validateDigits]': 'validateDigits ? validateDigits : null'}
})
export class DigitsValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateDigits(): boolean {
        return this._isValidate;
    }

    set validateDigits(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateDigits Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? DigitsValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return DIGITS_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {digits: true};
    }

}
