import "./App.css";


import {Link, Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import {Login} from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./common/preloader/Preloader";
import './assets/styles/global.css'


import {UsersPage} from "./components/Users/UsersContainer";
import {AppStateType} from "./redux/store";


// const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
import {MessageOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Header} from "./components/Header/Header";
import {ChatPage} from "./pages/Chat/ChatPage";
import {Profile} from "./components/Profile/Profile";


const { Content, Footer, Sider } = Layout;





// let navList = [["Profile", UserOutlined], ["Chat", MessageOutlined], ["Users", TeamOutlined]];
//
// const items2: MenuProps['items'] = navList.map(
// 	(page, index) => {
//
// 		const key = String(index + 1);
//
// 		return {
// 			key: `${key}`,
// 			icon: React.createElement(page[1]),
// 			label: (<Link to={`/${page[0].toString().toLowerCase()}`} > {`${page[0]}`}</Link>)
//
// 		};
// 	},
// );

const navList = [
	["Profile", UserOutlined, '/'],
	["Chat", MessageOutlined, '/chat'],
	["Users", TeamOutlined, '/users']
];

const items2 = navList.map((page:any, index) => ({
	key: `${index + 1}`,
	icon: React.createElement(page[1]),
	label: (<Link to={page[2]}>{page[0]}</Link>)
}));


const App = () => {


	const dispatch:any = useDispatch()
	const location = useLocation();

	const initialized = useSelector((state:AppStateType) => state.app.initialized);

	const getActiveKey = () => {
		const path = location.pathname;
		const item = navList.find(([, , url]) => url === path);
		return item ? `${navList.indexOf(item) + 1}` : '1'; // Default to '1' if not found
	};
	const [selectedKey, setSelectedKey] = useState(getActiveKey);

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();



	useEffect(() => {
		dispatch(initializeApp())
	}, []);


	useEffect(() => {
		const handleRouteChange = () => {
			setSelectedKey(getActiveKey());
		};

		handleRouteChange();
		return () =>{

		}
	}, [location]);


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
							defaultSelectedKeys={[selectedKey]}
							style={{
								height: '100%',
							}}
						>
							{items2.map(item => (
								<Menu.Item key={item.key} icon={item.icon}>
									<Link to={item.label.props.to}>{item.label.props.children}</Link>
								</Menu.Item>
							))}

						</Menu>
					</Sider>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280,
						}}
					>
						<Suspense fallback={<div> loading... </div>}>
							<Routes>
								<Route path='/' element={<Profile/>}/>
								<Route path='/chat/*' element={<ChatPage/>}/>

								<Route path='/users/*'  element={<UsersPage  pageTitle={"Users"}/>}/>

								<Route path='/profile/:userId?' element={<Profile/>}/>
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







