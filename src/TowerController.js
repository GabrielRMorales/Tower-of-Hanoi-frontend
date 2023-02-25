import React, {Component} from "react";
import Tower from "./Tower";
import Weight from "./Weight";
import "./TowerController.css";
//import { stringify } from "nodemon/lib/utils";

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
            selectedDisc: "none",
            towers: [
                {discArray: ["a","b","c"],
                clickable: false},

                {discArray: [],
                clickable: false},

                {discArray: [],
                clickable: false}
            ],
            weightClasses: {
                a: "top one",
                b: "middle one",
                c: "bottom one"
            }
            
        }
        this.discClick=this.discClick.bind(this);
        this.towerClick=this.towerClick.bind(this);
    }

    discClick(e){

        //if selectedDisc is empty, and any discarray has this size at index 0, make all towers clickable (if tower doesn't already have 3 discs), set selectedDisc as this size
        let currentTowerIndex;
        let isOnTop = this.state.towers.some((val, index)=>{
            if (val.discArray[0]==e.target.id){
                currentTowerIndex = index;
                return true;
            }
        });
        
        if (this.state.selectedDisc=="none" && !!isOnTop){
            //e.target is accessible
            console.log(e.target.id);
            let newTowers = this.state.towers.map((tower,index)=>{
                return { 
                    discArray: [...tower.discArray],
                    clickable: !(index==currentTowerIndex)
                }
            });

           this.setState({selectedDisc: e.target.id, 
                towers: newTowers
            });
            
        }
        
    }
    towerClick(e){
        //if towers are clickable
        /*
        this.state.towers.filter((tower)=>{
            return tower.clickable;
        }).some((tower)=>{
            return tower.id == e.target.id;
        });*/
        console.log(e.target);
        let tower = this.state.towers[e.target.id];
        let isClickable = tower.clickable;
        
        let sizeFits;
        if (tower.discArray.length!=0){
            sizeFits = this.state.selectedDisc.charCodeAt(0) < tower.discArray[0].charCodeAt(0);
        } else {
            sizeFits = true;
        }
         
        if (!!isClickable && !!sizeFits){
            let newTower = [...tower.discArray];
            newTower.unshift(this.state.selectedDisc);
            console.log(newTower);
                let newTowers = this.state.towers.map((tower, index)=>{
                    if (index == e.target.id) {
                        console.log("setting new Tower");
                        return {
                            discArray: newTower,
                            clickable: false
                        }
                    }
                    //removes disc from previousArray
                    if (tower.discArray.includes(this.state.selectedDisc)){
                        console.log("removing disc from prevArray");
                        let newDiscArray = [...tower.discArray];
                        newDiscArray.shift();
                        return {
                            discArray: newDiscArray,
                            clickable: false
                        }
                    }
                    console.log("default");
                    //not sure that Object.assign is needed, just doing it because it's easier to throw in the {clickable: false} this way
                    return Object.assign({}, tower, {clickable: false});
                })
            console.log(newTowers);
            //needs to set classes to change appearance--can change one class at a time, modularly
            //potentially use function here to alter state of an object in state that contains the classes for each weight-use newTowers data to determine
            //position of each weight
            
            //use newTowers
            const weightState = {a: "", b: "", c: ""};
            const orders = ["one","two","three"];
            newTowers.forEach((element,i) => {
                let el = element.discArray;
                if (el.length == 1){
                    weightState[el[0]] = `bottom ${orders[i]}`;
                } else if (el.length == 2) {
                    weightState[el[0]] = `middle ${orders[i]}`;
                    weightState[el[1]] = `bottom ${orders[i]}`;

                } else if (el.length == 3) {
                    weightState[el[0]] = `top ${orders[i]}`;
                    weightState[el[1]] = `middle ${orders[i]}`;
                    weightState[el[2]] = `bottom ${orders[i]}`;
                }
                
            });
           console.log(weightState);
           this.setState({selectedDisc: "none", towers: newTowers, weightClasses: weightState}, ()=>{console.log(this.state)});

        }
        //if first disc in discArray is bigger, add selectedDisc to array as first one and remove selected Disc from previous array
        //change class, make all towers not clickable
    }

    render(){
        //include the onclick functions as props
        //you could also possibly pass in the size to the onclick then use this within discClick
        return (<div id="towers">
            <h1>Towers of Hanoi</h1>
            <Weight size="a" className={`${this.state.selectedDisc == "a" ? "selected-weight" : "" } weight ${this.state.weightClasses["a"]}`} onClick={this.discClick} />
            <Weight size="b" className={`${this.state.selectedDisc == "b" ? "selected-weight" : "" } weight ${this.state.weightClasses["b"]}`} onClick={this.discClick} />
            <Weight size="c" className={`${this.state.selectedDisc == "c" ? "selected-weight" : "" } weight ${this.state.weightClasses["c"]}`} onClick={this.discClick} />
            <Tower order="0" className={this.state.towers[0].clickable ? "selectable-tower" : ""} onClick={this.towerClick} />
            <Tower order="1" className={this.state.towers[1].clickable ? "selectable-tower" : ""} onClick={this.towerClick} />
            <Tower order="2" className={this.state.towers[2].clickable ? "selectable-tower" : ""} onClick={this.towerClick} />
        </div>)
    }

}

export default TowerController;

