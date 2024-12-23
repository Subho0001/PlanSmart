import { useState } from "react";

function Button(){
    
    const[name,setName]=useState("Guest");
    let[count,setCount]=useState(0);
    function handleclick(name){
        count++;
        console.log(`${name} Clicked ${count} times`);
        setName(name)
        setCount(count)
    }

    function changename(event){
        setName(event.target.value)
    }

    return (
        <>
        <p>{name} Clicked {count} times</p>
        <input type="text" value={name} onChange={changename}/>
        <button onClick={()=>handleclick("Subho")}>Click Me</button>
        </>
    );
}
export default Button