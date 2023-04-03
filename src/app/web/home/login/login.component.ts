import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from 'src/app/app.component';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { environment } from 'src/environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {JwtUtil} from '../../.././auth/services/jwt'
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() taiKhoan = new EventEmitter();
  login: FormGroup | any;
  submitted = false;
  token='';
  get f() {
    return this.login.controls;
  }
  constructor(
    public toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {}
  // Thông báo error login
  onSubmit() {
    this.submitted = true;
    // Dừng nếu chưa đủ thông tin
    if (this.login.invalid) {
      return;
    }
    if (this.submitted) {
      // alert("Chào mừng " + this.login.value.fname + " đến với cafe Chill");
    }
  }
  //----------------------------------------------------------------
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.login = new FormGroup({
      fname: new FormControl(),
      password: new FormControl(),
    });
    // error login
    this.login = this.formBuilder.group({
      fname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  logindata(login: FormGroup) {
    const logins = new HttpHeaders()
      .set('apikey', environment.key)
      .set('Authorization', environment.auth);
    // console.log(this.login.value);
    this._http
      .get<any>(environment.api + '/Login?select=*', { headers: logins })
      .subscribe(
        (res) => {
          const user = res.find((a: any) => {
            return (
              a.fname === this.login.value.fname &&
              a.password === this.login.value.password
            );
          });
          this.taiKhoan.emit(user);

          // console.log(user);
          if (user) {
            JwtUtil.setUserToken(user.token)
            this.notification.success('Thông Báo', 'Đăng nhập thành công');
            this.submitted = false;
            this.login.reset();
               this._router.navigate(['Web-home']);
            // $('.form-box').css('display', 'none');
            // $('.box-logIn').css('display', 'none');
            // $('.form-maneger').css('display', 'block');
            // $('.show-text-tk').css('display', 'block');
          } else {
            this.notification.warning('Thông Báo', 'Đăng nhập thất bại');
          }
        },
        (err) => {
          this.notification.error('Thông Báo', 'Lỗi dữ liệu');
        }
      );
  }
  sbtn1() {
    this._router.navigate(['dang-ky']);
  }
  Close() {
    $('.form-box').css('display', 'none');
    // $('.modal-dialog').css('display','none');
  }
  // toaster
  // showSuccess(){
  //   this.toastr.success('Thành công', 'Đăng nhập', {
  //  timeOut: 3000,
  // });
  //  }
  //  showError(){
  //   this.toastr.error('everything is broken', 'Major Error', {
  //  timeOut: 3000,
  // });
  //  }
  //   showInfo(){
  //   this.toastr.info('everything is broken', 'Major Error', {
  //  timeOut: 3000,
  // });
  //  }
  //   showWarning(){
  //   this.toastr.warning('Lỗi', 'Hệ Thống', {
  //  timeOut: 3000,
  // });
  //  }
}
