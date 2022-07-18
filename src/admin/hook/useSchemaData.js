import { useSelector, useDispatch } from 'react-redux';
import {
  getChangeSchemaAction,
  getChangePageChildAction,
  getDeletePageChildAction,
  getChangePageAttributeAction
} from '../store/action';

export const useSchemaData = (index) => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema);
  const pageChild = useSelector((state) => state.common.schema.children?.[index] || {});
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value));
  }
  const changePageChild = (temp) => {
    dispatch(getChangePageChildAction(index, temp));
  }
  const removePageChild = () => {
    dispatch(getDeletePageChildAction(index));
  }
  return {
    schema, pageChild, changePageAttribute,
    changeSchema, changePageChild, removePageChild
  };
}
