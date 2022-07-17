import { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';
import { parseJsonByString } from '../../../../../common/utils';

let schema = parseJsonByString(window.localStorage.schema, {});
const listData = schema?.children?.splice(3) || [];

const AreaList = (props, ref) => {

  const [ list, setList ] = useState(listData);
  
  const handleAddBtnClick = () => {
    const newList = [...list];
    newList.push({});
    setList(newList);
  }

  const handleDeleteBtnClick = (index) => {
    const newList = [...list];
    newList.splice(index, 1)
    setList(newList);
  }

  useImperativeHandle(ref, () => {
    return { list };
  })

  return (
    <div>
      <ul className={styles.list}>
        {
          list.map((item, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.content}>当前区块内容为空</span>
              <span className={styles.delete}>
                <Button onClick={() => handleDeleteBtnClick(index)} size="small" type="dashed" danger>删除</Button>
              </span>
            </li>
          ))
        }
      </ul>
      <Button type="primary" ghost onClick={handleAddBtnClick}>新增页面区块</Button>
    </div>
  );
}

export default forwardRef(AreaList);