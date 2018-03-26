import React, {Component} from 'react';

class Typewriter extends Component {
    constructor(props){
      super(props);
      this.state = {display: ''};
    };
    componentDidMount(){
        let self = this;
        let array = self.props.words;
        let i = 0;
        function summonChunk(pos){

        let string = array[pos];

            let typing = setInterval(function(){
            let display = self.state.display + string.charAt(i);
            self.setState({display});
            i++
            if(i === string.length){
                clearInterval(typing);

                setTimeout(function(){
                    let deleting = setInterval(function(){
                        let display = self.state.display.slice(0,i);
                        self.setState({display});
                        i--
    
                        if(i === -1){
                            clearInterval(deleting);
                            if(pos===array.length-1){
                                pos = -1
                            }
                            i=0;
                            setTimeout(function(){summonChunk(pos+1)},1250)
                        }
                    },40)
                },1500)
            }
        },70)
        }


        setTimeout(function(){
            summonChunk(0)
        },1500);
    }
    render(){
        return(
            <h3 className="typewriter">{this.state.display}</h3>
        );
    }
};

export default Typewriter;