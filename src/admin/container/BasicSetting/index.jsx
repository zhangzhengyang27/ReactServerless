import { useSelector, useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import { parseJsonByString } from '../../../common/utils';
import styles from './style.module.scss';
import { getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action'

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema);
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value));
  }
  return { schema, changeSchema, changePageAttribute };
}

const BasicSetting = () => {
  const { schema = {}, changeSchema, changePageAttribute } = useStore();
  const { attributes = {} } = schema;
  const { title = '' } = attributes;

  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema);
  }

  const handleResetBtnClick = () => {
    changeSchema(parseJsonByString(window.localStorage.schema, {}))
  }

  const handleTitleChange = (e) => {
    changePageAttribute('title', e.target.value);
  };

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.title}>页面标题：</div>
        <div className={styles.content}>
          <Input value={title} onChange={handleTitleChange}/>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>保存基础配置</Button>
        <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置基础配置</Button>
      </div>
    </div>
  );
}

export default BasicSetting;
