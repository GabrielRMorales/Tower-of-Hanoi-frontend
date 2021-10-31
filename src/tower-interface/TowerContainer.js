import React from "react";
import Rod from "../tower-components/Rod";
import Weight from "../tower-components/Weight";

const TowerContainer = (props)=>{
    //possibly move some of this into TowerController and simply use props passed in from that
    let sizes=["sm","md","lg"],
        positions = ["left","center","right"];
    let weights = sizes.map((s)=>{
        return <Weight size={s} />;
    });
    let rods = positions.map(p=><Rod position={p} />);
    return (<main>
        {weights}
        {rods}
    </main>)
};