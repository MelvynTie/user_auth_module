import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { verifyUser } from '../../actions/verify-user';
import UserList from '../../components/user-list';
import { AppContext } from '../../App';

import './dashboard.scss';

const Dashboard = props => {
  const { state, dispatch } = useContext(AppContext);
  const { user: { username, isAdmin } } = state;
  
  useEffect(() => {
    verifyUser(props, dispatch);
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', { method: 'POST' });
      const { isLoggedOut, error } = await response.json();

      if (!isLoggedOut || error) {
        throw new Error(error || 'Error logging out');
      }

      dispatch({ 
        type: 'SET_GLOBAL_MESSAGE', 
        payload: { text: 'You\'ve been logged out', type: 'confirmation' }
      });
      
      props.history.push('/login');
    } catch (error) {
      dispatch({ 
        type: 'SET_GLOBAL_MESSAGE', 
        payload: { text: error.message, type: 'error' }
      });
    }
  }

  return (
    <Fragment>
      <header className="dashboard-header">
        <div className="dashboard-header__logo">Dashboard</div>
        <ul className="dashboard-header__nav">
          <li>
            <span className="text-uppercase text-size-12">{username}</span>
          </li>
          <li>
            <button 
              className="btn btn--primary btn--sm" 
              type="button" 
              onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      </header>
      {isAdmin
        ? <Fragment>
            <h1 className="text-size-24 text-weight-semibold text-align-center margin-top-30 text-uppercase">
              Registered Users
            </h1>
            <div className="flex flex--justify-center margin-top-32">
              <UserList />
            </div>
          </Fragment>
        : null}
    </Fragment>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default Dashboard;
