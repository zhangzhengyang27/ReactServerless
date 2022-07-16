import {useState} from 'react';
import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import styles from './style.module.scss';

const {Header, Sider, Content} = Layout;

// hook语法h好处就是不存在this指向的问题
const HomeManagement = () => {
    // const returnValue = useState(false);
    // const collapsed=returnValue[0];
    // const setCollapsed=returnValue[0];

    // 代替上面的语法
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const handleHomePageRedirect = () => {
        window.location.href = "/"
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        首页内容管理
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<VideoCameraOutlined/>}
                        onClick={handleHomePageRedirect}
                    >
                        返回用户页面
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
                    {/*  点击变换图标*/}
                    {
                        collapsed
                            ? <MenuUnfoldOutlined className={styles.trigger} onClick={toggle}/>
                            : <MenuFoldOutlined className={styles.trigger} onClick={toggle}/>
                    }
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 1000,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomeManagement;
