import React from 'react';
import {connect} from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';

import Icon from '../Sidebar/Icon/Icon'
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const   navigate  = useNavigate();
    
    return (
      <Component
        history={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

const Sidebar = () => (
  <nav className={s.root}>
    <header className={s.logo}>
      <Link to="/admin">
        <Icon glyph="logo" />
      </Link>
    </header>
    <ul className={s.nav}>
      <LinksGroup
        header="Dashboard"
        headerLink="/app/main"
        glyph="dashboard"
      />
      <LinksGroup
        header="Typography"
        headerLink="/app/typography"
        glyph="typography"
      />
      <LinksGroup
        header="Tables Basic"
        headerLink="/app/tables"
        glyph="tables"
      />
      <LinksGroup
        header="Profile"
        headerLink="/profile"
        glyph="notifications"
      />
     
    </ul>
  </nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));

//export default withRouter(Sidebar);
