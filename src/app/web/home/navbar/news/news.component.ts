import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { NewsChiTietComponent } from './news-chi-tiet/news-chi-tiet.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  gioHang:any;
  p = 0;
  listTinTuc:any;
   constructor (private q:DuLieuService,private modalService: NgbModal) {}
   ngOnInit(): void {
     this.listTinTuc = this.q.getListTinTuc().subscribe(data=>{
      if(data){
        this.listTinTuc =data;
      }
     })
   }
   
}
