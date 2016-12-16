import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const POSTAL_CODE_REGEXP = /^[0-9]{6}$/;

//验证依赖
const POSTAL_CODE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PostalCodeValidator),
    multi: true
};

/*
 英文或数字

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.postalCode" name="postalCode" type="text"
 validatePostalCode="true" placeholder="请输入邮政编码"></ion-input>
 example2:
 this.formBuilder.group({postalCode: ['', PostalCodeValidator.validate]});

 */
@Directive({
    selector: '[validatePostalCode][formControlName],[validatePostalCode][formControl],[validatePostalCode][ngModel]',
    providers: [POSTAL_CODE_VALIDATOR],
    host: {'[attr.validatePostalCode]': 'validatePostalCode ? validatePostalCode : null'}
})
export class PostalCodeValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validatePostalCode(): boolean {
        return this._isValidate;
    }

    set validatePostalCode(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidatePostalCode Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? PostalCodeValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return POSTAL_CODE_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {postalCode: true};
    }

}
