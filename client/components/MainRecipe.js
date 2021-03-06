import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import actions from '../actions/index.js';
import { forkRecipe, fetchRecipes, fetchRecipe, fetchUser } from '../utils/utils';
import RecipeContainer from './RecipeContainer';
import Fork from './Fork';
import ForkHistoryVis from './ForkHistoryVis';
import '../scss/_main.scss';
import '../scss/_mainRecipe.scss';

import Like from './Like.js';
import Follow from './Follow.js';
class MainRecipe extends Component {
  componentDidMount() {
    const { getRecipe, id, setMainRecipeImage, recipe, setRecipeOwner } = this.props;
    if (id) {
      getRecipe(id, setMainRecipeImage, setRecipeOwner);
    }
  }

  componentWillUpdate(nextProps) {
    const currId = this.props.id;
    const { getRecipe, id, setMainRecipeImage, setRecipeOwner } = nextProps;
    if (+currId !== +id) {
      getRecipe(id, setMainRecipeImage, setRecipeOwner);
    }
  }

  render() {
    const { user, navToEdit, navToProfile, recipe, historyRecipes, setMainRecipeImage, mainRecipeImage, recipeOwner, toggleParentSteps } = this.props;

    let editButton;
    if (user.id === recipe.author && user.id !== null) {
      editButton = <button
      className="btn btn-primary btn-sm btn-toggle-edit"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navToEdit(user);
      }}
      style={{marginRight: '10px'}}
      >Edit</button>;
    } else {
      editButton = <button className="btn btn-primary btn-sm btn-toggle-edit" disabled style={{marginRight: '10px'}}>Edit</button>
    }

    let recipeImages;
    if (recipe.images) {
      recipeImages = (
        <div className="recipe-header-thumbs">
          {recipe.images.map((image) =>
            <div onClick={() => setMainRecipeImage(image)} className="recipe-header-thumb">
              <img className="recipe-header-thumbs-image" src={image} />
            </div>)}
        </div>);
    }

    let recipeTags;

    if (recipe.tags) {
      recipeTags = (
        <div>
          <h4 className="tags-title">Tags:</h4>
          <ul className="tags-list">
            {recipe.tags.map(t => <li className="tag">
              <Link
                to={`/recipe/${t}`}
              >{t}</Link>
            </li>)}
          </ul>
        </div>
      );
    }

    let recipeIngredients;
    if (recipe.ingredients) {
      recipeIngredients = (
        <div className="ingredients">
          <h4 className="instruction-title">Ingredients</h4>
          <ul>
            {recipe.ingredients.map((i) => <li> {i} </li>)}
          </ul>
        </div>
      );
    }

    let recipePrep;
    if (recipe.prep_steps) {
      recipePrep = (
        <div className="prep" style={{marginTop: '10px'}}>
          <h4 className="instruction-title"> Preparation <small>Time: {recipe.prep_time}</small></h4>
          <ol>
            {recipe.prep_steps.map((s) => <li> {s} </li>)}
          </ol>
        </div>
      );
    }

    let recipeCook;
    if (recipe.cook_steps) {
      recipeCook = (
        <div className="cook" style={{marginTop: '10px'}}>
          <h4 className="instruction-title"> Cook <small>Time: {recipe.cook_time}</small></h4>
          <ol>
          { recipe.cook_steps.map((s) => <li> {s} </li>)}
          </ol>
        </div>
      );
    }

    let recipeFinish;
    if (recipe.finish_steps) {
      recipeFinish = (
        <div className="finish" style={{marginTop: '10px'}}>
          <h4 className="instruction-title"> Finish </h4>
          <ol>
          { recipe.finish_steps.map((s) => <li> {s} </li>)}
          </ol>
        </div>
      );
    }

    let parentRecipeIngredients;
    let parentRecipePrep;
    let parentRecipeCook;
    let parentRecipeFinish;
    let compareParentButton;


    //PARENT RECIPE LOGIC
    if (recipe.parentRecipe) {

      if (recipe.parentRecipe.ingredients) {
        compareParentButton = <button
        className="btn btn-primary btn-sm btn-compare-parent"
        onClick={toggleParentSteps} >Toggle Previous Recipe Steps</button>;
      } else {
        compareParentButton = <button className="btn btn-primary btn-sm btn-compare-parent" disabled>Compare to Parent</button>
      }

      if (recipe.parentRecipe.ingredients) {
        parentRecipeIngredients = (
          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul>
              {recipe.parentRecipe.ingredients.map((ingredient, i) => recipe.ingredients[i] === ingredient ?  <li> {ingredient} </li> :  <li className="changedParentItem"> {ingredient} </li>)}
            </ul>
          </div>
        );
      }

      if (recipe.parentRecipe.prep_steps) {
        parentRecipePrep = (
          <div className="prep" style={{marginTop: '10px'}}>
            <h4> Preparation <small>Time: {recipe.parentRecipe.prep_time} </small></h4>
            <ol>
              {recipe.parentRecipe.prep_steps.map((s) => <li> {s} </li>)}
            </ol>
          </div>
        );
      }

      if (recipe.parentRecipe.cook_steps) {
        parentRecipeCook = (
          <div className="cook" style={{marginTop: '10px'}}>
            <h4> Cook <small>Time: {recipe.parentRecipe.cook_time}</small></h4>
            <ol>
            { recipe.parentRecipe.cook_steps.map((s) => <li> {s} </li>)}
            </ol>
          </div>
        );
      }

      if (recipe.parentRecipe.finish_steps) {
        parentRecipeFinish = (
          <div className="finish" style={{marginTop: '10px'}}>
            <h4> Finish </h4>
            <ol>
            { recipe.parentRecipe.finish_steps.map((s) => <li> {s} </li>)}
            </ol>
          </div>
        );
      }
  }

    let parentSteps;
    if (recipe.showParentSteps) {
      parentSteps = (
        <div className="parent-recipe-instructions row">
          <div className="col-xs-12">
            <h2>Previous Recipe Steps</h2>
            <div className="recipe-instructions">
              {parentRecipeIngredients}
              {parentRecipePrep}
              {parentRecipeCook}
              {parentRecipeFinish}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="recipe-content">
          <div className="recipe-content-header">
            <div className="recipe-header-meta row">
              <div className="recipe-header-names col-xs-12">
                <h1 className="recipe-main-author" ><span onClick={() => navToProfile(recipe.author)}>{recipeOwner} </span>/ {recipe.title} </h1>
              </div>
            </div>
            <div className="row">
              <div className="recipe-header-names col-md-6" style={{marginBottom:'40px'}}>
                {/*<p className="recipe-main-split">/</p>*/}
                {/*<p className="recipe-main-title"> {recipe.title}</p>*/}
                <div className="recipe-header-buttons" style={{marginTop: '20px', marginBottom: '10px'}}>
                  {editButton}
                  <Fork recipeID={recipe.id} />
                  <Like className="recipe-main-likes" recipeID={recipe.id} style={{marginRight: '10px'}} />
                  <Follow parent={{ id: recipe.id }} />
                </div>
                <div className="recipe-header-main-image">
                  <img src={mainRecipeImage} />
                  {recipeImages}
                </div>
                <h4>Servings: {recipe.yield + ' ' + recipe.yield_unit} </h4>
                {recipeTags}
              </div>
              <div className="recipe-header-fork-history col-md-6">
                <h3>Fork History</h3>
                <ForkHistoryVis recipe={recipe} history={historyRecipes} />
                <RecipeContainer
                  className="fork-history"
                  type="Recipe History"
                  recipes={historyRecipes}
                />
              </div>
            </div>
          </div>
          <div className="recipe-content-body">
            {compareParentButton}
            {/*<div className="recipe-instructions-parent row">*/}
              {parentSteps}
            {/*</div>*/}

            <div className="row">
              <div className="col-xs-12">
                <h2> Recipe Steps </h2>
                <div className="recipe-instructions">
                  {recipeIngredients}
                  {recipePrep}
                  {recipeCook}
                  {recipeFinish}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    recipe: state.recipe,
    mainRecipeImage: state.mainRecipeImage,
    recipeOwner: state.recipeOwner,
    fork_history: state.recipe.fork_history || [],
    historyRecipes: state.recipe.historyRecipes,
    id: ownProps.params.id,
    followState: null,
    likeState: null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    navToEdit: () => {
      dispatch(push('/create'));
    },

    navToProfile: (userID) => {
      dispatch(push(`/profile/${userID}`));
    },

    setMainRecipeImage: (imageURL) => {
      if (imageURL) {
        dispatch(actions.setMainRecipeImage(imageURL));
      }
    },

    setRecipeOwner: (authorID) => {
      fetchUser(authorID, (user) => {
        dispatch(actions.setRecipeOwner(user.display_name));
      });
    },

    toggleParentSteps: () => {
      dispatch(actions.toggleParentSteps());
    },

    getRecipe: (recipeID, setRecipeImage, setRecipeOwner) => {
      fetchRecipe(recipeID, (recipe) => {
        dispatch(actions.setRecipe(recipe));
        if (recipe.parent) {
          fetchRecipe(recipe.parent, (parentRecipe) => {
            dispatch(actions.setParentRecipe(parentRecipe));
          });
        }
        setRecipeImage(recipe.images[0]);
        setRecipeOwner(recipe.author);
        fetchRecipes(recipe.fork_history, (recipes) => {
          dispatch(actions.setRecipeHistory(recipes));
        });
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRecipe);
