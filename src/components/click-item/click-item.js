import React, { Component } from 'react';
import './click-item.css';

import Images from './../../images';

class ClickItem extends Component {
  constructor(props) {
    // initialize the state of the 'seeded' attributes from the props? - this one
    // or
    // get the correct state from db and only reference props. let app own the state
    super(props);

    // Ideally this would be altered before storing based on current level, etc.
    this.state = {
      clickValue: props.item.initialClickValue,
      upgradePrice: props.item.initialUpgradePrice,
      buyTime: props.item.initialBuyTime,
      name: props.item.name,
      isBuying: false
    };

    this.buy = this.buy.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.updateInternalState = this.updateInternalState.bind(this);
    this.updateStylesheetAnimation = this.updateStylesheetAnimation.bind(this);

    this.updateInternalState();
    this.updateStylesheetAnimation();
  }

  buy() {
    if (this.state.isBuying) return false;
    this.state.isBuying = true;
    const selector = `.click-item__buy-button__progress.${this.state.name}`;
    document.querySelector(selector).classList.add('active');

    setTimeout(() => {
      this.props.addMoney(this.props.item.initialClickValue);
      this.state.isBuying = false;
      console.log(document.querySelector(selector).classList.remove('active'));
    }, this.state.buyTime * 1000)
  }

  upgrade() {
    // stubby
  }

  updateStylesheetAnimation() {
    const selector = `.click-item__buy-button__progress.${this.state.name}.active`;
    const rule = `transition: all ${this.state.buyTime}s linear;`;
    console.log((`${selector} {${rule}}`));
    document.styleSheets[0].insertRule(`${selector} {${rule}}`);
  }

  updateInternalState() {
    //this will set the state based on the props passed from app (which come from db)
    const clickValue = 0;
    const upgradePrice = 0;
    const buyTime = 0;
  }

  render() {
    return (
      <div className="click-item">
        <div className="click-item__buy-button noselect" onClick={this.buy}>
          <span className="click-item__buy-button_text">Buy</span>
          <div className={"click-item__buy-button__progress " + this.state.name + " noselect"}></div>
        </div>
        <div className="click-item__info-container">
          <div className="click-item__image">
            <img src={Images[this.props.item.name]} alt={this.props.item.imageIdentifier}/>
          </div>
          <div className="click-item__upgrade-button">
            <span>Upgrade for {this.props.item.initialUpgradePrice} coins</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ClickItem;
