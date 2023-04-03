import { Component, OnInit, Input } from '@angular/core';
import { DuLieuService } from '../../../data/du-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import axios from 'axios';
declare var $: any;
// updata avatar
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
// services
import { uploadService } from '../../.././services/upload.service';
@Component({
  selector: 'app-them-sanpham',
  templateUrl: './them-sanpham.component.html',
  styleUrls: ['./them-sanpham.component.css'],
  providers: [uploadService],
})
export class ThemSanphamComponent implements OnInit {
  // uploading
  urlAction: any;
  url: any;
  file!: File;
  loading = false;
  avatarUrl?: string;
  fileimg: any;
  files: File[] = [];
  // search
  selectedValue = null;
  // Form
  form!: UntypedFormGroup;
  //
  submitted = false;
  listsanpham: any;
  danhmuc: any;
  sp: any;
  constructor(
    private notification: NzNotificationService,
    private msg: NzMessageService,
    private d: DuLieuService,
    private l: DuLieuService,
    public toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private _uploadService: uploadService
  ) {}
  // get isHorizontal(): boolean {
  //   return this.form.controls.formLayout?.value === 'horizontal';
  // }
  ngOnInit(): void {
    this.l.getListloaisanpham().subscribe((data) => {
      // console.log(data);
      if (data) {
        this.danhmuc = data;
      }
    });
    //  Thông báo
    const { required, minLength } = MyValidators;
    this.form = this.formBuilder.group({
      moTa: [null, [Validators.maxLength(500)]],
      sanpham: [null, [Validators.required, minLength(3)]],
      gia: [null, [Validators.required, minLength(8)]],
      idloaisanpham: [null, [Validators.required]],
      photo: [null, []],
    });
  }
  async spthem(sp: any) {
    //
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'img_sanpham');
    data.append('cloud_name', 'dctltae7e');
    data.append('folder', 'sanpham');
    // this._uploadService.UploadImg(data).subscribe((res) => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });
    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/dctltae7e/image/upload`,
        data
      );
      console.log(result);
      this.url = result.data.secure_url;
      console.log(this.url);
    } catch (e) {
      console.error(e);
    }
    //
    var sanpham = sp.sanpham;
    var gia = sp.gia;
    var danhmuc = sp.idloaisanpham;
    var mota = sp.moTa;
    const themsanPham = {
      id: sp.id,
      sanpham: sp.sanpham,
      gia: sp.gia,
      photo: this.url,
      idloaisanpham: sp.idloaisanpham,
      moTa: sp.moTa,
    };
    // console.log(themsanPham);
    if (sanpham && gia && danhmuc) {
      console.log(sanpham, gia, danhmuc, mota);
      this.d.themSanPham(themsanPham).subscribe(
        (data) => {
          console.log(themsanPham);
          if (themsanPham) {
            this.form.reset();
            this.files = [];
            this.notification.success('Thông Báo', 'Thêm sản phẩm thành công');
            if (data == null) {
              this.d.getListtrasua().subscribe((data) => {
                if (data) {
                  this.listsanpham = data;
                }
                console.log('Loại sản phẩm: ', data);
              });
            }
          }
        },
        (err) => {
          // this.toastr.warning('Lỗi dữ liệu', 'Hệ Thống', {
          //   timeOut: 2000,
          // })
          this.notification.error('Hệ Thông', 'Thêm sản phẩm thất bại');
        }
      );
    } else {
      // this.toastr.error('Tạo Thất bại', 'Hệ Thống', {
      //   timeOut: 2000,
      // })
      this.notification.info('Thông Báo', 'Chưa nhập đủ thông tin');
    }
    this.submitForm();
  }
  close() {
    // $('.modal-backdrop.show').css('display: none !important;');
    // $('.modal-open .modal').css('display: none !important;');
  }
  // uploaing img
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('Không phải kiểu dữ liệu .JPG');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Dung lượng ảnh vượt quá 2MB');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  async handleChange(info: { file: NzUploadFile }) {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;

      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.fileimg = info.file;
          console.log(this.fileimg);
        });
        // this.fileimg = info.file;
        // console.log(this.fileimg);
        // const file_data = this.files[0];
        // const data = new FormData();
        // data.append('file', file_data);
        // data.append('upload_preset', 'img_sanpham');
        // data.append('cloud_name', 'dctltae7e');

        // // this._uploadService.UploadImg(data).subscribe((res) => {
        // //   if (res) {
        // //     console.log(res);
        // //   }
        // // });
        // try {
        //   const result = await axios.post(
        //     `https://api.cloudinary.com/v1_1/dctltae7e/image/upload`,
        //     data,
        //   );
        //   console.log(result)
        //   this.url=result.data.secure_url;

        //     console.log( this.url);
        // }catch (e) {
        //   console.error(e)
        // }
        break;
      case 'error':
        this.msg.error('Lỗi đường dẫn');
        this.loading = false;
        break;
    }
  }
  // up img
  onSelect(event: { addedFiles: any }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async uploadImg() {
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'img_sanpham');
    data.append('cloud_name', 'dctltae7e');
    // this._uploadService.UploadImg(data).subscribe((res) => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });
    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/dctltae7e/image/upload`,
        data
      );
      console.log(result);
      this.url = result.data.secure_url;

      console.log(this.url);
    } catch (e) {
      console.error(e);
    }
  }
  //

  // form
  submitForm(): void {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
// Thông báo điều kiện
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': ` ${minLength}`,
          en: `Phải có ít nhất ${minLength} chữ cái`,
        },
      };
    };
  }
}
// Thông báo điều kiện giá sản phẩm
