import { Breadcrumbs } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

import '../../styles/components/common/NavBar.scss';

export type NavBarLink = {
  name: string;
  url: string;
}

type NavBarProps = {
  links: Array<NavBarLink>;
};

const NavBar = ({ links }: NavBarProps) => {
  return (
    <div className="NavBar">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
      {
        links.map((link, index) => {
          return (
            <Link
              key={link.url}
              to={link.url}
              className={`NavBar__link${index === links.length - 1 ? ' NavBar__link--active' : ''}`}
            >
              {link.name}
            </Link>
          );
        })
      }
      </Breadcrumbs>
    </div>
  );
};

export default NavBar;
