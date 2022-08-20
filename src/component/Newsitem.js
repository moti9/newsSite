import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl } = this.props;

        return (
            <div>
                <div className="card" style={{ width: "auto" }}>
                    <img src={imgUrl ? imgUrl : "https://nextjsdev.com/content/images/2021/11/news.png"} className="card-img-top" alt="https://nextjsdev.com/content/images/2021/11/news.png" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a rel='noreferrer' href={newsUrl} target="__blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem