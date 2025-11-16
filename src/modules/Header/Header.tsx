import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {currentUserSelector, isAuthSelector} from "../Login/model/selector_auth";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";

import {UserOutlined} from "@ant-design/icons";
import {logout} from "../Login/model/auth_actions";
import {useAppDispatch} from "../../shared/lib/redux";


export const Header = () => {

	const isAuth = useSelector(isAuthSelector)
	const login = useSelector(currentUserSelector)
	const dispatch = useAppDispatch()


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
