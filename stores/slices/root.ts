import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import userSlice from './user-slice';
import UISlice from './ui-slice';
import SignUpSlice from './signup-slice';

const rootReducer = (state: any, action: any) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				user: userSlice.reducer,
				ui: UISlice.reducer,
				signup: SignUpSlice.reducer,
			});
			return combinedReducer(state, action);
		}
	}
};

export default rootReducer;
