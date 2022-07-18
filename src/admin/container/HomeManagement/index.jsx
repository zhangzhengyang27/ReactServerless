import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import axios from 'axios';
import AreaList from './component/AreaList';
import { parseJsonByString } from '../../../common/utils';
import styles from './style.module.scss';
import { getChangeSchemaAction } from '../../store/action';

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema);
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  return { schema, changeSchema };
}

const HomeManagement = () => {
  const { schema, changeSchema } = useStore();

  const handleSaveBtnClick = () => {
    axios.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    }).then(() => {})
  }

  const handleResetBtnClick = () => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
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