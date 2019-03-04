import React, { Component } from 'react';
import './App.css';
import ClickItems from './../../assets/click-items.json';

import ClickItem from './../../components/click-item/click-item';
import Nav from './../nav/nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0
    }

    //bind events
    this.addMoney = this.addMoney.bind(this);
    this.subtractMoney = this.subtractMoney.bind(this);
    this.canBuy = this.canBuy.bind(this);
  }

  addMoney(amount) {
    this.setState( (state, props) => ({
      money: state.money += amount
    }));
  }

  subtractMoney(amount) {
    // if (amount > this.state.money) return false;
    this.setState( (state, props) => ({
      money: state.money -= amount
    }));
  }

  canBuy(amount) {
    return this.state.money > amount
  }

  render() {
    return (
      <div className="app noselect">
          <Nav total={(this.state.money).toFixed(2)}/>
          <section>
          <div className="container">
            {ClickItems.items.map((item) =>
              <ClickItem item={item}
                         key={item.id}
                         addMoney={this.addMoney}
                         subtractMoney = {this.subtractMoney}
                         currentLevel = {1}
                         canBuy = {this.canBuy}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
