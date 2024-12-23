import { useEffect } from "react";

function Food(props){
    const food1="Apple";
    const food2="Orange";
    const foodlist=['apple','orange','banana','mango']
    useEffect(() => {
        props.handler(foodlist);
    }, [props]); 
    const renderfoodlist=foodlist.map(food=>{
        return (<div key={food}>This is {food}</div>);
    })
    return (
        <div>{renderfoodlist}</div>
    );
}

export default Food