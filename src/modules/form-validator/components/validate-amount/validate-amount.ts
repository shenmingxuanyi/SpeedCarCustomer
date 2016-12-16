import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//正则表达式
const AMOUNT_REGEXP = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;

//验证依赖
const AMOUNT_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AmountValidator),
    multi: true
};

/*
 金额

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.amount" name="amount" type="text" validateAmount="true" placeholder="请输入金额"></ion-input>

 example2:
 this.formBuilder.group({amount: ['', AmountValidator.validate]});

 */
@Directive({
    selector: '[validateAmount][formControlName],[validateAmount][formControl],[validateAmount][ngModel]',
    providers: [AMOUNT_VALIDATOR],
    host: {'[attr.validateAmount]': 'validateAmount ? validateAmount : null'}
})
export class AmountValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateAmount(): boolean {
        return this._isValidate;
    }

    set validateAmount(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateAmount Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? AmountValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {
        return AMOUNT_REGEXP.test(control.value) || null == control.value || '' == control.value ? null : {amount: true};
    }

}

