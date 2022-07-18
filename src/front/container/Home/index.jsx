import { useState, useEffect } from 'react';
import request from '../../../common/request';
import { parseJsonByString } from '../../../common/utils';
import { Helmet } from 'react-helmet';
import Banner from './component/Banner';
import Footer from './component/Footer';
import List from './component/List';

const map = { Footer, Banner, List };

const render = (index, item) => {
  const Component = map[item.name];
  return Component ? <Component key={index} schema={item} /> : null;
}

const Home = () => {
  const [ pageSchema, setPageSchema ] = useState({});
  const { children = [], attributes = {} } = pageSchema;

  useEffect(() => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && setPageSchema(parseJsonByString(data.schema, {}));
    });
  }, [])

  return (
    <div>
      <Helmet>
        <title>{attributes?.title || ''}</title>
      </Helmet>
      { children.map((item, index) => render(index, item)) }
    </div>
  );
}

export default Home;