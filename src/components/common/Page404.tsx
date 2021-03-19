import { Link } from 'react-router-dom';
import paths from '../../configs/paths.config';

import '../../styles/components/common/Page404.scss';

const Page404 = () => {
  return (
    <div className="Page404">
      <h1 className="title Page404__title">Oops!</h1>
      <p className="Page404__description">We can't find the page you're looking for.</p>
      <p className="Page404__description">Go back to <Link className="Page404__description--link" to={paths.base}>HOME PAGE</Link>.</p>

      <p style={{ fontSize: '12' }}>Error: 404 Not Found</p>
    </div>
  );
};

export default Page404;