import { Component } from '@angular/core';
import { AuthConfig } from '../auth/data-access/auth.config';
import { JwtUtil } from '../auth/services/jwt';
import { DuLieuService } from '../data/du-lieu.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // User Admin
  taikhoan: any;
  // 
  constructor(private t:DuLieuService) {}
  LogOut(){
    JwtUtil.setUserToken(null)
  }
  ngOnInit():void {
    const token = JSON.parse(<string>localStorage.getItem(AuthConfig.JWT_TOKEN));
  this.t.getUser(token).subscribe(data=>{
    if (data) {
      this.taikhoan = data;
    }
  })
  }
}
