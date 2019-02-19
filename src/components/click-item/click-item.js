import React, { Component } from 'react';
import './click-item.css';

import Images from './../../images';

class ClickItem extends Component {
  constructor(props) {
    // initialize the state of the 'seeded' attributes from the props? - this one
    // or
    // get the correct state from db and only reference props. let app own the state
    super(props);

    this.state = {
      clickValue: props.item.initialClickValue,
      upgradePrice: props.item.initialUpgradePrice,
      buyTime: props.item.initialBuyTime,
    };

    this.buy = this.buy.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.updateInternalState = this.updateInternalState.bind(this);

    this.updateInternalState();
  }

  buy() {
    this.props.addMoney(this.props.item.initialClickValue)
  }

  upgrade() {
    // stubby
  }

  updateInternalState() {
    console.log(this.state);
    const clickValue = 0;
    const upgradePrice = 0;
    const buyTime = 0;
  }

  render() {
    return (
      <div className="click-item">
        <div className="click-item__buy-button noselect" onClick={this.buy}>Buy</div>
        <div className="click-item__info-container">
          <div className="click-item__image">
            <img src={Images[this.props.item.imageIdentifier]} alt={this.props.item.imageIdentifier}/>
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
