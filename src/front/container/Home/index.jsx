import { parseJsonByString } from '../../../common/utils';
import { Helmet } from 'react-helmet';
import Banner from './component/Banner';
import Footer from './component/Footer';
import List from './component/List';

const pageSchema = parseJsonByString(window.localStorage.schema, {});
const { children = [], attributes = {} } = pageSchema;

const map = { Footer, Banner, List };

const render = (index, item) => {
  const Component = map[item.name];
  return Component ? <Component key={index} schema={item} /> : null;
}

const Home = () => {
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