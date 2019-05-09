import React from "react"
import Card from '@material-ui/core/Card'


function Clickcard(props) {
    return(
     
          props.shuffle(props.cards).map(characters =>(
            <Card>
              
          <div key = {characters.id}>
          
         <img onClick= {props.handleClick} className= "cardImage" alt={characters.name} src={characters.image}/>
    
        </div>
        </Card>
        ))
    )
}
export default Clickcard;