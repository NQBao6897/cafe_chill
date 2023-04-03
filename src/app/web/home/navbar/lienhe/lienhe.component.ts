import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { DuLieuService } from '../../../../data/du-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.css']
})
export class LienheComponent implements OnInit {
  gioHang:any;
  listlienhe:any|FormGroup;
  submitted = false;
  constructor(private notification: NzNotificationService, public toastr:ToastrService, private formBuilder: FormBuilder,private n:DuLieuService){}
  //Add user form actions
  get f() { return this.listlienhe.controls; }
  guihomthu(listlienhe:any){
    this.submitted = true;
    var name=listlienhe.name;
    var phone=listlienhe.phone;
    var email=listlienhe.email;
    var danhmuc=listlienhe.danhmuc;
    var note=listlienhe.note;
    if(name && phone && email && danhmuc && note){
      if (this.listlienhe.invalid) {
        return;
      }
      this.n.getListhomthuthem(listlienhe).subscribe(data =>{
        if(listlienhe){
          this.submitted = false;
          this.listlienhe.reset(name,phone,email,danhmuc,note)
          console.log(name,phone,email,danhmuc,note);
          this.notification.success(
            'Thông Báo',
            'Gửi thàng công'
            );
        }
      },erorr=>{
        this.notification.warning(
          'Thông Báo',
          'Sai dữ liệu'
          );
      })
    }else{
      this.notification.warning(
        'Thông Báo',
        'Gửi không thàng công'
        );
    }
  }
  ngOnInit() {
    this.listlienhe = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],
      email: ['', [Validators.required, Validators.email]],
      danhmuc: ['', [Validators.required]],
      note: ['', [Validators.required]]
      });
  }
}
