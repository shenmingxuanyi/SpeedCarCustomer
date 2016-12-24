import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MyApp} from './app.component';
import {FormValidateModule} from "../modules/form-validator/module";
import {HttpResourceService} from "../providers/http-resource-service/http-resource-service";
import {FormValidateService} from "../providers/form-validate-service/form-validate-service";
import {PLATFORMS_CONFIG_CONSTANT} from "../configs/platform.config";
import {DEEP_LINK_CONFIG} from "../configs/deep-linker.config";
import {IndexPage} from "../pages/index/index";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {MainPage} from "../pages/main/main";
import {ProvideStorage} from "../configs/stroage.config";

//页面
const PAGES = [IndexPage, LoginPage, RegisterPage, MainPage];
//管道
const PIPES = [];
//组件
const COMPONENTS = [];
//指令
const DIRECTIVES = [];
//服务
const PROVIDERS = [HttpResourceService, FormValidateService];
//模块
const MODULES = [FormValidateModule];


@NgModule({
    declarations: [
        MyApp,
        ...PAGES,
        ...DIRECTIVES,
        ...COMPONENTS,
        ...PIPES
    ],
    imports: [
        IonicModule.forRoot(MyApp, PLATFORMS_CONFIG_CONSTANT, DEEP_LINK_CONFIG),
        ...MODULES
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ...PAGES,
        ...DIRECTIVES,
        ...COMPONENTS,
        ...PIPES
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, {
        provide: Storage,
        useFactory: ProvideStorage
    }, ...PROVIDERS]
})
export class AppModule {
}
