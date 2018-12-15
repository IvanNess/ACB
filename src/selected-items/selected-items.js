import React, { Component } from 'react';
import * as R from 'ramda';

export default class SelectedItems extends Component {
    /*
    header string,
    item array,
    */
    state = {
        itemArray: this.props.itemArray
    }

    onChange = (e, item) => {
        console.log(e.target.checked);
        const checked = e.target.checked;
        this.setState((state) => {
            const { itemArray } = state;
            const newItemArr = checked ?
                R.append(item, itemArray) :
                R.without([item], itemArray);
            return {
                itemArray: newItemArr
            }
        })

    }

    render() {
        console.log(this.state);
        const { headerString, itemArray } = this.props;
        return (
            <div>
                {headerString}
                {itemArray.map(item => {
                    return (
                        <div>
                            <input
                                type='checkbox'
                                onChange={(e) => this.onChange(e, item)}
                                defaultChecked
                            />
                            {item}
                        </div>
                    )
                })}
            </div>
        )
    }
}

