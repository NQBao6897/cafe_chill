import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import { JwtUtill } from '../../services/jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authHeader = 'Authorization';
    intercept (
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        req =req.clone({
            setHeaders: {
                'Cache-Control':'no-cache',
                Pragma: 'no-cache',
                'X-Content-Type-Opotions':'nosniff',
                'X-XSS-Protection': '1',
                'Accept-Language': 'vi-vn',
            },
        });
        return next.handle(this.addAuthenticationToken(req));
    }
    private addAuthenticationToken (repuest: HttpRequest<any>):HttpRequest<any>{
        // Cập nhật mã Token
        const token = JwtUtill.getAccessToken();
        if(!token){
            return repuest;
        }
        return repuest.clone({
            headers: repuest.headers
            .set(this.authHeader, token)
            .set('Access-Control-Max-Age','86400'),
        });
    }
}