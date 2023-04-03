import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { country } from '../shared/country';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { type } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CountyService  implements HttpInterceptor  {
  constructor(private http: HttpClient) { }
  endpoint: string ='https://qtiluvcetnllejtigtmt.supabase.co/rest/v1/rpc/search_sanpham';
  type ='application/json';
  auth  = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aWx1dmNldG5sbGVqdGlndG10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MjgwMTMwNiwiZXhwIjoxOTg4Mzc3MzA2fQ.Qo56jXhomYrZFprd2euSQZw9G5EpL2L2tmpuHRB8Yxo';
  key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aWx1dmNldG5sbGVqdGlndG10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MjgwMTMwNiwiZXhwIjoxOTg4Mzc3MzA2fQ.Qo56jXhomYrZFprd2euSQZw9G5EpL2L2tmpuHRB8Yxo';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'apikey'       : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aWx1dmNldG5sbGVqdGlndG10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MjgwMTMwNiwiZXhwIjoxOTg4Mzc3MzA2fQ.Qo56jXhomYrZFprd2euSQZw9G5EpL2L2tmpuHRB8Yxo',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aWx1dmNldG5sbGVqdGlndG10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MjgwMTMwNiwiZXhwIjoxOTg4Mzc3MzA2fQ.Qo56jXhomYrZFprd2euSQZw9G5EpL2L2tmpuHRB8Yxo',
      },
    });
    return next.handle(req);
  }
  searchCountry(term: string): Observable<country[]> {
    const search = new HttpHeaders()
    .set('Content-Type',this.type)
    .set('apikey',this.key)
    .set('Authorization',this.auth)
    // .set('Range','0-9')
    let url = `${this.endpoint}`;
    if (!term.trim()) {
        return of([]);
    }
    return this.http
        .post<country[]>(url,{ "s":term})
        .pipe(catchError(this.handleError<country[]>('',[])));
  }
  private handleError<T>(operation='operation',result?:T) {
    return (error:any ): Observable<T> => {
        console.log(`failed: ${error.message}`);
        return of (result as T);
    }
  }
}