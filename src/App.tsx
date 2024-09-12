import "./App.css";


import {Link, NavLink, Route, Routes, useParams} from "react-router-dom";
import React, {FC, Suspense, useEffect} from "react";
import Login from "./components/Login/Login";
import {connect, useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./common/preloader/Preloader";
import './assets/styles/global.css'
import ProfileContainer from "./components/Profile/ProfileContainer";


import {UsersPage} from "./components/Users/UsersContainer";
import {AppStateType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

// const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

import {UserOutlined, TeamOutlined, MessageOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {getIsFetching} from "./redux/selecter_users";
import {Header} from "./components/Header/Header";
import {ChatPage} from "./pages/Chat/ChatPage";


const { Content, Footer, Sider } = Layout;





let navList = [["Profile", UserOutlined], ["Chat", MessageOutlined], ["Users", TeamOutlined]];

const items2: MenuProps['items'] = navList.map(
	(page, index) => {

		const key = String(index + 1);

		return {
			key: `${key}`,
			icon: React.createElement(page[1]),
			label: (<Link to={`/${page[0].toString().toLowerCase()}`} > {`${page[0]}`}</Link>)

		};
	},
);




const App = () => {

	const dispatch:any = useDispatch()


	useEffect(() => {
		dispatch(initializeApp())
	}, []);

	const initialized = useSelector((state:AppStateType) => state.app.initialized);



	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return(

		<Layout>
			{!initialized ? <Preloader/> : null}
			<Header/>
			<Content
				style={{
					padding: '0 48px',
				}}
			>
				<Breadcrumb
					style={{
						margin: '16px 0',
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Layout
					style={{
						padding: '24px 0',
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Sider
						style={{
							background: colorBgContainer,
						}}
						width={200}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							style={{
								height: '100%',
							}}
							items={items2}
						/>
					</Sider>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280,
						}}
					>
						<Suspense fallback={<div> loading... </div>}>
							<Routes>
								<Route path='/' element={<ProfileContainer/>}/>
								<Route path='/chat/*' element={<ChatPage/>}/>

								<Route path='/users/*'  element={<UsersPage  pageTitle={"Users"}/>}/>

								<Route path='/profile/:userId?' element={<ProfileContainer/>}/>
								<Route path='/login/' element={<Login/>}/>
								<Route path='*' element={<div>404</div>}/>

							</Routes>
						</Suspense>
					</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}
			>
				Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>


	)
}


export default App







