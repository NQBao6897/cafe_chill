import { Component ,OnInit,Input,ViewChild} from '@angular/core';
import {DuLieuService} from '../../data/du-lieu.service'
import { ToastrService } from 'ngx-toastr';
import {ExportService} from '..//../services/export.service';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzNotificationService } from 'ng-zorro-antd/notification';
export interface VirtualDataInterface {
  index: number;
  created_at:any;
  name: string;
  phone: number;
  email: string;
  note:string;
  danhmuc:string;
}
@Component({
  selector: 'app-quanlylienhe',
  templateUrl: './quanlylienhe.component.html',
  styleUrls: ['./quanlylienhe.component.css']
})
export class QuanlylienheComponent implements OnInit {
  @ViewChild('virtualTable', { static: false })  nzTableComponent?: NzTableComponent<VirtualDataInterface>;
  searchValue = '';
  visible = false;
  checked = false;
  loading = false;
  p=0;
  listhomthu: any = [];
  modalsNumber=0;
  searchText!: string;
  constructor(private n:DuLieuService, public toastr:ToastrService, private exportService: ExportService) {
 
  }
  ngOnInit (): void {
    this.n.getListhomthu().subscribe(data =>
      {
        if (data){
          this.listhomthu = data;
        }
      })
  }
  xoaHT(idht:number){


      this.n.getListhomthuxoa(idht).subscribe(data=> 
        { 
          this.toastr.success('Xóa thành công', 'Hệ Thống', {
            timeOut: 2000,
           })
           this.n.getListhomthu().subscribe(data =>
            {
              if (data){
                this.listhomthu = data;
             
              }
            }) 
        }

        )
        
    
   }
   export() {
    this.exportService.exportExcel(this.listhomthu, 'Danh sách hộ trợ khách hàng');
  }
  reset(): void {
    this.searchValue = '';
    // this.search();
  }
}
