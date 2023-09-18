import { useRouter } from 'next/router';
import { ROUTES } from './routes';


const logout = async (router) => {
    try {
      const response = await fetch('/admin/logout', { method: 'POST' });
      if (response.ok) {
        router.push(ROUTES.LOGIN);
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
};

export default logout;