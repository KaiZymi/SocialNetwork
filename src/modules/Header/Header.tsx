import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {currentUserSelector, isAuthSelector} from "../Login/model/selector_auth";
import {Avatar, Button, Layout, Menu, Space, Typography} from "antd";

import {UserOutlined} from "@ant-design/icons";
import {logout} from "../Login/model/auth_actions";
import {useAppDispatch} from "../../shared/lib/redux";


export const Header = () => {

    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(currentUserSelector)
    const dispatch = useAppDispatch()


    const handleLogout = () => {
        dispatch(logout())
    }

    const {Header: AntHeader} = Layout;
    const { Text } = Typography;

    return (
        <AntHeader style={{
            height: '64px',
            padding: '0 48px',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{
                maxWidth: '1440px',
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                    flexShrink: 0
                }}>
                    <img
                        src={`${process.env.PUBLIC_URL}/logo192.png`}
                        alt="Logo"
                        style={{
                            height: '100%',
                            display: 'block'
                        }}
                    />
                </Link>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    disabledOverflow
                    style={{
                        background: 'transparent',
                        borderBottom: 'none',
                        flex: 1,
                        minWidth: 0,
                        justifyContent: 'center',
                        margin: '0 24px'
                    }}
                />

                <Space style={{ flexShrink: 0 }}>
                    {isAuth ? (
                        <>
                            <Avatar
                                size="small"
                                icon={<UserOutlined />}
                            />
                            <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                                {login}
                            </Text>
                            <Button
                                type="primary"
                                size="small"
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Button type="primary" size="small">
                            <Link to="/login">Войти</Link>
                        </Button>
                    )}
                </Space>
            </div>
        </AntHeader>
    );
}
