import * as R from 'ramda';

export default class Api{
    sortByName = R.comparator(R.lt)

    getSortedPropertyArr = (property) =>{
        return R.compose(
            R.sort(this.sortByName),
            R.uniq,
            R.pluck(property)
        )
    }

    getYears = (matches) =>{
        return this.getSortedPropertyArr('season')(matches)
    }

    getTeams = (matches) =>{
        return this.getSortedPropertyArr('against')(matches)
    }

    filterMatchesBySelectedPlayers = ({selectedPlayers, possible, matches}) =>{

        return selectedPlayers.reduce((accumulator, item) => {

            const isNameInTheMatch = match => {
                console.log('isNITM', item, match);
                const { squad } = match;
    
                console.log('R.propEq(name, item)',
                    R.any(
                        R.propEq('name', item)
                    )(squad)
                );
                return R.any(
                    R.propEq('name', item)
                )(squad)
            }
    
            const isPossibleInTheMatch = match => {
                const { isntClear, possible } = match;
                console.log('isPNITM', item, match, isntClear, possible);
    
                if (isNameInTheMatch(match)) {
                    return true;
                } else if (possible && R.includes(item, possible)) {
                    match.isntClear = true;
                    return true;
                }
                return false;
            }
    
            const sumIsNameInTheMatch = possible ? isPossibleInTheMatch : isNameInTheMatch;
    
            return R.filter(
                sumIsNameInTheMatch
            )(accumulator)
    
        }, matches);
    }
}