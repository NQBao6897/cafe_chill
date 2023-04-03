import { Component, Input, OnInit } from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  CKEditor5,
  ChangeEvent,
  FocusEvent,
  BlurEvent,
} from '@ckeditor/ckeditor5-angular';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import axios from 'axios';
DuLieuService;
@Component({
  selector: 'app-sua-tin-tuc',
  templateUrl: './sua-tin-tuc.component.html',
  styleUrls: ['./sua-tin-tuc.component.css'],
})
export class SuaTinTucComponent implements OnInit {
  // uploading
  loading = false;
  avatarUrl?: string;
  files: File[] = [];
  // search
  selectedValue = null;
  //
  public Editor = ClassicEditor;
  listtintuc: any;
  searchText!: string;
  url: any;
  msg = '';
  // form
  form!: UntypedFormGroup;
  public componentEvents: string[] = [];
  public isDisabled = false;
  public editorData = ``;
  constructor(
    private notification: NzNotificationService,
    private toastr: ToastrService,
    private msge: NzMessageService,
    private q: DuLieuService,
    private formBuilder: UntypedFormBuilder
  ) {}
  @Input() tt: any;
  ngOnInit(): void {
    console.log(this.tt);
    const { minLength } = MyValidators;
    this.form = this.formBuilder.group({
      TieuDe: [null, [Validators.required, minLength(5)]],
      HinhNoiDung: [null],
      NoiDung: [null, [Validators.required]],
      idtt: [''],
    });
  }
  async suatt(tt: any) {
    //
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'img_sanpham');
    data.append('cloud_name', 'dctltae7e');
    data.append('folder', 'tintuc');
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
    var tieude = tt.TieuDe;
    var noidung = tt.NoiDung;
    var iDtt = tt.idtt;
    const themTinTuc = {
      idtt: iDtt,
      TieuDe: tieude,
      HinhNoiDung: this.url,
      NoiDung: noidung,
    };
    if (tieude && noidung) {
      console.log(themTinTuc);
      this.q.getListSuaTinTuc(themTinTuc).subscribe((data) => {
        if (themTinTuc) {
          this.listtintuc = data;
          this.notification.success('Hệ Thông', 'Sửa bài viết thành công');
        } else {
          this.notification.warning('Hệ Thông', 'Sửa bài viết thất bại');
        }
      });
    }
  }
  config = {
    uiColor: '#ffffff',
    toolbarGroups: [
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
      { name: 'links' },
      { name: 'insert' },
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
      { name: 'styles' },
      { name: 'colors' },
    ],
    skin: 'kama',
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { color: '#(color)' },
    },
    height: 188,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div',
  };
  // uploaing img
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msge.error('Không phải kiểu dữ liệu .JPG');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msge.error('Dung lượng ảnh vượt quá 2MB');
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
        this.msge.error('Lỗi đường dẫn');
        this.loading = false;
        break;
    }
  }
  submitForm(): void {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
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
}
//  Thoonh báo sự kiện form
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
