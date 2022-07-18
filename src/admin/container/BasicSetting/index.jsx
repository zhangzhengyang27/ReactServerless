import { Button, Input } from 'antd';
import request from '../../../common/request';
import { useSchemaData } from '../../hook/useSchemaData';
import { parseJsonByString } from '../../../common/utils';
import styles from './style.module.scss';

const BasicSetting = () => {
  const { schema = {}, changeSchema, changePageAttribute } = useSchemaData();
  const { attributes = {} } = schema;
  const { title = '' } = attributes;

  const handleSaveBtnClick = () => {
    const token=window.localStorage;
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{headers:{
      token
      }}).then(() => {})
  }

  const handleResetBtnClick = () => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
    });
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
