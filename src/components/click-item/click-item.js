import React, { Component } from 'react';
import './click-item.css';

import Images from './../../images';

class ClickItem extends Component {
  constructor(props) {
    // initialize the state of the 'seeded' attributes from the props? - this one
    // or
    // get the correct state from db and only reference props. let app own the state
    super(props);

    // Only accept the currentLevel from the db
    // All other attributes about the items can be loaded client-side
    this.state = {
      currentLevel: this.props.currentLevel,
      isBuying: false
    };

    Object.assign(this.state, this.calculateNewInternalState(this.state.currentLevel));

    this.updateStylesheetAnimation();

    // bind methods
    this.buy = this.buy.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.calculateNewInternalState = this.calculateNewInternalState.bind(this);
    this.updateStylesheetAnimation = this.updateStylesheetAnimation.bind(this);
  }

  buy() {
    if (this.state.isBuying) return false;
    this.setState({
      isBuying: true
    });
    const selector = `.click-item__buy-button__progress.${this.state.name}`;
    document.querySelector(selector).classList.add('active');

    setTimeout(() => {
      this.props.addMoney(this.state.clickValue);
      this.setState({
        isBuying: false
      });
      document.querySelector(selector).classList.remove('active');
    }, this.state.buyTime * 1000)
  }

  upgrade() {
    // TODO: DO NOT ALLOW THE LEVEL TO BE UPDATED BEFORE ENSURING THERE IS ENOUGH MONEY
    // Create a method in the app component canBuy(amount)
    if (!this.props.canBuy(this.state.upgradePrice)) return false;
    this.setState(this.calculateNewInternalState(this.state.currentLevel + 1));
    this.setState((state,props) => ({
      currentLevel: state.currentLevel + 1
    }));

    this.props.subtractMoney(this.state.upgradePrice);
  }

  updateStylesheetAnimation() {
    //cache the selector or rule
    //remove the previous one (if it exists) before adding the new one below
    //OR
    //consider just adding the animation to the element?

    const selector = `.click-item__buy-button__progress.${this.state.name}.active`;
    const rule = `transition: all ${this.state.buyTime}s linear;`;
    document.styleSheets[0].insertRule(`${selector} {${rule}}`);
  }

  calculateNewInternalState(currentLevel) {

    // This will set the state based on the props passed from app (which come from db)
    // Ideally this would be altered before storing based on current level, etc.
    const clickValue = this.props.item.initialClickValue * (1 + (currentLevel - 1) * .2);
    const upgradePrice = 0;
    const buyTime = 0;

    let returnObj =  {
      clickValue: clickValue,
      upgradePrice: this.props.item.initialUpgradePrice,
      buyTime: this.props.item.initialBuyTime,
      name: this.props.item.name,
    };
    return returnObj
  }

  render() {
    return (
      <div className="click-item">
        <div className="click-item__buy-button" onClick={this.buy}>
          <span className="click-item__buy-button_text">Buy</span>
          <div className={"click-item__buy-button__progress " + this.state.name}></div>
        </div>
        <div className="click-item__info-container">
          <div className="click-item__image">
            <img src={Images[this.props.item.name]} alt={this.props.item.imageIdentifier}/>
          </div>
          <div className="click-item__upgrade-button" onClick={this.upgrade}>
            <span>Upgrade for {this.props.item.initialUpgradePrice} coins</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ClickItem;
