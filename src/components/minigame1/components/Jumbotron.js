import React from "react"


function JumbotronComponent(props) {
    return(
        <div fluid>
        <h1>Hello {props.user}</h1>
        <p>Click an image below to earn points. Don't click duplicates! </p>
</div>
    )
}
export default JumbotronComponent;