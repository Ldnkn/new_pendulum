import React, { createRef } from 'react'
import './index.css'

var y = 0;
var t = 1;
var g = 0;
var v = 0;
var F;
var a = 1;

let prevTime = undefined;

class App extends React.Component {

  state ={
    Gravity : false
  };

  onChange = e =>{
    this.setState({Gravity : e.target.checked});
  }

  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.state = {
      stateK: 50,
      stateM: 2,
      flag: false,
    }
  }

  componentDidMount() {
    this.move()
  }

  draw = (ctx, dt=0.11) => {
    const {stateK} = this.state;
    const {stateM} = this.state;
    t = t + dt;
    F = 5*stateM*g - (0.05 * stateK)*y;
    a = F/stateM;
    v = v + a*dt;
    y = y + v*dt + a*(dt*dt)/2;
    ctx.clearRect(0, 0, 300, 800);
    ctx.fillStyle = "grey";
    ctx.fillRect(149.7 - (stateK / 30), 0, 1 + (stateK / 15), 75 + y);
    ctx.fillStyle = "black";
    ctx.fillRect((300 - 10 * stateM) / 2, 75 + y, 10 * stateM, 20 * stateM);
  };

  move = (timestamp) => {
    let deltaT = !!prevTime ? timestamp - prevTime : 0;
    prevTime = timestamp;
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d')
    canvas.width = 300;
    canvas.height = 800;
    this.draw(context, deltaT/1000);
    window.requestAnimationFrame(this.move);
  };

  onInputChange = (e) => {
    const inputValue = e?.target?.value;
    console.log('debug on event', inputValue);
    this.setState({stateK: inputValue});

    e.preventDefault();
  };

  onInputChangem = (e) => {
    const inputValue = e?.target?.value;
    this.setState({stateM: inputValue});

    e.preventDefault();
  };



  render () {
    const {Gravity} = this.state;
    return (
      <>
        <div>
          <h1 className="top">Пружинный маятник</h1>
          <p>
            Коэффициент упругости k = {' '}
            <input id="k" type="number" min="0" max="150" step="10" value={ this.state.stateK } onChange={ this.onInputChange }/>
            {' '} н/м
          </p>
          
          <p>
            Масса груза m = {' '}
            <input id="m" type="number"  min="1" max="10" step="1" value={ this.state.stateM } onChange={ this.onInputChangem }/>
            {' '} кг
          </p>

          <form>
            <p> g = {Gravity ? g = 9.8 : g = 0}</p>

            


            <label>
              Гравитация
              <input type = "checkbox"
              checked={Gravity}
              onChange={this.onChange}/>
            </label>
          </form>
          <div style={{height: 803, width: 302, background: Gravity ? 'transparent' : 'rgba(29, 59, 59, 0.726)', position: 'absolute'}}></div>

        

        </div>
        <canvas ref={ this.canvasRef } { ...this.props }/>
        
      </>
    )
  }
}


export default App
