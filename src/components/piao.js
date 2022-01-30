import React, { Component } from 'react'
import axios from 'axios'
import PiaoMusic from '../assets/piao-da-casa-propria-soundtrack.mp3'
import BemBolada from '../assets/bem-bolada.mp3'

class Piao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rodando: false,
      acabou: false,
      frase: 'Onde almoçar?',
      preco: '...',
      nota: '...',
      img: '',
      showResults: '',
      hideBtn: ''
    };

    this.audio = new Audio(PiaoMusic);
    this.audioFim = new Audio(BemBolada);
  }

  /* animation and audio */
  runPiao = () => {
    this.togglePlay()
    this.showResults()
  }

  showResults() {
    if(!this.state.rodando) {
      this.audio.volume = .4
      setTimeout(
        ()=> {
          this.audio.volume = .2
          this.audioFim.play()
          this.genRestaurant()
        }, 3500
      )
    }
  }

  togglePlay = () => {
    this.setState({
      rodando: !this.state.rodando,
      showResults: '',
      hideBtn: 'hide'
    },() => {
      if(this.state.rodando) {
        this.audio.play()
      } else {
        this.audio.pause()
        this.audio.currentTime = 0
      }
    });
  }

  /* generate restaurant */
  genRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  changeRestaurant = event => {
    const length = this.allRestaurants.length;
    let data = this.allRestaurants[this.genRandomNumber(0, length)];
    this.setState({
      frase: data.restaurante,
      preco: data.preco,
      img: data.img,
      nota: data.nota
    });
  }

  genRestaurant = async () => {
    if(!this.allRestaurants) {
      this.allRestaurants = await axios.get('restaurantes.json')
        .then( res => {
          return res.data.map(restaurante => restaurante);
        });
    }

    const length = this.allRestaurants.length;
    let data = this.allRestaurants[this.genRandomNumber(0, length)];

    if(data) {
      this.allRestaurants = this.allRestaurants.filter(restaurante => restaurante.restaurante !== data.restaurante);

      this.setState({
        frase: data.restaurante,
        preco: data.preco,
        nota: data.nota,
        img: data.img
      });

      setTimeout(
        () => {
          this.setState({ showResults: 'show' })
          setTimeout(
            () => {
              this.setState({ rodando: false })
            }, 150
          )
        }, 250
      )
    } else {
      this.setState({ acabou: true })
    }
  }

  render() {
    return (
      <div className="container">
        <div className={'resultado ' + this.state.showResults} style={{ backgroundImage: 'url(' + this.state.img + ')' }} >
          <h2>{this.state.frase}</h2>
          <h5>{'Nota: ' + this.state.nota+'/5'}</h5>
          <p>{'R$' + this.state.preco}</p>
          <button onClick={this.runPiao} className="button">
            Não gostei, quero outro lugar
          </button>
        </div>

        { this.state.acabou ? (
          <a href="https://twitter.com/koganas" className="button" target="_blank" rel="noopener noreferrer">
            Não encontrou o que gosta? :(<br />
            Recomende outros lugares.
          </a>
        ) : (
          <button onClick = {this.runPiao} className={'button ' + this.state.hideBtn}>
            Tô co fome
          </button>
        )}

        <div id="wrapper" className={(this.state.hideBtn !== '' && !this.state.rodando) ? 'hide' : ''}>
          <div id="moldura">
            <div id="piao" className={this.state.rodando ? 'rodandoRapido' : ''}>
              <div className="numero um">1</div>
              <div className="numero dois">2</div>
              <div className="numero tres">3</div>
              <div className="numero quatro">4</div>
              <div className="numero cinco">5</div>
              <div className="numero seis">6</div>
            </div>
          </div>
        </div>

        <div className="footer">
          Feito com fome por <a href="https://github.com/koganas/lunch-generator" target="_blank" rel="noopener noreferrer">@koganas</a>
        </div>
      </div>
    );
  }
}

export default Piao;