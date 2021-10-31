import React, {Component} from "react";
import TowerContainer from "./TowerContainer";

//import weights/rod as needed

class TowerController extends Component {
    /*only one weight or one rod is clickable at any time-this is what changes with one click
    a rod is only clickable after a weight is clicked-when clicked the state should change such
    that the weight is now considered positioned on that rod(add animations later).
    each rod's onClick will be based on if there is no weight on it or the clicked weight is smaller than the current top most weight
    Build more on this algorithm
    */
    constructor(props){
        super(props);
        this.state={

        }
    }

    

    render(){
        //include the onclick functions as props
        return (<TowerContainer />)
    }

}

export default TowerController;