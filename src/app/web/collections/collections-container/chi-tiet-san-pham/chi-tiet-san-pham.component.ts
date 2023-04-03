import { Component,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthConfig } from 'src/app/auth/data-access/auth.config';
import { data } from 'jquery';
@Component({
  selector: 'app-chi-tiet-san-pham',
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.css']
})
export class ChiTietSanPhamComponent {
  gioHang:any;
  detail:any;
  user: any;
  constructor( 
    private g: DuLieuService,
    private t: DuLieuService,
    private service:DuLieuService, 
    private route:ActivatedRoute,
    private Router:Router, 
    private notification: NzNotificationService
    ) { }
  ngOnInit(): void {
    this.getProductDetail();
  }
  getProductDetail(){
    const token = JSON.parse(<string>localStorage.getItem(AuthConfig.JWT_TOKEN))
    this.t.getUser(token).subscribe(data=>{
      if(data){
        const tk:any = data;
        const user = tk[0]
        this.user =user
      }
    })
    this.route.params.subscribe((data:any)=>{
      // console.log(data);
      this.service.getchitietsanpham(data.id).subscribe(data =>{
        this.detail=data;
        console.log(this.detail);
      })
    })
  }
  @Output() ChonSP = new EventEmitter();
  themCart(item: any): void {
    if(item && this.user) {
      var idSP = item.id;
      this.ChonSP.emit(item);
      this.g.getGioHang().subscribe(
        (res: any) => {
          var gioHang = res.find((a: any) => {
            return a.idSanPham === idSP
          });
          // console.log(gioHang)
          if (gioHang) {  
            var soLuong = gioHang.SoLuong;
            soLuong += 1;
            var idGH = gioHang.idGH;
            var idTK = this.user.idtk
            var idsanpham = gioHang.idSanPham;
            if (idGH&&soLuong&&idsanpham && idTK){
              gioHang={idGH:idGH,SoLuong:soLuong,idSanPham:idsanpham,idtk:idTK} 
              this.g.getlistSuaGioHang(gioHang).subscribe(data=>{
                if(gioHang){
                  // console.log(gioHang)
                  this.g.getlistGioHang(this.user.idtk).subscribe(data=>{
                    if(data){
                      // console.log(data)
                      this.gioHang=data;
                    }
                  });
                  this.notification.success(
                    'Thông Báo',
                    'Sản phẩm đã tồn tại, cộng thêm số lượng'
                  );
                }
              },
              (err) => {
                this.notification.error('Thông Báo', 'Lỗi dữ liệu');
              }
              )       
            }
          } else {
            gioHang=[{idGH,SoLuong:1,idSanPham:idSP,idtk:this.user.idtk}]     
            console.log(gioHang);
            this.g.themGioHang(gioHang).subscribe(data=>{
              if(gioHang){
                
                this.notification.success('Thông Báo', 'Đã thêm vào giỏ hàng');
              }
            })
          }
        },
        (err) => {
          this.notification.error('Thông Báo', 'Lỗi dữ liệu');
        }
      );
    }
  }
  
}
