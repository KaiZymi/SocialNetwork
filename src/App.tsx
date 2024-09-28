import "./App.css";


import {Link, Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import {Login} from "./pages/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./features/app/app_reducer";
import Preloader from "./common/preloader/Preloader";
import './assets/styles/global.css'


import {UsersPage} from "./pages/Users/UsersContainer";
import {AppStateType} from "./features/store";


// const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
import {MessageOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {Col, MenuProps, Row} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Header} from "./pages/Header/Header";
import {ChatPage} from "./pages/Chat/ChatPage";
import {Profile} from "./pages/Profile/Profile";



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
		return item ? `${navList.indexOf(item) + 1}` : '1';
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
					paddingTop:'20px',
					padding: '0 48px',
				}}
			>
				<Layout
					className={'block-content'}
					style={{
						padding: '24px 0',
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Row>
						<Col span={3}>
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
						</Col>

						<Col span={21}>
							<Content
								style={{
									padding: '0 24px',
									minHeight: 280,
									width: '100%'
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

						</Col>


					</Row>

				</Layout>
			</Content>


			<Footer
				style={{
					textAlign: 'center',
				}}
			>
				Created by Mark Valishin ©{new Date().getFullYear()}
			</Footer>
		</Layout>


	)
}


export default App







