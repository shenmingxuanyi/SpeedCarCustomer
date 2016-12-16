import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const STRING_CN_REGEXP = /[^u4E00-u9FA5]/g;

//验证依赖
const STRING_CN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => StringCNValidator),
    multi: true
};

/*
 汉字

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.stringCn" name="stringCn" type="text"
 validateStringCN="true" placeholder="请输入中文"></ion-input>

 example2:
 this.formBuilder.group({stringCN: ['', StringCNValidator.validate]});

 */
@Directive({
    selector: '[validateStringCN][formControlName],[validateStringCN][formControl],[validateStringCN][ngModel]',
    providers: [STRING_CN_VALIDATOR],
    host: {'[attr.validateStringCN]': 'validateStringCN ? validateStringCN : null'}
})
export class StringCNValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateStringCN(): boolean {
        return this._isValidate;
    }

    set validateStringCN(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateStringCN Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? StringCNValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return STRING_CN_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {stringCn: true};
    }

}
