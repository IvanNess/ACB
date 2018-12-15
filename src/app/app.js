import React, { Component } from 'react';
import * as R from 'ramda';

import ItemField from '../item-field';
import SelectedItems from '../selected-items';
import Api from '../api';


export default class App extends Component {
    matches = [
        {
            season: 2017, tournament: 'DIY Football League', tour: 14, against: 'Птичканись',
            goalsForward: 7, goalsAgainst: 5,
            squad: [
                { name: 'Братаган', gk: true },
                { name: 'Карова', g: 2, p: 3 },
                { name: 'Чай', g: 2, p: 2 },
                { name: 'Длинный', g: 0, p: 0 },
                { name: 'Сарай', g: 0, p: 0 },
                { name: 'Карп', g: 1, p: 1 },
            ],
            date: '20 мая'
        },

        {
            season: 2014, tournament: 'DIY Football League', tour: 14, against: 'Бабий Бунт',
            goalsForward: 9, goalsAgainst: 2,
            squad: [
                { name: 'Братаган', g: 2, p: 2 },
                { name: 'Карова', g: 2, p: 1 },
                { name: 'Чай', g: 1, p: 2 },
                { name: 'Длинный', g: 1, p: 0 },
                { name: 'Сарай', g: 0, p: 0 },
                { name: 'Заяц', g: 3, p: 2 },
            ],
            possible: ['Джонни', 'Никитос'],
            date: '15 июня'
        },
        {
            season: 2011, tournament: 'DIY Football League', tour: 1, against: 'Товарищи',
            goalsForward: 3, goalsAgainst: 8,
            squad: [
                { name: 'Гранж', gk: true },
                { name: 'Чай', g: 0, p: 1 },
                { name: 'Заяц', g: 1, p: 0 },
                { name: 'Буня', g: 1, p: 1 },
                { name: 'Салома', g: 0, p: 0 },
                { name: 'Игорек', g: 1, p: 1 },
                { name: 'Джонни', g: 0, p: 0 },
            ],
            possible: ['Баниш'],
            date: '12 мая'
        },
    ]

    players = [
        { name: 'Chai', games: 89, exactGames: 64, goals: 78, assists: 24 },
        { name: 'Johnny', games: 49, exactGames: 14, goals: 6, assists: 0 },
        { name: 'Zayac', games: 45, exactGames: 25, goals: 45, assists: 6 },
        { name: 'Karowa', games: 78, exactGames: 73, goals: 115, assists: 38 },
    ]

    state = {
        players: null,
        possible: true
    }

    api = new Api();

    componentDidMount() {

        const years = this.api.getYears(this.matches)

        console.log(years);

        const teams = this.api.getTeams(this.matches)

        console.log(teams);

        const sortByName = R.comparator(R.lt)

        const allPlayers = R.compose(
            R.sort(sortByName),
            R.uniq,
            R.pluck('name'),
            R.reduce(R.concat, []),
            R.pluck('squad')
        )(this.matches);

        console.log(allPlayers);
        this.setState({ players: allPlayers });

        const selectedPlayers = ['Карова', 'Чай'];

        const result = this.api.filterMatchesBySelectedPlayers({
            selectedPlayers,
            matches: this.matches,
            possible: this.state.possible
        })

        console.log(result);

    }

    render() {
        if (!this.state.players)
            return null;

        return (
            <div>
                {this.players.map((item) => {
                    return (
                        <ItemField {...item} />
                    )
                })}

                <SelectedItems headerString = 'Players' itemArray = {this.state.players}/>

            </div>
        )

    }
}