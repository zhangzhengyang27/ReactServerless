import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import { parseJsonByString } from '../common/utils';
import store from './store';
import { getChangeSchemaAction } from './store/action'
import HomeManagement from './container/HomeManagement';
import BasicSetting from './container/BasicSetting';
import styles from './style.module.scss';

import 'normalize.css';
import 'antd/dist/antd.css';
import './style.scss';

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [ collapsed, setCollapsed ]  = useState(false);
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed }
}

const useStore = () => {
  const dispatch = useDispatch();
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  return { changeSchema };
}

const Wrapper = () => {
  const handleHomePageRedirect = () => {window.location.href = "/"}
  const { collapsed, toggleCollapsed } = useCollapsed();
  const { changeSchema } = useStore();

  useEffect(() => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
    });
  }, [changeSchema]);

  return (
    <Router>
      <Layout>
        <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
            <Menu.Item key="admin-home">
              <Link to="/">
                <span className="iconfont">&#xe64d;</span>{
                  !collapsed?"首页内容管理":null}
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <Link to="/setting">
                <span className="iconfont">&#xe64d;</span>{
                !collapsed?"基础内容配置":null}
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
              <span className="iconfont">&#xe601;</span>{
              !collapsed?"返回用户页面":null}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            {
              collapsed
                ? <span className='iconfont' onClick={toggleCollapsed}>&#xe62c;</span>
                : <span className='iconfont' onClick={toggleCollapsed}>&#xe629;</span>
            }
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Route path='/' component={HomeManagement} exact />
              <Route path='/setting' component={BasicSetting} exact />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('root')
);
