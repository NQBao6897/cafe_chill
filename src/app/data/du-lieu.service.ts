import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DuLieuService {
  constructor(private h:HttpClient,
    private l:HttpClient,
    private t:HttpClient,
    private n:HttpClient,
    private g:HttpClient,
    private q:HttpClient,
    private m:HttpClient,
    private y:HttpClient,
    ) 
    { }
    // 
    // public cartItemList:any=[];
    // public totalItem:any;
    // cartSubject = new Subject<any>();
    // productmini=new Subject<any>();

  // get<T>(url: string) {
  //   throw new Error('Method not implemented.');
  // }
  // Tài khoảng
  getliststk(id:number) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.t.get(environment.api + `/Login?select=fname,avatar&idtk=eq.`+id,{'headers':headers},)
  }
  taoTaiKhoang(listThongTin:any) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.t.post(environment.api + `/Login`,listThongTin,{'headers':headers},)
  }
  getUser(token:any) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.t.get(environment.api + `/Login?token=eq.`+token,{'headers':headers},)
  }
  getTaiKhoan(tk:string) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.t.get(environment.api + `/Login?select=fname&fname=eq.`+tk,{'headers':headers},)
  }
  // Giỏ hàng
  getlistGioHang(id:string) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.g.get(environment.api +'/GioHang?select=idGH,SoLuong,idSanPham(id,sanpham,gia,photo,giamgia,idloaisanpham(tenloaisanpham,id))&idtk=eq.'+id,{'headers':headers})
  }
  getGioHang(){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.g.get(environment.api +'/GioHang?select=idGH,SoLuong,idSanPham',{'headers':headers})
  }
  themGioHang(sp:any) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.g.post(environment.api +'/GioHang',sp,{'headers':headers})
  }
   getlistXoaGioHang(idGH:number) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.g.delete(environment.api +'/GioHang?idGH=eq.'+idGH,{'headers':headers})
  }
  getlistSuaGioHang(sp: any) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.g.put(environment.api +'/GioHang?idGH=eq.'+sp.idGH,sp,{'headers':headers})
  }
  // Hòm thư góp ý 
  getListhomthu(){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.n.get(environment.api +'/HomThuGopY?select=*',{'headers':headers})
  }
  getListhomthuthem(ht:any){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.n.post(environment.api +'/HomThuGopY',ht,{'headers':headers})
  }
  getListhomthuxoa(idht:number){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.n.delete(environment.api +'/HomThuGopY?idht=eq.'+idht,{'headers':headers})
  }
  //  Tin tức
  getListTinTuc(){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.q.get(environment.api +'/TinTuc?select=*',{'headers':headers})
  }
  getListChiTiecTinTuc(id:number){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.q.get(environment.api +'/TinTuc?idtt=eq.'+id,{'headers':headers})
  }
  getListThemTinTuc(tt:any){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.q.post(environment.api +'/TinTuc',tt,{'headers':headers})
  }
  getListXoaTinTuc(idtt:number){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.q.delete(environment.api +'/TinTuc?idtt=eq.'+idtt,{'headers':headers})
  }
  getListSuaTinTuc(tt:any){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.q.put(environment.api +'/TinTuc?idtt=eq.'+tt.idtt,tt,{'headers':headers})
  }
  //  Loai san pham
  getListloaisanpham() {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.l.get(environment.api +'/LOAISANPHAM?select=*',{'headers':headers})
  }
  getchitiecloaisanpham(id:string) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.l.get(environment.api +'/LOAISANPHAM?select=id,tenloaisanpham,id(id,sanpham,gia,photo,giamgia)&id=eq.'+id,{'headers':headers})
  }

  // San pham
  getListtrasua () {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.h.get(environment.api +'/sanpham?select=id,sanpham,gia,photo,moTa,giamgia,idloaisanpham(id,tenloaisanpham)',{'headers':headers},)
   }
   getchitietsanpham(id:number){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.h.get(environment.api +'/sanpham?select=id,sanpham,gia,photo,moTa,giamgia,idloaisanpham(id,tenloaisanpham)&id=eq.'+id,{'headers':headers},)
   }
  themSanPham(sp: any) {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.h.post(environment.api +'/sanpham',sp,{'headers':headers});
  }
  
  xoaSanPham(id:number){
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
    return this.h.delete(environment.api +'/sanpham?id=eq.'+id,{'headers':headers});
  } 
  suaSanPham(sp: any) {
     const headers = new HttpHeaders()
     .set('apikey',environment.key)
     .set('Authorization',environment.auth)
    return this.h.put(environment.api +'/sanpham?id=eq.'+sp.id,sp,{'headers':headers});
  }
 
  //  phân loại sản phẩm theo menu
  getDanhSachSanPhamMenu() {
    const headers = new HttpHeaders()
    .set('apikey',environment.key)
    .set('Authorization',environment.auth)
   return this.m.get(environment.api +'/LOAISANPHAM?select=id(id,sanpham,gia,photo,idloaisanpham,giamgia),tenloaisanpham',{'headers':headers});
 }
