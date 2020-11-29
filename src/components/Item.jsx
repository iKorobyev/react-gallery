import React from 'react';

function Item({ data }) {
    return <div key={data.id} className="gallery__item">
        {data.thumbnail ? <img src={data.thumbnail} alt=""/> : null}
        <h3 className="gallery__title">{data.title}</h3>
        <p className="gallery__text">Number of comments: {data.num_comments}</p>
        <a href={`https://www.reddit.com/${data.permalink}`} target='_blank' rel="noopener noreferrer" className="gallery__link">Link</a>
    </div>
}

export default Item;