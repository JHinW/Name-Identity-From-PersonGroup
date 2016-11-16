import { Injectable } from '@angular/core';
import { Image, Images } from '../entity/imageList.entity';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FaceApiCall {

    constructor(private http: Http) {}
    
    getDefaultImages(): Promise<Image[]> {
        return Promise.resolve(Images);
    }

    postLinkImage(body: Object): Observable<any> {
        let url = '/Home/IdentifyLinkAsync';
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers })
        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) =>
                Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getPerson(personId: string): Observable<any> {
        let url = '/Home/GetPerson?personId=' + personId;
        return this.http.get(url) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) =>
                Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

}