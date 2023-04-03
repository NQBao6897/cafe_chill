import { Component,Output,EventEmitter} from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthConfig } from '../../../.././auth/data-access/auth.config';
@Component({
  selector: 'app-san-pham-yeu-thich',
  templateUrl: './san-pham-yeu-thich.component.html',
  styleUrls: ['./san-pham-yeu-thich.component.css']
})
export class SanPhamYeuThichComponent {
  token ='';
  gioHang:any;
  listYeuThich:any;
  user:any
  constructor(
    private y:DuLieuService,  
    private notification: NzNotificationService,
    private g:DuLieuService,
    private t:DuLieuService,
    ){}
  ngOnInit():void{
    this.xemSanPhamYeuThich()
  }
  xemSanPhamYeuThich(){
    const token = JSON.parse(
      <string>localStorage.getItem(AuthConfig.JWT_TOKEN)
    );
    this.token = token;
    this.t.getUser(token).subscribe(data =>{
      if(data){
        const tk:any = data
        const user = tk[0]
        this.user = user;

        this.y.getSanPhamYeuThich(user.idtk).subscribe(data=>{
          if(data){
            this.listYeuThich = data;
          }
        })
      }
    })
    
  }
  // Chức năng
  xoa(ds:any) :void{
    console.log(ds.id);
    this.y.xoaSanPhamYeuThich(ds.id).subscribe(data =>{
      if(ds){
        this.notification.success(
          'Thông Báo',
          'Xóa thành công'
        );
        this.xemSanPhamYeuThich()
      }else{
        this.notification.warning(
          'Thông Báo',
          'Xóa Thất bại'
        );
      }
    },
    (err) => {
      this.notification.error('Thông Báo', 'Lỗi dữ liệu');
    }
    )
  }
  @Output() ChonSP = new EventEmitter();
  themCart(item: any): void {
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
          var idTK= this.user.idtk
          var idGH = gioHang.idGH;
          var idsanpham = gioHang.idSanPham;
          if (idGH&&soLuong&&idsanpham && idTK){
            gioHang={idGH:idGH,SoLuong:soLuong,idSanPham:idsanpham,idtk:idTK} 
            this.g.getlistSuaGioHang(gioHang).subscribe(data=>{
              if(gioHang){  
                console.log(gioHang)
                this.g.getlistGioHang(this.token).subscribe(data=>{
                  if(data){
                    console.log(data)
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
          // console.log(gioHang);
          this.g.themGioHang(gioHang).subscribe(data=>{ 
            if(gioHang){      
              this.g.getlistGioHang(this.token).subscribe(data=>{
                if(data){
                  // console.log(data)
                  this.gioHang=data;
                }
              });
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