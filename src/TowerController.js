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
            ]
            
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
                        console.log("removing disc frmo prevArray");
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
            //needs to set classes to change appearance
            this.setState({selectedDisc: "none", towers: newTowers}, ()=>{console.log(this.state)});

        }
        //if first disc in discArray is bigger, add selectedDisc to array as first one and remove selected Disc from previous array
        //change class, make all towers not clickable
    }

    render(){
        //include the onclick functions as props
        //you could also possibly pass in the size to the onclick then use this within discClick
        return (<div id="towers">
            <h1>Towers of Hanoi</h1>
            <Weight size="a" onClick={this.discClick} />
            <Weight size="b" onClick={this.discClick} />
            <Weight size="c" onClick={this.discClick} />
            <Tower order="0" onClick={this.towerClick} />
            <Tower order="1" onClick={this.towerClick} />
            <Tower order="2" onClick={this.towerClick} />
        </div>)
    }

}

export default TowerController;

