import { Button } from 'antd';
import request from '../../../common/request';
import AreaList from './component/AreaList';
import { useSchemaData } from '../../hook/useSchemaData';
import { parseJsonByString } from '../../../common/utils';
import styles from './style.module.scss';


const HomeManagement = () => {
  const { schema, changeSchema } = useSchemaData();

  const handleSaveBtnClick = () => {
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    }).then(() => {})
  }

  const handleResetBtnClick = () => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
    });
  }

  return (
    <div>
      <AreaList />
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>保存区块配置</Button>
        <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置区块配置</Button>
      </div>
    </div>
  );
}

export default HomeManagement;