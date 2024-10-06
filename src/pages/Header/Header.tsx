import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector, isAuthSelector} from "../../features/auth/selector_auth";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {logout} from "../../features/auth/auth_reducer";
import {UserOutlined} from "@ant-design/icons";

// const items1: MenuProps['items'] = ['Developers'].map((key) => ({
//     key,
//     label: `${key}`,
// }));

// <div>
//     <Link to={'/'}>
//         <svg width="50" height="50">
//             <use xlinkHref={`${process.env.PUBLIC_URL}/logo.svg`}/>
//         </svg>
//
//     </Link>
// </div>
export const Header = () => {

	const isAuth = useSelector(isAuthSelector)
	const login = useSelector(currentUserSelector)

	const dispatch: any = useDispatch();

	const logoutCallBack = () => {
		dispatch(logout())
	}

	const {Header} = Layout;


	return (
		<Header>
			<div style={{width: '1440px', margin: '0 auto'}}>
				<Row>

					<Col span={4}>
						<div style={{height: '50px', alignContent: 'center'}}>
							<Link to={'/'} style={{height: '100%'}}>
								{/*<svg >*/}
								{/*    <use xlinkHref={`${process.env.PUBLIC_URL}/logo.svg`} />*/}
								{/*</svg>*/}
								<img src={`${process.env.PUBLIC_URL}/logo192.png`} alt=""
									 style={{height: '100%'}}/>
							</Link>
						</div>

					</Col>

					<Col span={16}>

						<Menu
							theme="dark"
							mode="horizontal"
							style={{
								flex: 1,
								minWidth: 0,
							}}
						/>


					</Col>

					<Col span={4}>
						{isAuth
							? <div style={{textAlign: 'end'}}>
								<Avatar icon={<UserOutlined/>}/>
								{login} <Button onClick={logoutCallBack}>log out</Button>
							</div>
							: <div style={{textAlign: 'end'}}><Link to={'/login'}>Login</Link></div>}
					</Col>
				</Row>
			</div>


		</Header>


	)
}
