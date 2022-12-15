import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderType } from 'types/header';

type InitialState = {
	headerType: HeaderType;
	isButtonVisible: boolean;
};

const initialState: InitialState = {
	headerType: 'default',
	isButtonVisible: false,
};

export const UISlice = createSlice({
	name: 'UI',
	initialState,
	reducers: {
		changeHeader(state, action: PayloadAction<InitialState>) {
			state.headerType = action.payload.headerType;
			state.isButtonVisible = action.payload.isButtonVisible;
		},
		initHeader(state) {
			state.headerType = 'default';
			state.isButtonVisible = false;
		},
	},
});

export default UISlice;

export const { changeHeader, initHeader } = UISlice.actions;
