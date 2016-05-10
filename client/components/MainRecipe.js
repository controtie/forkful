import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { forkRecipe } from '../utils/utils';
import '../scss/_mainRecipe.scss';

class MainRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleEdit, handleToggleEdit, recipe, onForkClick } = this.props;
    return (
      <div>
        <button className="btn-toggle-edit" onClick={ handleToggleEdit }> Toggle Edit </button>

        {/* hardcode userID to 1337 until authentication is implemented */}
        <button className="btn-fork" onClick={ onForkClick.bind(null, recipe.id, 1337) }>Fork</button>
        <div className="recipe-content" contentEditable={toggleEdit}>

          <div className="header">
            <h2 className="recipe-title">{recipe.title}</h2>
            <div className="recipe-images">
              {recipe.images.map((image) => <img src={image} />)}
            </div>
            <h4>Servings: {recipe.yield + ' ' + recipe.yield_unit} </h4>
            <h4> tags: {recipe.tags.map(t => <a> {t} </a>)} </h4>
          </div>

          <div className="instructions">

            <div className="ingredients">
              <ul>
                <h4> Ingredients </h4>
                {recipe.ingredients.map((i) => <li> {i} </li>)}
              </ul>
            </div>

            <div className="prep">
              <h4> Prep | Time: {recipe.prep_time} </h4>
              <ol>
              {recipe.prep_steps.map((s) => <li> {s} </li>)}
              </ol>
            </div>

            <div className="cook">
              <h4> Cook | Time: {recipe.cook_time} </h4>
              <ol>
              {recipe.cook_steps.map((s) => <li> {s} </li>)}
              </ol>
            </div>

            <div className="finish">
              <h4> Finish </h4>
              <ol>
              {recipe.finish_steps.map((s) => <li> {s} </li>)}
              </ol>
            </div>
          </div>

          <div className="documentation">
            <h2> Documentation </h2>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toggleEdit: state.toggleEdit,
    // userID: state.user.id || 1337,
    recipe: state.recipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForkClick: (recipeID, userID) => {
      forkRecipe(recipeID, userID, (newRecipe) => {
        dispatch(actions.forkRecipe(newRecipe));
      });
    },
    handleToggleEdit: () => dispatch(actions.toggleEdit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRecipe);

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>
