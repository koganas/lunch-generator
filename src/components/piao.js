import React, { Component } from 'react';

class Piao extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="container">
        <div id="wrapper">
          <div id="moldura">
            <div id="piao">
              <div className="numero um">1</div>
              <div className="numero dois">2</div>
              <div className="numero tres">3</div>
              <div className="numero quatro">4</div>
              <div className="numero cinco">5</div>
              <div className="numero seis">6</div>
            </div>
          </div>
        </div>
        <audio preload="auto" loop="true">
          <source src="piao-da-casa-propria-soundtrack.mp3" />
          <source src="piao-da-casa-propria-soundtrack.m4a" />
          <source src="piao-da-casa-propria-soundtrack.ogg" />
        </audio>
        <div id="mute">▶</div>
      </div>
    );
  }
}

export default Piao;