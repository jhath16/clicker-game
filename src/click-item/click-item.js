import React, { Component } from 'react';
import './click-item.css';

import Images from './../images';

class ClickItem extends Component {
  constructor(props) {
    super(props);
    this.buy = this.buy.bind(this);
    console.log(Images);
  }

  buy() {
    this.props.addMoney(this.props.item.clickAmount)
  }

  render() {
    return (
      <div className="click-item">
        <div className="click-item__buy-button noselect" onClick={this.buy}>Buy</div>
        <div className="click-item__info-container">
          <div className="click-item__image">
            <img src={Images[this.props.item.imageIdentifier]}/>
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
