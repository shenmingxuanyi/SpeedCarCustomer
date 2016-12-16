/**
 * Created by zhaojunming on 16/11/21.
 */

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AlnumValidator} from "./components/validate-alnum/validate-alnum";
import {AmountValidator} from "./components/validate-amount/validate-amount";
import {DigitsValidator} from "./components/validate-digits/validate-digits";
import {EmailValidator} from "./components/validate-email/validate-email";
import {IDCardValidator} from "./components/validate-id-card/validate-id-card";
import {IPValidator} from "./components/validate-ip/validate-ip";
import {MobileValidator} from "./components/validate-mobile/validate-mobile";
import {PostalCodeValidator} from "./components/validate-postal-code/validate-postal-code";
import {StringENValidator} from "./components/validate-string-en/validate-string-en";
import {StringCNValidator} from "./components/validate-string-cn/validate-string-cn";
import {URLValidator} from "./components/validate-url/validate-url";


@NgModule({
    declarations: [
        AlnumValidator,
        AmountValidator,
        DigitsValidator,
        EmailValidator,
        IDCardValidator,
        IPValidator,
        MobileValidator,
        PostalCodeValidator,
        StringENValidator,
        StringCNValidator,
        URLValidator
    ],
    imports: [FormsModule],
    bootstrap: [],
    entryComponents: [],
    providers: [],
    exports: [
        AlnumValidator,
        AmountValidator,
        DigitsValidator,
        EmailValidator,
        IDCardValidator,
        IPValidator,
        MobileValidator,
        PostalCodeValidator,
        StringENValidator,
        StringCNValidator,
        URLValidator
    ]
})
export class FormValidateModule {
}