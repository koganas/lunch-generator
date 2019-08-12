import React, { Component } from 'react';
import axios from 'axios';

class Generator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frase: 'Onde almoçar?',
      preco: '...',
      nota: '...'
    };
  }

  genRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  changeRestaurant = event => {
    const length = this.todasFrases.length;
    let data = this.todasFrases[this.genRandomNumber(0, length)];
    this.setState({
      frase: data.restaurante,
      preco: data.preco,
      nota: data.nota
    });
  };

  genRestaurant = async () => {
    this.todasFrases = await axios.get('restaurantes.json')
      .then( res => {
        return res.data.map(frases => frases);
      });
    const length = this.todasFrases.length;
    let data = this.todasFrases[this.genRandomNumber(0, length)];
    console.log(length, this.todasFrases);
    this.setState({
      frase: data.restaurante,
      preco: data.preco,
      nota: data.nota
    });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this.genRestaurant} className="button">
          Tô co fome
        </button>
        <h2>{this.state.frase}</h2>
        <h5>{'Nota: '+this.state.nota}</h5>
        <p>{'R$'+this.state.preco}</p>
      </div>
    );
  }
}

export default Generator;