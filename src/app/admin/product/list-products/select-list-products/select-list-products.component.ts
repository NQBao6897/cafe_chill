import { Component,OnInit } from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';

@Component({
  selector: 'app-select-list-products',
  templateUrl: './select-list-products.component.html',
  styleUrls: ['./select-list-products.component.css']
  
})
export class SelectListProductsComponent implements OnInit  {

  selectedLoaiSP: any;
  constructor (private l:DuLieuService) {}
  ngOnInit(): void {
  this.l.getListloaisanpham().subscribe (data => {

    this.selectedLoaiSP=data
   })
  }
}




