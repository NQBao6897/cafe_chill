import { User } from './user';
export interface State {
  // Xác thực thông tin người dùng
  isAuthenticated: boolean;
  // Nếu đúng trả ra thông tin người dùng
  user: User | null;
  // Thông báo lỗi
  errorMessage: string | null;
}
export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };