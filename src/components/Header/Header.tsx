import React, {FC} from "react";
import s from './Header.module.css'
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector, isAuthSelector} from "../../redux/selecter_auth";
import {Avatar, Button, Col, Layout, Menu, type MenuProps, Row} from "antd";
import {logout} from "../../redux/auth_reducer";
import {UserOutlined} from "@ant-design/icons";

const items1: MenuProps['items'] = ['Developers'].map((key) => ({
    key,
    label: `${key}`,
}));


export const Header = () => {

    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(currentUserSelector)

    const dispatch:any = useDispatch();

    const logoutCallBack = () =>{
        dispatch(logout())
    }

    const { Header } = Layout;


    return (
        <Header>
            <div className="demo-logo" />
            <Row >
                <Col span={20}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items1}
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    />
                </Col>

                <Col span={4}>
                    {isAuth
                        ?  <div>
                            <Avatar icon={<UserOutlined />} />
                            {login} <Button onClick={logoutCallBack}>log out</Button>
                        </div>
                        :   <Link to={'/login'}>Login</Link>}
                </Col>
            </Row>

        </Header>



    )
}
