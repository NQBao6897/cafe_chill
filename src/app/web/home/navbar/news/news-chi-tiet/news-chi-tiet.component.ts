import { Component, Input } from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-chi-tiet',
  templateUrl: './news-chi-tiet.component.html',
  styleUrls: ['./news-chi-tiet.component.css']
})
export class NewsChiTietComponent {
  gioHang:any;
  p = 0;
  listTinTucMoi:any;
  listTinTuc:any;
  constructor(
    private q:DuLieuService,
    private route:ActivatedRoute,
    private service:DuLieuService
    ){}
  ngOnInit (){
    this.getProductDetail();
    this.xemTinTucMoi();
  }
  getProductDetail(){
    this.route.params.subscribe((data:any)=>{
      if (data){
        this.service.getListChiTiecTinTuc(data.id).subscribe(data=>{
          if(data) {
            this.listTinTuc =data
            console.log( this.listTinTuc)
          }
        })
      }
    })
  }
  xemTinTucMoi(){
    this.q.getListTinTuc().subscribe(data=>{
      if(data){
        console.log(data)
        this.listTinTucMoi=data
      }
    })
  }
}
