import {useDispatch} from "react-redux";
import {useMemo} from "react";

import {bindActionCreators} from "@reduxjs/toolkit";
import {usersActions} from "../../features/users/users_reducer";
import {authActions} from "../../features/auth/auth_reducer";
import {chatActions} from "../../features/chat/chat_reducer";
import {profileActions} from "../../features/profile/profile_reducer";
import {appActions} from "../../features/app/app_reducer";
import * as usersAsyncActions from "../../features/users/users_actions";
import * as appAsyncActions from "../../features/app/app_actions";
import * as authAsyncActions from "../../features/auth/auth_actions";
import * as chatAsyncActions from "../../features/chat/chat_actions";
import * as profileAsyncActions from "../../features/profile/profile_actions";
import {Dispatch} from "redux";


// Синхронные экшены
const rootSyncActions = {
	...usersActions,
	...authActions,
	...chatActions,
	...profileActions,
	...appActions,
};



export const useActions = () => {
	const dispatch = useDispatch<any>()
	return useMemo(() => bindActionCreators(rootSyncActions, dispatch),
		[dispatch])
}

// Асинхронные экшены
// const rootAsyncActions = {
// 	...usersAsyncActions,
// 	...authAsyncActions,
// 	...chatAsyncActions,
// 	...profileAsyncActions,
// 	...appAsyncActions,
// };

// export const useActions = () => {
// 	const dispatch = useDispatch(); // dispatch с типизацией автоматически
//
// 	const syncActions = useMemo(() => {
// 		return bindActionCreators(rootSyncActions, dispatch);
// 	}, [dispatch]);
//
// 	const asyncActions = useMemo(() => {
// 		return Object.keys(rootAsyncActions).reduce((acc, key) => {
// 			// Указываем тип key как keyof typeof rootAsyncActions
// 			const actionKey = key as keyof typeof rootAsyncActions;
//
// 			const asyncAction = rootAsyncActions[actionKey];
// 			type ArgType = Parameters<typeof asyncAction>[0]; // тип аргумента
// 			type ReturnTypeFunc = ReturnType<typeof asyncAction>; // тип возвращаемого значения
//
// 			// Функция для асинхронных экшенов
// 			acc[actionKey] = (args:ArgType):Promise<any> => {
// 				const action = rootAsyncActions[actionKey](args as never); // вызываем асинхронный экшен
// 				return dispatch(action as any); // результат вызова dispatch для асинхронного экшена
// 			};
//
// 			return acc;
// 		}, {} as { [K in keyof typeof rootAsyncActions]: (args: Parameters<typeof rootAsyncActions[K]>[0]) => Promise<ReturnType<typeof rootAsyncActions[K]>> })
// 	}, [dispatch]);
//
// 	return { ...syncActions, ...asyncActions };
// };


