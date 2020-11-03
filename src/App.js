import React from 'react';
import {create, all} from 'mathjs';
import './App.css';

const config={};
const math = create(all, config);


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
            <input type="button" id={this.props.myName} value={this.props.myValue} className="keypad" onClick={this.props.action}/>
        );
    };
}

const KeyPadArea = (props) => {
    const keyPads = props.action.map(x=> <KeyPad myName={x.name} myValue={x.value} action={x.action}/>);
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
        this.handleOperator = this.handleOperator.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleCompute = this.handleCompute.bind(this);
    }
    
    clearAll() {
        console.log("clearAll");
        this.setState({
            result: "0",
            lastNum: "0"
        });
    }
    
    handleOperator(e) {
        let operatorRegex = /[\+\-\x\/]/;
        let nextResult = this.state.result;
        let nextLastNum = this.state.lastNum;
        if (e.target.value==="x") { //Convert multiplication symbol to asterisk so that mathjs recognizes it
            e.target.value="*";
        }
        // handle consecutive operators
        if (e.target.value==="-") {
            nextResult += e.target.value;
            nextLastNum = e.target.value;
        } else { // +,/, or *
            let repeatedRegex = /[\+|\-|\*|\/]{2,}$/;
            //nextResult += e.target.value;
            console.log("before:", nextResult);
            if (repeatedRegex.test(nextResult)) {
                console.log("repeated operator detected!", nextResult.split());
                nextResult = nextResult.replace(repeatedRegex, e.target.value);
            } else {
                nextResult += e.target.value;
            }
            console.log("after:", nextResult);
            nextLastNum = e.target.value;
        }
        if (this.state.result === "0") {
            nextResult = e.target.value;
            nextLastNum = e.target.value;
        }
        this.setState({
            result: nextResult,
            lastNum: nextLastNum
        });
    }
    
    handleNumber(e) {
        let operatorRegex = /[\+\-\x\/]/;
        let numericalRegex = /[0-9\.]/
        let nextResult = this.state.result;
        let nextLastNum = this.state.lastNum;
        if (e.target.value === "." && /\./.test(this.state.lastNum)) {
                // e.target.value = "";
                // input = this.state.lastNum;
                nextResult = this.state.result;
                nextLastNum = this.state.lastNum;
        } else {
           if (operatorRegex.test(this.state.result)) {
               // input = e.target.value;
               nextResult += e.target.value;
               nextLastNum = e.target.value;
           } else if (numericalRegex.test(this.state.result)) {
               // input = this.state.result + e.target.value;
               nextResult += e.target.value;
               nextLastNum = this.state.result + e.target.value;
           } else {
               // input = this.state.result + e.target.value;
               nextResult += e.target.value;
               nextLastNum = this.state.result + e.target.value;
           }
        }
        if (this.state.result === "0") {
            nextResult = e.target.value;
            nextLastNum = e.target.value;
        }
        this.setState({
            result: nextResult,
            lastNum: nextLastNum
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
        const keyData = [
            {
                name: 'clear',
                value: 'AC',
                action: this.clearAll
            },
            {
                name: 'divide',
                value: '/',
                action: this.handleOperator
            },
            {
                name: 'multiply',
                value: 'x',
                action: this.handleOperator
            },
            {
                name: 'add',
                value: '+',
                action: this.handleOperator
            },
            {
                name: 'subtract',
                value: '-',
                action: this.handleOperator
            },
            {
                name: 'decimal',
                value: '.',
                action: this.handleNumber
            },
            {
                name: 'equals',
                value: '=',
                action: this.handleCompute
            },
            {
                name: 'zero',
                value: '0',
                action: this.handleNumber
            },
            {
                name: 'one',
                value: '1',
                action: this.handleNumber
            },
            {
                name: 'two',
                value: '2',
                action: this.handleNumber
            },
            {
                name: 'three',
                value: '3',
                action: this.handleNumber
            },
            {
                name: 'four',
                value: '4',
                action: this.handleNumber
            },
            {
                name: 'five',
                value: '5',
                action: this.handleNumber
            },
            {
                name: 'six',
                value: '6',
                action: this.handleNumber
            },
            {
                name: 'seven',
                value: '7',
                action: this.handleNumber
            },
            {
                name: 'eight',
                value: '8',
                action: this.handleNumber
            },
            {
                name: 'nine',
                value: '9',
                action: this.handleNumber
            }
        ];
        
        
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
