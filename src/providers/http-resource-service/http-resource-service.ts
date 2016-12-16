import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, Response, RequestOptionsArgs, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import {Observable} from "rxjs";
import {LoadingController, ToastController, LoadingOptions, ToastOptions, Events} from "ionic-angular";
import {RESTFUL_RESOURCE_ENDPOINT} from "../../configs/resource.config";
import {RESPONSE_TYPE} from "../../configs/http-resource.config";
import {SYSTEM_EVENTS} from "../../configs/event.config";


export const HTTP_RESOURCE_VIEW_CONFIG_CONSTANT = {
    LOADING_OPTIONS: {
        spinner: null,
        content: "请稍后...",
        cssClass: null,
        showBackdrop: null,
        dismissOnPageChange: null,
        delay: null,
        duration: null
    },
    TOAST_OPTIONS: {
        message: "请求出现了错误",
        cssClass: null,
        duration: 3000,
        showCloseButton: null,
        closeButtonText: null,
        dismissOnPageChange: null,
        position: 'middle'
    }
};

@Injectable()
export class HttpResourceService {

    requestOptionsArgs: RequestOptionsArgs = {
        search: new URLSearchParams(),
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*'
        })
    };

    loadingOptions: LoadingOptions;

    toastOptions: ToastOptions;

    private _loadingCounter = 0;

    private _loading: any = null;

    private _baseURL = RESTFUL_RESOURCE_ENDPOINT;

    constructor(public http: Http, private loadingController: LoadingController, private toastController: ToastController, public events: Events) {
        console.log('Constructor HttpResourceService Provider');
        this.loadingOptions = HTTP_RESOURCE_VIEW_CONFIG_CONSTANT.LOADING_OPTIONS;
        this.toastOptions = HTTP_RESOURCE_VIEW_CONFIG_CONSTANT.TOAST_OPTIONS;

    }

    httpUIPoxy(observable: Observable<Response>, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean, isHasOwnObservableMap?: boolean): Observable<any> {

        let _loadingOptions = {show: true};
        let _toastOptions = {show: true};

        if (false === loadingOptions) {
            _loadingOptions = {show: false};
        } else if (true !== loadingOptions) {
            _loadingOptions = Object.assign(_loadingOptions, loadingOptions);
        }

        if (false === toastOptions) {
            _toastOptions = {show: false};
        } else if (true !== toastOptions) {
            _toastOptions = Object.assign(_toastOptions, toastOptions);
        }


        if (_loadingOptions.show) {
            if (this._loadingCounter == 0) {
                this._loading = this.loadingController.create(Object.assign({}, this.loadingOptions, _loadingOptions));
                this._loading.present();
                ++this._loadingCounter;
            } else {
                ++this._loadingCounter;
            }
        }

        if (null == isHasOwnObservableMap) {
            isHasOwnObservableMap = true;
        }

        return ((isHasOwnObservableMap ? observable
            .map((response) => {
                let responseJson = response.json();
                if (RESPONSE_TYPE.SUCCESS != responseJson['code']) {
                    if (_toastOptions.show) {
                        this.toastController.create(Object.assign({}, this.toastOptions, {message: responseJson['information'] || '请求出现了错误'}, _toastOptions)).present();
                    }
                }
                if (RESPONSE_TYPE.OTHER == responseJson['code']) {
                    this.events.publish(SYSTEM_EVENTS.SECURITY.LOGOUT);
                }
                return responseJson;
            }) : observable) as Observable<any>)
            .catch((error) => {
                if (_loadingOptions.show) {
                    if (this._loading) {
                        if (this._loadingCounter > 1) {
                            --this._loadingCounter;
                        } else {
                            this._loading.dismiss();
                            --this._loadingCounter;
                        }
                    }
                }
                if (_toastOptions.show) {
                    this.toastController.create(Object.assign({}, this.toastOptions, {message: null != error ? JSON.stringify(error) : '请求出现了错误'}, _toastOptions)).present();
                }
                return Observable.throw(error);
            })
            .finally(() => {
                if (_loadingOptions.show) {
                    if (this._loading) {
                        if (this._loadingCounter > 1) {
                            --this._loadingCounter;
                        } else {
                            this._loading.dismiss();
                            --this._loadingCounter;
                        }
                    }
                }
            });
    }

    request(url: string | Request, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {

        return this.httpUIPoxy(this.http.request(this._baseURL + url, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);

    }

    get(url: string, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions, toastOptions?: ToastOptions): Observable<Response> {
        return this.httpUIPoxy(this.http.get(this._baseURL + url, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);
    }


    post(url: string, body: any, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {
        console.log(Object.assign({}, this.requestOptionsArgs, options));
        return this.httpUIPoxy(this.http.post(this._baseURL + url, body, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);
    }


    put(url: string, body: any, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {
        return this.httpUIPoxy(this.http.put(this._baseURL + url, body, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);

    }


    delete(url: string, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {
        return this.httpUIPoxy(this.http.delete(this._baseURL + url, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);
    }


    patch(url: string, body: any, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {
        return this.httpUIPoxy(this.http.patch(this._baseURL + url, body, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);
    }


    head(url: string, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {
        return this.httpUIPoxy(this.http.head(this._baseURL + url, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);
    }


    options(url: string, options?: RequestOptionsArgs, loadingOptions?: LoadingOptions|boolean, toastOptions?: ToastOptions|boolean): Observable<any> {
        return this.httpUIPoxy(this.http.options(this._baseURL + url, Object.assign({}, this.requestOptionsArgs, options)), loadingOptions, toastOptions);
    }

    setBaseUrl(url: string) {
        this._baseURL = url;
        this.requestOptionsArgs.headers.set("Access-Control-Allow-Origin", url);
    }

    getBaseUrl() {
        return this._baseURL;
    }
}
