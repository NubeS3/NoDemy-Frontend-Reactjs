import useWindowDimensions from "../../utils/useWindowDimensions.util";
import HeaderMobile from "./HeaderMobile";
import HeaderPc from "./HeaderPc";

type HeaderProps = {
  history: {
    push: Function,
    location: {
      search: string,
    },
  },
};

const Header = ({ history }: HeaderProps) => {
  const { width } = useWindowDimensions();

  if (width >= 1150) {
    return <HeaderPc history={history} />
  }

  return <HeaderMobile history={history} />
};

export default Header;