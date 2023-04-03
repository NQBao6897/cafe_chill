import { Component, Input,OnInit } from '@angular/core';
import { DuLieuService } from '../../../data/du-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import axios from "axios";
@Component({
  selector: 'app-sua-sanpham',
  templateUrl: './sua-sanpham.component.html',
  styleUrls: ['./sua-sanpham.component.css']
})
export class SuaSanphamComponent implements OnInit {
  @Input() sp:any;
  // uploading
  url: any;
  loading = false;
  avatarUrl?: string;
  files: File[] = [];
  // Form
    form: any|UntypedFormGroup;
  //
  danhmuc:any;
    listtrasua:any;
    constructor(
      private msg:NzMessageService,
      private notification: NzNotificationService,
      private d:DuLieuService,
      private l:DuLieuService,
      public toastr:ToastrService,
      private formBuilder: UntypedFormBuilder,
      ) {
        this.form = this.formBuilder.group({
          moTa: [null, [Validators.maxLength(500)]],
          sanpham: [null, [Validators.minLength(5)]],
          gia: [null, [Validators.minLength(3)]],
          idloaisanpham: [null,],
          id: [null],
    });
      }
  
    ngOnInit(): void {
      console.log(this.sp);
      this.l.getListloaisanpham().subscribe(data => {
        if(data){
          this.danhmuc = data;
        }
       })
      
    }
    async suasp(sp:any) {
      // 
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'img_sanpham');
    data.append('cloud_name', 'dctltae7e');
    data.append('folder','sanpham')
    // this._uploadService.UploadImg(data).subscribe((res) => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });
    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/dctltae7e/image/upload`,
        data,
      );
      console.log(result)
       this.url=result.data.secure_url;
      console.log( this.url)
    }catch (e) {
      console.error(e)
    }
    // 
    var iD = sp.id 
    var sanpham = sp.sanpham;
    var photo = sp.photo;
    var gia = sp.gia;
    var danhmuc = sp.idloaisanpham;
    var mota = sp.moTa;
     const themsanPham={id:sp.id,sanpham:sp.sanpham,gia:sp.gia,photo:this.url,idloaisanpham:sp.idloaisanpham,moTa:sp.moTa}
    if(sanpham && gia && danhmuc && mota && iD){
      console.log(themsanPham);
      this.d.suaSanPham(themsanPham).subscribe(data=>{
        if (themsanPham){
          // this.toastr.success('Sửa thành công', 'Hệ Thống', {
          //   timeOut: 2000,
          // })    
          this.notification.success(
            'Thông Báo',
            'sửa thàng công'
            );
        }
      },err =>{
        // this.toastr.warning('Lỗi dữ liệu', 'Hệ Thống', {
        //   timeOut: 2000,
        // })
        this.notification.error(
          'Hệ Thống',
          'Lỗi dữ liệu'
          );
      })
    }else{
      // this.toastr.error('Sửa Thất bại', 'Hệ Thống', {
      //   timeOut: 2000,
      // })
      this.notification.warning(
        'Thông Báo',
        'Sửa không thàng công'
        );
    }
      console.log("sửa",sanpham,photo,gia,danhmuc, mota);
    }
     // uploaing img
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('Tập tin tải lên không phải định dạnh JPG !');
      observer.complete();
      return;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Dung lượng tải lên vượt quá 2MB!');
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
handleChange(info: { file: NzUploadFile }): void {
  switch (info.file.status) {
    case 'uploading':
      this.loading = true;
      break;
    case 'done':
      // Get this url from response in real world.
      this.getBase64(info.file!.originFileObj!, (img: string) => {
        this.loading = false;
        this.avatarUrl = img;
      });
      break;
    case 'error':
      this.msg.error('Sai dữ liệu');
      this.loading = false;
      break;
  }
}
 // up img
 onSelect(event: { addedFiles: any; }) {
   console.log(event);
   this.files.push(...event.addedFiles);
 }
 onRemove(event: File) {
   console.log(event);
   this.files.splice(this.files.indexOf(event), 1);
 }
 
}
