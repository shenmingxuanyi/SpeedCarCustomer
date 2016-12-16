import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const IP_REGEXP = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;

//验证依赖
const IP_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IPValidator),
    multi: true
};

/*
 ip

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.ip" name="ip" type="text" validateIP="true" placeholder="请输入ip"></ion-input>

 example2:
 this.formBuilder.group({ip: ['', IPValidator.validate]});

 */
@Directive({
    selector: '[validateIP][formControlName],[validateIP][formControl],[validateIP][ngModel]',
    providers: [IP_VALIDATOR],
    host: {'[attr.validateIP]': 'validateIP ? validateIP : null'}
})
export class IPValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateIP(): boolean {
        return this._isValidate;
    }

    set validateIP(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateIP Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? IPValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return IP_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {ip: true};
    }

}

