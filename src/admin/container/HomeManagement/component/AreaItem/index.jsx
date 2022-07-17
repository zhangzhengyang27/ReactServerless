import { useState, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;

const AreaItem = (props, ref) => {
  const { index, item, changeAreaItem, removeItemFromChildren } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ schema, setSchema ] = useState(item);
  const [ temp, setTemp ] = useState(item);

  useEffect(() => {
    setSchema(props.item);
    setTemp(props.item);
  }, [props.item])

  useImperativeHandle(ref, () => {
    return {
      getSchema: () => { return schema; },
    };
  })

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleModalOk = () => {
    setIsModalVisible(false);
    setSchema(temp);
    changeAreaItem(index, temp);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTemp(schema)
  };

  const handleSelectorChange = (value) => {
    const newSchema = { name: value, attributes: {}, children: []};
    setTemp(newSchema);
  }

  return (
    <li className={styles.item}>
      <span
        className={styles.content}
        onClick={showModal}
      >{schema.name ? schema.name + ' 组件' : '当前区块内容为空'}</span>
      <span className={styles.delete}>
        <Button 
          onClick={() => removeItemFromChildren(index)}
          size="small" type="dashed" danger
        >删除</Button>
      </span>
      <Modal title="选择组件" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Select value={temp.name} className={styles.selector} style={{ width: '100%' }} onChange={handleSelectorChange}>
          <Option value='Banner'>Banner 组件</Option>
          <Option value='List'>List 组件</Option>
          <Option value='Footer'>Footer 组件</Option>
        </Select>
      </Modal>
    </li>
  )
}

export default forwardRef(AreaItem);
