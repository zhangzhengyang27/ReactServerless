import { useState, useRef } from 'react';
import { Layout, Menu, Button } from 'antd';
import AreaList from './component/AreaList';
import PageSetting from './component/PageSetting';
import styles from './style.module.scss';

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [ collapsed, setCollapsed ]  = useState(false);
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed }
}

const HomeManagement = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();
  const handleHomePageRedirect = () => {window.location.href = "/"}
  const pageSettingRef = useRef();
  const areaListRef = useRef();

  const handleSaveBtnClick = () => {
    const schema = {
      name: 'Page',
      attributes: {},
      children: [{
        name: 'Banner',
        attributes: {
          title: pageSettingRef.current.title,
          description: pageSettingRef.current.description
        }
      }, {
        name: 'CourseList'
      },{
        name: 'Footer'
      }]
    };
    areaListRef.current.list.forEach(item => {
      schema.children.push({
        name: 'Area'
      })
    });
    const schemaStr = JSON.stringify(schema);
    window.localStorage.schema = schemaStr;
  }

  return (
    <Layout>
      <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
          <Menu.Item key="admin-home">
            <span className="iconfont">&#xe64d;</span>首页内容管理
          </Menu.Item>
          <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
          <span className="iconfont">&#xe601;</span>返回用户页面
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
          <PageSetting ref={pageSettingRef} />
          <AreaList ref={areaListRef} />
          <div className={styles.save}>
            <Button type="primary" onClick={handleSaveBtnClick}>保存区块配置</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomeManagement;