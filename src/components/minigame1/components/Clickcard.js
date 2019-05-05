import React from "react"


function Clickcard(props) {
    return(
          props.shuffle(props.cards).map(characters =>(
            <div>
          <div key = {characters.id}>
          
          <img onClick= {props.handleClick} className= "cardImage" alt={characters.name} src={characters.image}/>
        </div>
        </div>
        ))
    )
}
export default Clickcard;