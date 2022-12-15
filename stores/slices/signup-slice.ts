import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
	email: string;
	password: string;
	passwordConfirm: string;
	name: string;
	privacy: boolean;
	terms: boolean;
	marketing: boolean;
};

const initialState: InitialState = {
	email: '',
	password: '',
	passwordConfirm: '',
	name: '',
	privacy: false,
	terms: false,
	marketing: false,
};

export const SignUpSlice = createSlice({
	name: 'SignUp',
	initialState,
	reducers: {
		saveSignUpForm(state, action: PayloadAction<InitialState>) {
			state.email = action.payload.email;
			state.password = action.payload.password;
			state.passwordConfirm = action.payload.passwordConfirm;
			state.name = action.payload.name;
			state.privacy = action.payload.privacy;
			state.terms = action.payload.terms;
			state.marketing = action.payload.marketing;
		},
		initSignUpForm(state) {
			state.email = '';
			state.password = '';
			state.passwordConfirm = '';
			state.name = '';
			state.privacy = false;
			state.terms = false;
			state.marketing = false;
		},
	},
});

export default SignUpSlice;

export const { saveSignUpForm, initSignUpForm } = SignUpSlice.actions;
