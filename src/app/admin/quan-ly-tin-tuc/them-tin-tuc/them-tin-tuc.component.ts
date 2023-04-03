import { Component,OnInit,ViewChild } from '@angular/core';
import { DuLieuService } from '../../../data/du-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import axios from "axios";
@Component({
  selector: 'app-them-tin-tuc',
  templateUrl: './them-tin-tuc.component.html',
  styleUrls: ['./them-tin-tuc.component.css']
})
export class ThemTinTucComponent implements OnInit  {
    // uploading
    files: File[] = [];
    loading = false;
    avatarUrl?: string;
    // search
    selectedValue=null;
    // 
  listtintuc: any;
  searchText!: string;
  url: any; 
  // Form 
  form!: UntypedFormGroup
  public componentEvents: string[] = [];
  public isDisabled = false;
  public editorData = ``;
  constructor(
    private notification: NzNotificationService,
    private q:DuLieuService, 
    public toastr:ToastrService,
    private msg:NzMessageService,
    private formBuilder:UntypedFormBuilder
    ){}
  ngOnInit(): void {
    this.q.getListTinTuc().subscribe(data =>{
      if(data){
        this.listtintuc=data;
      }
    })
    const {minLength} = MyValidators;
    this.form = this.formBuilder.group({
      TieuDe:[null,[Validators.required,minLength(5)]],
      NoiDung:[null,[Validators.required,minLength(5)]],
      HinhNoiDung:[null,[]]
    });
  }
  
  submitForm(): void{
    Object.values(this.form.controls).forEach(control =>{
      if(control.invalid){
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf:true});
      }
    })
  }
  // 
  
  // 
 async themTinTuc(tt:any){
       // 
       const file_data = this.files[0];
       const data = new FormData();
       data.append('file', file_data);
       data.append('upload_preset', 'img_sanpham');
       data.append('cloud_name', 'dctltae7e');
       data.append('folder','tintuc')
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
    var tieude = tt.TieuDe;
    var noidung = tt.NoiDung;
    const themTinTuc = {TieuDe:tieude,HinhNoiDung: this.url, NoiDung:noidung }
    if (tieude && noidung ){
      console.log(themTinTuc);
      this.q.getListThemTinTuc(themTinTuc).subscribe(data =>{
        console.log(themTinTuc)
        if(themTinTuc){
          this.form.reset();
          this.notification.success(
            'Hệ Thông',
            'Thêm tin tức thành công'
            );
        } else {
          this.notification.warning(
            'Hệ Thông',
            'Thêm tin tức thất bại'
            );
        }
       },err =>{
        this.notification.error(
          'Hệ Thông',
          'Lôi dữ liệu'
          );
       }
       )   
       
    }
  }
  // selectFile(event: any) {
  //   if (!event.target.files[0] || event.target.files[0].length ==0) {
  //     this.msg ='You must select an image ';
  //     return;
  //   }
  //   var mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = "Đây không phải file ảnh"
  //     return;
  //   }
  //   var reader =new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload= (_event) =>{
  //     this.msg= "";
  //     this.url = reader.result;
  //   }
  //   }
    config = {
      uiColor: '#ffffff',
      toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
      { name: 'links' }, { name: 'insert' },
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
      { name: 'styles' },
      { name: 'colors' }],
      skin: 'kama',
      resize_enabled: false,
      removePlugins: 'elementspath,save,magicline',
      extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
      colorButton_foreStyle: {
         element: 'font',
         attributes: { 'color': '#(color)' }
      },
      height: 188,
      removeDialogTabs: 'image:advanced;link:advanced',
      removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
      format_tags: 'p;h1;h2;h3;pre;div'
   }
   // uploaing img
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
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
      this.msg.error('Lỗi đường dẫn');
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
// Thông báo điều kiện
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export class MyValidators extends Validators {
  static override  minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': ` ${minLength}`, en: `Phải có ít nhất ${minLength} chữ cái` } };
    };
  }
}