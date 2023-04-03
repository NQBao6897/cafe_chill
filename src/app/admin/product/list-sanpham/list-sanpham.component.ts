import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from './../../../../environments/environment'
@Component({
  selector: 'app-list-sanpham',
  templateUrl: './list-sanpham.component.html',
  styleUrls: ['./list-sanpham.component.css']
})
export class ListSanphamComponent implements OnInit {
  constructor (private _http:HttpClient) {}
  listSanpham: any;
  ngOnInit(): void {
   const headers = new HttpHeaders()
   .set('apikey',environment.key)
   .set('Authorization',environment.auth)
    this._http.get(environment.api +'/sanpham?select=*',{'headers':headers}).subscribe(data => {
      if(data) {
        this.listSanpham = data;
      }
   
    })
  }
}
