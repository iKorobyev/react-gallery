import React from 'react';

import './scss/App.scss'
import Item from "./components/Item";

function App() {
    const [state, setState] = React.useState({
        items: [],
        isLoading: false,
        enableAutoRefresh: false
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

    const updateAutoRefresh = () => {
        if (state.enableAutoRefresh) {
            setState({...state, enableAutoRefresh: false});
        } else {
            setState({...state, enableAutoRefresh: true});

        }
    }

    const { items, isLoading, enableAutoRefresh } = state;

    const itemsSortedByComments = items && items.sort((a, b) => {
        return (b.data.num_comments - a.data.num_comments)
    })

    return <div className="gallery">
        <div className="container">
            <h1 className="gallery__heading">Top commented.</h1>
            <button onClick={updateAutoRefresh} className="gallery__button" type="button">
                {enableAutoRefresh ? 'Stop' : 'Start'} auto-refresh
            </button>
            <div className="gallery__container">
                {isLoading ? <p>...Loading</p> : itemsSortedByComments.map(item => <Item key={item.data.id} data={item.data}/>)}
            </div>
        </div>
    </div>
}

export default App;
