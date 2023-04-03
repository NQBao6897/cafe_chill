import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { DuLieuService } from '../../../data/du-lieu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuaSanphamComponent } from '../sua-sanpham/sua-sanpham.component';
import { ThemSanphamComponent } from '../them-sanpham/them-sanpham.component';
import { ToastrService } from 'ngx-toastr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

declare var $: any;
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  options: any;
  // check
  setOfCheckedId = new Set<number>();
  listOfData: readonly any[] = [];
  listOfCurrentPageData: readonly any[] = [];
  // Tìm nân cao
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  //
  // search
  selectedValue = null;
  searchSP = '';
  searchDM = '';
  searchSPNC = '';
  searchText!: string;
  // cheked box
  visible = false;
  checked = false;
  loading = false;
  indeterminate = false;
  // kiểu dữ liệu
  listTrasua: any;
  STT: number = 0;
  modalsNumber = 0;
  giaKhuyenmai: any = 0;
  danhmuc: any;
  // sale
  listSale: any;
  form!: UntypedFormGroup;
  value = '';
  title = 'Giảm bao nhiêu';
  //
  constructor(
    private notification: NzNotificationService,
    public toastr: ToastrService,
    private h: DuLieuService,
    private l: DuLieuService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private modal: NzModalService,
    private nzMessageService: NzMessageService
  ) {
     this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  // Xem danh sách sản phẩm
  ngOnInit(): void {
    this.xemListDanhSP();
    this.search();
    this.searchNangCao();
    this.form = this.fb.group({
      giamgia: [null],
    });
  }
  // Xem sản phẩm
  xemListDanhSP() {
    this.h.getListtrasua().subscribe((data: any) => {
      if (data) {
        this.listOfData = data;
      }
      // Xem loại sản phẩm
      this.l.getListloaisanpham().subscribe((data: any) => {
        if (data) {
          this.danhmuc = data;
          this.listTrasua = [...this.listOfData];
        }
      });
      for (let i = 1; i < data.length + 1; i++) {
        var soThuTu = i;
        this.STT = soThuTu;
      }
      // console.log(this.STT)
      // console.log("Sản phẩm: ", data )
    });
  }
  //  Xóa
  xoaSP(id: number) {
    this.modal.confirm({
      nzTitle: 'Bạn có muốn thật sự xóa?',
      nzContent: '<b style="color: red;">Thông tin sản phẩm</b>',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.h.xoaSanPham(id).subscribe(
          (data) => {
            if (id) {
              this.notification.success('Thông Báo', 'Xóa thàng công');
              this.xemListDanhSP();
            } else {
              this.notification.warning('Thông Báo', 'Xóa thất bại');
            }
          },
          (error) => {
            this.notification.error('Thông Báo', 'Lỗi dự liệu');
          }
        ),
      nzCancelText: 'Không',
      nzOnCancel: () => console.log('Cancel'),
    });
   
  }
  @Output() chonSP = new EventEmitter();
  suasp(sp: any): void {
    this.chonSP.emit(sp);
    const sanpham = this.modalService.open(SuaSanphamComponent, {
      fullscreen: 'sm',
    });
    sanpham.componentInstance.sp = sp;
  }
  openthem() {
     this.modalService.open(ThemSanphamComponent);
  }
  //  Form danh sách
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }
  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
  // sendRequest(): void {
  //   this.loading = true;
  //   const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
  //   console.log(requestData);
  //   setTimeout(() => {
  //     this.setOfCheckedId.clear();
  //     this.refreshCheckedStatus();
  //     this.loading = false;
  //   }, 1000);
  // }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }
  // Tìm theo cột
  reset(): void {
    this.searchSP = '';
    this.search();
  }
  search(): void {
    this.visible = false;
    this.listTrasua = this.listOfData.filter(
      (item: any) => item.sanpham.indexOf(this.searchSP) !== -1
    );
    console.log('Tìm theo cột:', this.listTrasua);
  }
  // Tìm nhân cao
  resetForm(): void {
    this.searchSP = '';
    this.searchDM = '';
    this.searchNangCao();
  }
  searchNangCao(): void {
    
    this.listTrasua = this.listOfData.filter(
      (item: any) =>
        item.sanpham.indexOf(this.searchSP) !== -1 &&
        item.idloaisanpham.id.indexOf(this.searchDM) !== -1
    );
    console.log('Tìm nâng cao:', this.listTrasua);
    console.log('Tìm search', this.searchSP, this.searchDM);
  }
  //  Thông báo

  // Xóa nhiều
  xoaNhieu(): void {
    // this.loading = true;
    // const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    // // console.log(requestData);
    // setTimeout(() => {
    //   if(requestData){
    //     requestData.forEach((a)=>{
    //    this.h.xoaSanPham(a.id).subscribe(data=>{
    //    }
    //    )
    //       console.log(a)
    //     })
    //     const soSP = String(this.setOfCheckedId.size)
    //     const tetle=('Đã có ' + soSP + ' sản phẩm đã xóa')
    //     this.nzMessageService.success(tetle);
    //       this.setOfCheckedId.clear();
    //       this.refreshCheckedStatus();
    //       this.loading = false;
    //       this.h.getListtrasua().subscribe(data =>
    //         {
    //           if (data) {
    //             this.listTrasua =data;
    //           }
    //         });
    //   } else{
    //     this.nzMessageService.warning('Xóa thất bại');
    //   }
    // }, 1000);
  }
  // giảm giá
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  onChange(value: string): void {
    this.updateValue(value);
  }
  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (
      this.value.charAt(this.value.length - 1) === '.' ||
      this.value === '-'
    ) {
      this.updateValue(this.value.slice(0, -1));
    }
  }
  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title =
      (this.value !== '-' ? this.formatNumber(this.value) : '-') ||
      'Input a number';
  }
  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');
  giamGia(form: any): void {
    const requestData = this.listOfData.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    console.log(requestData);
    if (requestData) {
      const soSP = String(this.setOfCheckedId.size);
      this.setOfCheckedId.clear();
      this.nzMessageService.success('Có ' + soSP + ' được giảm giả ');
      requestData.forEach((a) => {
        var giamgia = form.giamgia;
        var idSP = a.id;
        if (idSP && giamgia >= 0) {
          a = { id: idSP, giamgia: giamgia };
          this.h.suaSanPham(a).subscribe((data) => {
            // console.log(a);
          });
        }
      });
      this.xemListDanhSP();
    }
  }
}
