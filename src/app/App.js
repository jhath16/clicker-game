import React, { Component } from 'react';
import './App.css';
import Items from './../assets/click-items.json';

import ClickItem from './../click-item/click-item';
import Nav from './../nav/nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
    }

    //bind events
    this.addMoney = this.addMoney.bind(this);
  }

  addMoney(amount) {
    this.setState( (state, props) => ({
      money: state.money += amount
    }));
  }

  render() {
    return (
      <div className="app">
          <Nav total={this.state.money}/>
          <section>
          <div className="container">
            {Items.items.map((item) =>
              <ClickItem item={item}
                         key={item.id}
                         addMoney={this.addMoney}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
