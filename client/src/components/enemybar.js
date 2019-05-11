import React from 'react'
class EnemyBar extends React.Component {
  
    constructor(props) {
      super(props);
      console.log(props)
      this.state = { 
        totalHealth: props.health,
        currentHealth: props.health,
        damage: 0,
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
        </div>
      );
    }
  }
  
export default EnemyBar