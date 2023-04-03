import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemTinTucComponent } from './them-tin-tuc/them-tin-tuc.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SuaTinTucComponent } from './sua-tin-tuc/sua-tin-tuc.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-quang-ly-tin-tuc',
  templateUrl: './quang-ly-tin-tuc.component.html',
  styleUrls: ['./quang-ly-tin-tuc.component.scss'],
})
export class QuangLyTinTucComponent implements OnInit {
  // check
  setOfCheckedId = new Set<number>();
  listOfData: readonly any[] = [];
  listOfCurrentPageData: readonly any[] = [];
  // cheked box
  visible = false;
  checked = false;
  loading = false;
  indeterminate = false;
  // search
  searchTT = '';
  //
  p = 0;
  modalsNumber = 0;
  listtintuc: any;
  searchText!: string;
  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private q: DuLieuService,
    private modalService: NgbModal,
    private nzMessageService: NzMessageService
  ) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }
  ngOnInit(): void {
    this.xemlisttintuc();
  }
  xemlisttintuc(): void {
    this.q.getListTinTuc().subscribe((data: any) => {
      if (data) {
    
        this.listOfData = data;
        this.listtintuc = [...this.listOfData];

      }
    });
  }
  themTinTuc() {
    this.modalService.open(ThemTinTucComponent);
  }
  xoaTT(idtt: number) {
    this.modal.confirm({
      nzTitle: 'Bạn có muốn thật sự xóa?',
      nzContent: '<b style="color: red;">Bài viết tin tức</b>',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.q.getListXoaTinTuc(idtt).subscribe(
          (data) => {
            if (idtt) {
              this.q.getListTinTuc().subscribe((data) => {
                if (data) {
                  this.listtintuc = data;
                }
              });
              this.notification.success('Hệ Thông', 'Đã xóa bài viết tin tức');
            } else {
              this.notification.warning('Hệ Thông', 'Xóa thất bại');
            }
          },
          (err) => {
            this.notification.error('Hệ Thông', 'Lỗi ');
          }
        ),
    });
  }
  xoaNhieu(): void {
    this.loading = true;
    const requestData = this.listtintuc.filter((data: any) =>
      this.setOfCheckedId.has(data.idtt)
    );

    console.log(requestData);
    setTimeout(() => {
      this.loading = false;
      if (requestData) {
        requestData.forEach((a: any) => {
          this.q.getListXoaTinTuc(a.idtt).subscribe((data) => {
            if (a.idtt) {
              this.xemlisttintuc();
            }
          });
          console.log(a);
        });
        const soSP = String(this.setOfCheckedId.size);
        const tetle = 'Đã có ' + soSP + ' bài viết đã xóa';
        this.nzMessageService.success(tetle);
        this.refreshCheckedStatus();
        this.loading = false;
        this.setOfCheckedId.clear();
      } else {
        this.nzMessageService.warning('Xóa thất bại');
      }
    }, 1000);
  }
  // Chức năng Table
  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');
  // Chọn tất cả check box
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
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
    this.searchTT = '';
    this.search();
  }
  search(): void {
    this.visible = false;

    this.listtintuc = this.listOfData.filter(
      (item: any) =>
       item.TieuDe.indexOf(this.searchTT) !== -1
    );
    console.log('Tìm theo cột:', this.listtintuc);
  }
  @Output() chontt = new EventEmitter();
  suatt(tt: any) {
    // console.log(tt);
    this.chontt.emit(tt);
    const tintuc = this.modalService.open(SuaTinTucComponent);
    tintuc.componentInstance.tt = tt;
  }
}
