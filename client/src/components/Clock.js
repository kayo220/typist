import React from 'react'
class Clock extends React.Component {
    constructor(props) {
      super(props);
    //   this.state = {
    //     time: this.props.getTime()
    //   };
    }
    
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
    //   this.setState({
    //     time: new Date().toLocaleString()
    //   });
    // this.setState((prev) => {
    //     var now = prev.time - 1;
    //     this.props.onClockChange()
    //     if (now <= 0){
    //         clearInterval(this.intervalID);
    //         now = "0"
    //     }
    //     return {time: prev.time - 1};
    //   });
        if (this.props.playable) this.props.setTime(this.props.getTime()-1)
    
    }
    render() {
        let text = ""
        if (this.props.getTime() > 0){
            text = `You have ${this.props.getTime()}.`
        }else{
            text = `Time over`
        }
      return (
        <p className="App-clock">
          {text}
        </p>
      );
    }
  }
  
  export default Clock