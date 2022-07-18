import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select } from 'antd';
import { SortableElement } from 'react-sortable-hoc';
import { cloneDeep } from 'lodash';
import { getChangePageChildAction, getDeletePageChildAction } from '../../../../store/action';
import Banner from './component/Banner';
import List from './component/List';
import Footer from './component/Footer';
import styles from './style.module.scss';

const { Option } = Select;
const map = { Banner, List, Footer };

const useStore = (index) => {
  const dispatch = useDispatch();
  const pageChild = useSelector((state) => state.common.schema.children?.[index] || {});
  const changePageChild = (temp) => {
    dispatch(getChangePageChildAction(index, temp));
  }
  const removePageChild = () => {
    dispatch(getDeletePageChildAction(index));
  }
  return { pageChild, changePageChild, removePageChild };
}

const AreaItem = (props) => {
  const { value: index } = props;
  const { pageChild, changePageChild, removePageChild } = useStore(index);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ tempPageChild, setTempPageChild ] = useState(cloneDeep(pageChild));

  useEffect(() => {
    setTempPageChild(cloneDeep(pageChild));
  }, [pageChild])

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleModalOk = () => {
    setIsModalVisible(false);
    changePageChild(tempPageChild);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTempPageChild(cloneDeep(pageChild))
  };

  const handleSelectorChange = (value) => {
    setTempPageChild({ name: value, attributes: {}, children: []});
  }

  const changeTempPageChildAttributes = (kvObj) => {
    const newTempPageChild = { ...tempPageChild };
    for(let key in kvObj) {
      newTempPageChild.attributes[key] = kvObj[key];
    }
    setTempPageChild(newTempPageChild);
  }

  const changeTempPageChildChildren = (children) => {
    const newTempPageChild = { ...tempPageChild };
    newTempPageChild.children = children;
    setTempPageChild(newTempPageChild);
  }

  const getComponent = () => {
    const { name } = tempPageChild;
    const Component = map[name];
    return Component ? (
      <Component {...tempPageChild} changeAttributes={changeTempPageChildAttributes} changeChildren={changeTempPageChildChildren} />
    ) : null;
  }

  return (
    <li className={styles.item}>
      <span
        className={styles.content}
        onClick={showModal}
      >{pageChild.name ? pageChild.name + ' 组件' : '当前区块内容为空'}</span>
      <span className={styles.delete}>
        <Button onClick={removePageChild} size="small" type="dashed" danger>删除</Button>
      </span>
      <Modal
        title="选择组件"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        bodyStyle={{maxHeight: 600, overflowY: 'scroll'}}
      >
        <Select value={tempPageChild.name} className={styles.selector} style={{ width: '100%' }} onChange={handleSelectorChange}>
          <Option value='Banner'>Banner 组件</Option>
          <Option value='List'>List 组件</Option>
          <Option value='Footer'>Footer 组件</Option>
        </Select>
        { getComponent() }
      </Modal>
    </li>
  )
}

export default SortableElement(AreaItem);