// Sản phẩm yêu thích
getSanPhamYeuThich(id:number) {
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.get(environment.api +'/sanPhamYeuThich?select=id,idSanPham(id,sanpham,gia,photo)&idtk=eq.'+id,{'headers':headers});
}
getDachSachYeuThich(){
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.get(environment.api +'/sanPhamYeuThich?select=idSanPham',{'headers':headers});
}
themSanPhamYeuThich(sp:any) {
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.post(environment.api +'/sanPhamYeuThich',sp,{'headers':headers});
}
xoaSanPhamYeuThich(id:number) {
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.delete(environment.api +'/sanPhamYeuThich?id=eq.'+id,{'headers':headers});
}
// Mục lục sản phẩm
getMucLucSanPham() {
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.get(environment.api +'/mucLucSanPham?select=id,id(id,tenloaisanpham),tenMucLuc',{'headers':headers});
}
getChiTiecMucLucSanPham(id:string) {
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.get(environment.api +'/mucLucSanPham?select=id,id(id(id,sanpham,gia,giamgia,photo),tenloaisanpham),tenMucLuc&tenMucLuc=eq.'+id,{'headers':headers});
}

// Mã giảm giá
getVoucher() {
  const headers = new HttpHeaders()
  .set('apikey',environment.key)
  .set('Authorization',environment.auth)
 return this.y.get(environment.api +'/voucher?select=*',{'headers':headers});
}




// -------------------------------Giỏ hàng---------------
// items:any= [];
// loadCart(): void {
//   this.items = JSON.parse(localStorage.getItem("cart-item") || '{}') ?? [];
// }
// addToCart(product:any){
//   console.log(product);
//       let cartDataNull=localStorage.getItem('cart-item');
//       if(cartDataNull ==null){
//         let storeDataGet:any=[];
//         storeDataGet.push(product)
//         localStorage.setItem('cart-item',JSON.stringify(storeDataGet));
//       }
//       else{
//         var id=product.id;
//         let index:number=-1;
//         this. cartItemList=JSON.parse(localStorage.getItem('cart-item') || '{}');
//         for(let i=0;i<this. cartItemList.length;i++){  
//           if(parseInt(id) === parseInt(this. cartItemList[i].id)){
//             this.cartItemList[i].qtyTotal+=1;
//             // console.log(this.cartItemList[i].id)
//             index=i;
//             // break;
//           }
//         }
//         if(index == -1){
//           this. cartItemList.push(product);
          
//           console.log(this. cartItemList)
//           localStorage.setItem('cart-item',JSON.stringify(this. cartItemList))

//         }
//         else{
//           localStorage.setItem('cart-item',JSON.stringify(this. cartItemList))
//         }
//       }
      
// }
}