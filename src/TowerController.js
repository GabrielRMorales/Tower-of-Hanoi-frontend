import React, {Component} from "react";
import Tower from "./Tower";
import Weight from "./Weight";
import "./TowerController.css";

class TowerController extends Component {
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
            
                let newTowers = this.state.towers.map((tower, index)=>{
                    if (index == e.target.id) {
                       
                        return {
                            discArray: newTower,
                            clickable: false
                        }
                    }
                    //removes disc from previousArray
                    if (tower.discArray.includes(this.state.selectedDisc)){
                        let newDiscArray = [...tower.discArray];
                        newDiscArray.shift();
                        return {
                            discArray: newDiscArray,
                            clickable: false
                        }
                    }
                    //not sure that Object.assign is needed, just doing it because it's easier to throw in the {clickable: false} this way
                    return Object.assign({}, tower, {clickable: false});
                })
                
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
           this.setState({selectedDisc: "none", towers: newTowers, weightClasses: weightState});

        }
       
    }

    render(){
        
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

