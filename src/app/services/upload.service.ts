import {Injectable} from '@angular/core'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable()
export class uploadService {
    constructor(
        private _http: HttpClient
    ){}
    UploadImg(vals:any): Observable<any>{
        let data = vals;
        return this._http.post(
            'https://api.cloudinary.com/v1_1/dctltae7e/image/upload',data
        );
    } 
}