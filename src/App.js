import React from 'react';
import {create, all} from 'mathjs';
import './App.css';

const config={};
const math = create(all, config);

const keyArr = ['AC','/','x','+','-','.','='];
for (let i = 0; i < 10; i++) {
    keyArr.push(i.toString());
}

const Display = (props) => {
    return (
        <div id={props.name}>{props.myText}</div>
    );
}

class KeyPad extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <input type="button" id={this.props.myValue} value={this.props.myValue} className="keypad" onClick={this.props.action}/>
        );
    };
}

const KeyPadArea = (props) => {
    const keyPads = props.action.map(x=> <KeyPad myValue={x.name} action={x.action}/>);
    return (
        <div id="keypads">{keyPads}</div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            result: "0",
            lastNum: 0
        };
        this.clearAll = this.clearAll.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCompute = this.handleCompute.bind(this);
    }
    
    clearAll() {
        console.log("clearAll");
        this.setState({
            result: "0",
            lastNum: 0
        });
    }
    
    handleClick(e) {
        if (this.state.result === "0") {
            this.state.result = ""
        }
        if (e.target.value==="x") {
            e.target.value="*";
        }
        this.setState({
            result: this.state.result + e.target.value,
            lastNum: e.target.value
        });
    }
    
    handleCompute() {
        const newResult = math.evaluate(this.state.result);
        this.setState({
            result: newResult,
            lastNum: newResult
        });
    }
    
    render() {
        let keyData = [];
        for (let i = 0; i < keyArr.length; i++) {
            let temp = {};
            temp.name = keyArr[i];
            switch(keyArr[i]) {
                case "AC":
                    temp.action = this.clearAll;
                    break;
                case "=":
                    temp.action = this.handleCompute;
                    break;
                default:
                    temp.action = this.handleClick;
                    break;
            }
            console.log(i, keyArr[i], temp, keyData);
            keyData.push(temp);
        }
        console.log("keyData in App: ", keyData);
        return (
          <div className="App">
              <div id="container">
                  <Display name="result-display" myText={this.state.result} /> 
                  <Display name="display" myText={this.state.lastNum} />
                  <KeyPadArea action={keyData}/>
              </div>    
          </div>
        );
    }
}

export default App;
