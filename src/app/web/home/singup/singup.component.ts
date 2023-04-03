import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from 'src/app/app.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import axios from 'axios';
declare var $: any;
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit {
  singup: FormGroup | any;
  url: any;
  files: File[] = [];
  token: any;
  tenDN:any;
  get f() {
    return this.singup.controls;
  }
  submitted = false;
  constructor(
    public toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private t: DuLieuService
  ) {}
  //----------------------------------------------------------------
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    //Thông báo
    // const {checkUser} = MyValidators;
    this.singup = this.formBuilder.group({
      fname: [null, [Validators.required,Validators.minLength(6)]],
      lname: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(19)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      password: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
      checkPassword: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
    },
    {
      validatorsUser: this.userValidator('fname'),
      validators: this.ConfirmedValidator('password', 'checkPassword'),
    }
    );
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  userValidator( matchingControlusername: string) {
    return (formGroup: FormGroup) => {
      const controlUser = this.tenDN;
      const matchingControlUser = formGroup.controls[matchingControlusername];
      console.log(controlUser ,matchingControlUser.value)
      if (
        matchingControlUser.errors &&
        !matchingControlUser.errors['userValidator']
      ) {
        return;
      }
      if (controlUser == matchingControlUser.value) {
        matchingControlUser.setErrors({ userValidator: true });
      } else {
        matchingControlUser.setErrors(null);
      }
    };
  }
  // checkUser(event:KeyboardEvent){
  //   const  checkTK = (<HTMLInputElement>event.target).value;
  //   if(checkTK) {
  //     this.t.getTaiKhoan(checkTK).subscribe((data:any)=>{
  //       if(data && data!= null){
  //         const user =data[0]
  //         if(user!= undefined){
  //           this.tenDN = user.fname
  //           console.log( this.tenDN )
  //         }
  //       }
  //     })
  //   }
  // }
  // Form tạo thông tin tài khoản
  async singupdata(singup: any) {
    const  checkTK = singup.fname
    if(checkTK) {
      this.t.getTaiKhoan(checkTK).subscribe((data:any)=>{
        if(data && data!= null){
          const user =data[0]
         if(user!= undefined){
            this.tenDN = user.fname
            console.log( this.tenDN )
         }
        }
      })
    }
    this.submitted = true;
    var fname = singup.fname;
    var lname = singup.lname;
    var email = singup.email;
    var phone = singup.phone;
    var password = singup.password;
    var token = this.token;
    if (fname && lname && email && phone && password && token) {
      if (this.singup.invalid) {
        return;
      }
      // Loadding img
      if(this.files[0]){
        const file_data = this.files[0];
        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'img_sanpham');
        data.append('cloud_name', 'dctltae7e');
        data.append('folder', 'Avatar');
        try {
          const result = await axios.post(
            `https://api.cloudinary.com/v1_1/dctltae7e/image/upload`,
            data
          );
          // console.log(result);
          this.url = result.data.secure_url;
          // console.log(this.url);
        } catch (e) {
          console.error(e);
        }
      }
      const user = {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        avatar: this.url,
        password: password,
        token: token,
      };
      this.t.taoTaiKhoang(user).subscribe(
        (data) => {
          if (user) {
            this.submitted = false;
            this.files = [];
            this.singup.reset(fname, lname, email, phone, password);
            // console.log(user);
            this.notification.success('Hệ Thông', 'Tạo tài khoản thành công');
            this._router.navigate(['dang-nhap']);
          }
        },
        (err) => {
          this.notification.error('Hệ Thông', 'Lỗi dữ liệu');
        }
      );
    } else {
      this.notification.warning('Hệ Thông', 'Tạo tài khoản thất bại');
    }
  }
  // Quay lại đăng nhập
  sbtn() {
    this._router.navigate(['dang-nhap']);
  }
  // up img
  onSelect(event: { addedFiles: any }) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: File) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  randomToken() {
    function randomString(length: any, chars: any) {
      var result = '';
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    var rString = randomString(
      450,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );
    this.token = rString;
    // console.log(rString);
  }
}
//Lập điều kiện thông báo 
export type MyErrorsOptions = { 'zh-cn':string; en:string} & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export class MyValidators extends Validators {
//  static override checkUser()
}