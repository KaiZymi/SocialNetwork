import "./App.css";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Preloader from "../common/preloader/Preloader";
import {MessageOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {Col, Layout, Menu, Row, theme} from 'antd';
import {initializeApp} from "../modules/Home/model/app_actions";
import {AppState, useAppDispatch} from "../shared/lib/redux";
import {UsersPage} from "../modules/Users";
import {ChatPage} from "../modules/Chat";
import {Profile} from "../modules/Profile";
import {Login} from "../modules/Login";
import {Header} from "../modules/Header";

// const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));


const {Content, Footer, Sider} = Layout;


const navList = [
    ["Profile", UserOutlined, '/'],
    ["Chat", MessageOutlined, '/chat'],
    ["Users", TeamOutlined, '/users']
];

const items2 = navList.map((page: any, index) => ({
    key: `${index + 1}`,
    icon: React.createElement(page[1]),
    label: (<Link to={page[2]}>{page[0]}</Link>)
}));


const App = () => {

    const dispatch = useAppDispatch()
    const location = useLocation();

    const initialized = useSelector((state: AppState) => state.app.initialized);

    const getActiveKey = () => {
        const path = location.pathname;
        const item = navList.find(([, , url]) => url === path);
        return item ? `${navList.indexOf(item) + 1}` : '1';
    };
    const [selectedKey, setSelectedKey] = useState(getActiveKey);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    useEffect(() => {
        dispatch(initializeApp())
    }, []);


    useEffect(() => {
        const handleRouteChange = () => {
            setSelectedKey(getActiveKey());
        };

        handleRouteChange();
        return () => {

        }
    }, [location]);

    if (!initialized) {
        return <Preloader/>;
    }

    return (

        <Layout>

            <Header/>

            <Content

                style={{
                    paddingTop: '20px',
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
                                    items={items2.map(item => ({
                                        key: item.key,
                                        icon: item.icon,
                                        label: <Link to={item.label.props.to}>{item.label.props.children}</Link>,
                                    }))}
                                />
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

                                        <Route path='/users/*' element={<UsersPage pageTitle={"Users"}/>}/>

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
                Created by Mark  Valishin ©{new Date().getFullYear()}
            </Footer>
        </Layout>


    )
}


export default App







