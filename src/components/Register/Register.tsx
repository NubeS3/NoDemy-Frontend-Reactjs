import {useState} from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import RegisterPhase from "./RegisterPhase";
import ConfirmEmail from "./ConfirmEmailPhase";
import { RootState } from "../../reducers/root.reducer";
import paths from "../../configs/paths.config";
import PageWrapper from "../common/PageWrapper";
import { NavBarLink } from "../common/NavBar";
import RouterProps from "../../types/RouterProps.type";

const mapStateToProps = (state: RootState) => ({
  refreshToken: state.authorizationReducer.refreshToken,
});

const connector = connect(mapStateToProps);

type RegisterProps = ConnectedProps<typeof connector> & RouterProps;

const Register = ({ refreshToken, history }: RegisterProps) => {
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base,
  }, {
    name: 'Register',
    url: paths.register,
  }];

  if (refreshToken) {
    return <Redirect to={paths.base} />
  }

  if (!userId) {
    
    return (
      <PageWrapper links={links} history={history}>
        <RegisterPhase
          setPassword={setPassword}
          setUserId={setUserId}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper links={links} history={history}>
      <ConfirmEmail
        password={password}
        userId={userId}
        setUserId={setUserId}
      />
    </PageWrapper>
  );
};

export default withRouter(connector(Register));
