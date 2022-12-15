import { useDispatch } from 'react-redux';
import { userLogout } from 'stores/slices/user-slice';
import AuthService from 'apis/Auth/auth-service';
import { useRouter } from 'next/router';

const authService = new AuthService();

const useLogout = () => {
	const dispatch = useDispatch();

	const Router = useRouter();

	const handleClickLogoutButton = async () => {
		dispatch(userLogout());
		authService.logout();
		Router.push('/');
	};

	return handleClickLogoutButton;
};

export default useLogout;
