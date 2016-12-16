import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const ALNUM_REGEXP = /^[a-zA-Z0-9]+$/;

//验证依赖
const ALNUM_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AlnumValidator),
    multi: true
};

/*
 英文或数字

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.alnum" name="alnum" type="text" validateAlnum="true" placeholder="请输入英文或数字"></ion-input>

 example2:
 this.formBuilder.group({alnum: ['', AlnumValidator.validate]});

 */
@Directive({
    selector: '[validateAlnum][formControlName],[validateAlnum][formControl],[validateAlnum][ngModel]',
    providers: [ALNUM_VALIDATOR],
    host: {'[attr.validateAlnum]': 'validateAlnum ? validateAlnum : null'}
})
export class AlnumValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateAlnum(): boolean {
        return this._isValidate;
    }

    set validateAlnum(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateAlnum Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? AlnumValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return ALNUM_REGEXP.test(control.value) || null == control.value ? null : {alnum: true};
    }

}
