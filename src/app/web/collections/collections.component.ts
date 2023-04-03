import { Component,Input } from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { debounceTime, fromEvent, map, tap } from 'rxjs';
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent {

  // Expansion-overview
  panelOpenState = false;
  // 
  mucLuc:any;
  mucLucLooaiSP:any;
  gioHang: any; 
  constructor(
    private y:DuLieuService,
    private l:DuLieuService
    ){}
  ngOnInit() :void{

    this.y.getMucLucSanPham().subscribe(data=>{
      if(data){
        // console.log(data);
        this.mucLuc=data;
      }
    })
    this.l.getListloaisanpham().subscribe(data=>{
      if(data){
        // console.log(data);
        this.mucLucLooaiSP=data;
      }
    })
  }
  notify():void {
    console.log('notify');
  }
  // Expansion-overview
  // showBtn$ = fromEvent(document, 'scroll').pipe(
  //   debounceTime(50),
  //   map(() => window.scrollY > -150),
  //   tap(() => console.log('sas'))
  // );
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  cart(arr:any){
    this.gioHang =arr
  }
}