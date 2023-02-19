import React, {Component} from "react";
import Tower from "./Tower";
import Weight from "./Weight";
import "./TowerController.css";

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
        return (<div id="towers">
            <h1>Towers of Hanoi</h1>
            <Weight size="sm" />
            <Weight size="md" />
            <Weight size="lg" />
            <Tower />
            <Tower />
            <Tower />
        </div>)
    }

}

export default TowerController;

