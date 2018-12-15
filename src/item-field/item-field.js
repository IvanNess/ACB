import React, {Component} from 'react';

export default class ItemField extends Component{
    render(){
        const {
            name,
            games,
            exactGames,
            goals,
            assists,
        } = this.props;
        const points = goals+assists;

        return(
            <div className='item-field'>
                {name} {games} {exactGames} {goals} {assists} {points}
            </div>
        )
    }
}