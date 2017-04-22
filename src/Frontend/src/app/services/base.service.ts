import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class BaseService {

    protected extractData<TType>(res: Response) : TType {
        let responseBody = res.json();
        return (responseBody || {}) as TType;
    }

    protected handleError(error: Response | any) {
        // TODO: logging could go here
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}