import React from 'react';

import './scss/App.scss'
import Item from "./components/Item";

function App() {
    const [state, setState] = React.useState({
        items: [],
        isLoading: false,
        enableAutoRefresh: false,
        minComments: 0
    });

    React.useEffect( () => {
        getItems();
    }, [])

    const getItems = () => {
        setState({
            ...state,
            isLoading: true
        })
        fetch('https://www.reddit.com/r/reactjs.json?limit=100')
            .then(resp => resp.json())
            .then(data => setState({
                ...state,
                items: data.data.children,
                isLoading: false
            }))
    }

    const refreshPage = () => {
        getItems();
    }

    const { items, isLoading, minComments } = state;

    const itemsSortedByComments = items &&
        items.filter(item => item.data.num_comments >= minComments)
            .sort((a, b) => {
                return (b.data.num_comments - a.data.num_comments)
            })

    const updateMinComments = (event) => {
        setState({
            ...state,
            minComments: Number(event.target.value)
        })
    }

    return <div className="gallery">
        <div className="container">
            <h1 className="gallery__heading">Top commented.</h1>
            <div>
                <button onClick={refreshPage} className="gallery__button" type="button">Reload items</button>
            </div>
            <p>Current filter: {minComments}</p>
            <input type="range" onChange={updateMinComments} value={minComments} min={0} max={500} className="gallery__input"/>
            <div className="gallery__container">
                {isLoading ? <p>...Loading</p> : itemsSortedByComments.length > 0 ? itemsSortedByComments.map(item => <Item key={item.data.id} data={item.data}/>)
                : <p>No result found matching your criteria</p>}
            </div>
        </div>
    </div>
}

export default App;
