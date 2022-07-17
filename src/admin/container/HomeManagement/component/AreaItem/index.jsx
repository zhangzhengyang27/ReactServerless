import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select } from 'antd';
import { SortableElement } from 'react-sortable-hoc';
import { getChangePageChildAction, getDeletePageChildAction } from '../../store/action';
import styles from './style.module.scss';

const { Option } = Select;

const useStore = (index) => {
  const dispatch = useDispatch();
  const pageChild = useSelector((state) => state.homeManagement.schema.children?.[index] || {});
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
  const [ tempPageChild, setTempPageChild ] = useState(pageChild);

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleModalOk = () => {
    setIsModalVisible(false);
    changePageChild(tempPageChild);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTempPageChild(pageChild)
  };

  const handleSelectorChange = (value) => {
    setTempPageChild({ name: value, attributes: {}, children: []});
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
      <Modal title="选择组件" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Select value={tempPageChild.name} className={styles.selector} style={{ width: '100%' }} onChange={handleSelectorChange}>
          <Option value='Banner'>Banner 组件</Option>
          <Option value='List'>List 组件</Option>
          <Option value='Footer'>Footer 组件</Option>
        </Select>
      </Modal>
    </li>
  )
}

export default SortableElement(AreaItem);
