
import { AuthConfig } from "../data-access/auth.config";
export class JwtUtil {
     /**
    * Sets user token
    * @param userToken
    */
    static setUserToken(userToken: any){
        localStorage.setItem(AuthConfig.JWT_TOKEN, JSON.stringify(userToken))
    }
    static getAccessToken(): any | null {
        const token = JSON.parse(<string>localStorage.getItem(AuthConfig.JWT_TOKEN)) as any;
    if (!token) {
        return null;
    }
    return token;
    }
}