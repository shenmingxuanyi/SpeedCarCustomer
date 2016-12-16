import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const STRING_EN_REGEXP = /^[A-Za-z]+$/g;

//验证依赖
const STRING_EN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => StringENValidator),
    multi: true
};

/*
 英文字符串

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.stringEn" name="stringEn" type="text"
 validateStringEN="true" placeholder="请输入英文"></ion-input>

 example2:
 this.formBuilder.group({stringEN: ['', StringENValidator.validate]});

 */
@Directive({
    selector: '[validateStringEN][formControlName],[validateStringEN][formControl],[validateStringEN][ngModel]',
    providers: [STRING_EN_VALIDATOR],
    host: {'[attr.validateStringEN]': 'validateStringEN ? validateStringEN : null'}
})
export class StringENValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateStringEN(): boolean {
        return this._isValidate;
    }

    set validateStringEN(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateStringEN Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? StringENValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return STRING_EN_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {stringEn: true};
    }

}
