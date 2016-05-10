import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import '../scss/simple-grid.scss';
import '../scss/_app.scss';

import Nav from './Nav.js';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="grid grid-pad">
        <Nav />
        <div>{ children }</div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    recipesOwned: state.recipesOwned,
    recipesFollowed: state.recipesFollowed,
  };
};

// const mapDispatchToProps = function (dispatch) {
//   return {
//    // fill in any actions here
//   };
// };

App.propTypes = {
  recipesOwned: PropTypes.array.isRequired,
  recipesFollowed: PropTypes.array.isRequired,
  // profile: PropTypes.shape({
  //   avatar: PropTypes.string,
  //   username: PropTypes.string,
  // }).isRequired,
  // toggleEdit: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps
  // mapDispatchToProps,
)(App);
