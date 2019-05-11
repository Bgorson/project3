import React from 'react'
class PlayerHpBar extends React.Component {
  
    constructor(props) {
      super(props);
      console.log(props)
      this.state = { 
        totalHealth: props.totalhealth,
        currentHealth: props.totalhealth || props.currenthealth,
        damage: props.damage,
      };
 
     }
   
    render() {
      let currentHealthPercent = (this.state.currentHealth/this.state.totalHealth) *100
      let damagePercent = (this.state.damage / this.state.totalHealth) * 100;
      
      return (
        <div>
            <p>Numbers here:{this.state.totalHealth}</p>
          <div className='HpBar'>
            <div className='balanceSection currentHealth' style={{'width': currentHealthPercent+'%'}}></div>
            <div className='balanceSection damage' style={{'width': damagePercent+'%'}}></div>
      
          </div>
          {/* <a href='#' onClick={this.settotalHealth.bind(this, 107)}>Set to 107</a>
          <br />
          <a href='#' onClick={this.settotalHealth.bind(this, 807)}>Set to 807</a> */}
        </div>
      );
    }
  }
  
export default PlayerHpBar