import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl} from "@angular/forms";

//验证依赖
const ID_CARD_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IDCardValidator),
    multi: true
};

/*
 身份证

 example1:
 <ion-input clearInput text-right [(ngModel)]="validateModel.idCard" name="idCard" type="text" validateIDCard="true" placeholder="请输入身份证"></ion-input>
 example2:
 this.formBuilder.group({idCard: ['', IDCardValidator.validate]});

 */
@Directive({
    selector: '[validateIDCard][formControlName],[validateIDCard][formControl],[validateIDCard][ngModel]',
    providers: [ID_CARD_VALIDATOR],
    host: {'[attr.validateIDCard]': 'validateIDCard ? validateIDCard : null'}
})
export class IDCardValidator implements Validator {

    private _onChange: () => void;
    private _isValidate: boolean;

    @Input()
    get validateIDCard(): boolean {
        return this._isValidate;
    }

    set validateIDCard(value: boolean) {
        this._isValidate = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) this._onChange();
    }

    constructor() {
        console.log('Constructor ValidateIDCard Directive');
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this._isValidate ? IDCardValidator.validate(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    static validate: ValidatorFn = (control: AbstractControl): {[key: string]: any} => {

        /**七日校验规则，考虑闰月闰年*/
        function isDate8(sDate) {
            if (!/^[0-9]{8}$/.test(sDate)) {
                return false;
            }
            var year, month, day;
            year = sDate.substring(0, 4);
            month = sDate.substring(4, 6);
            day = sDate.substring(6, 8);
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (year < 1700 || year > 2500) return false
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
            if (month < 1 || month > 12) return false
            if (day < 1 || day > iaMonthDays[month - 1]) return false
            return true;
        };

        /**校验身份证 根据地区 校验位 计算公式*/
        function isIdCardNo(num) {
            if (null == num) {
                return true;
            }
            var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
            var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
            var varArray = new Array();

            var lngProduct = 0;
            var intCheckDigit;
            var intStrLen = num.length;
            var idNumber = num;
            // 判断19位
            if (intStrLen != 18) {
                return false;
            }
            // 检验数字和最后一位字母
            for (let i = 0; i < intStrLen; i++) {
                varArray[i] = idNumber.charAt(i);
                if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                    return false;
                } else if (i < 17) {
                    varArray[i] = varArray[i] * factorArr[i];
                }
            }

            //8位日期检查
            var date8 = idNumber.substring(6, 14);
            if (isDate8(date8) == false) {
                return false;
            }

            for (let i = 0; i < 17; i++) {
                lngProduct = lngProduct + varArray[i];
            }

            intCheckDigit = parityBit[lngProduct % 11];

            if (varArray[17] != intCheckDigit) {
                return false;
            }
            return true;
        };

        return isIdCardNo(control.value) || '' == control.value ? null : {idCard: true};
    }

}
