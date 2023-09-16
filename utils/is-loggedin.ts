import Cookies from 'js-cookie';
import { SUPER_ADMIN_PRIVILEGE } from './constants';

export function loggedIn() {
  const token = Cookies.get('auth_token');
  if (!token) return false;
  if (token) {
    const permissions = Cookies.get('auth_permissions');
    if (!permissions?.includes(SUPER_ADMIN_PRIVILEGE)) {
      return false;
    }
  }
  return true;
}
