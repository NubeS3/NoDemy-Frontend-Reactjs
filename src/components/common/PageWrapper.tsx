import { FC } from 'react';
import { widthScreens } from '../../configs/sizes.config';
import useWindowDimensions from '../../utils/useWindowDimensions.util';
import Header from '../Header/Header';
import NavBar, { NavBarLink } from './NavBar';

type PageWrapperProps = {
  links: Array<NavBarLink>;
  history: {
    push: Function,
    location: {
      search: string,
    },
  }
};

const PageWrapper: FC<PageWrapperProps> = ({ children, links, history }) => {
  const {width} = useWindowDimensions();

  return (
    <div className="PageWrapper">
      <Header history={history} />
      {
        width >= widthScreens.m &&
        <NavBar links={links} />
      }
      {children}
    </div>
  );
};

export default PageWrapper;
