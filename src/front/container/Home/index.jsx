import Banner from './component/Banner/';
import Courses from './component/Courses/';
import Footer from './component/Footer';
import { parseJsonByString } from '../../../common/utils';

const schema = parseJsonByString(window.localStorage?.schema, {});
const listData = schema?.children?.splice(3) || [];

const Home = () => {
  return (
    <div>
      <Banner />
      <Courses />
      <Footer />
      {
        listData.map((item, index) => {
          return <div key={index} className="wrapper">area</div>
        })
      }
    </div>
  );
}

export default Home;