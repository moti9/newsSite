import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        // let news = "https://newsapi.org/v2/everything?q=apple&from=2022-08-19&to=2022-08-19&sortBy=popularity&apiKey=28520d0754f04729b27342c63aeb4a14";
        let news = `https://newsapi.org/v2/top-headlines?country=in&apiKey=28520d0754f04729b27342c63aeb4a14&page=1&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true });
        let data = await fetch(news);
        let parseData = await data.json();

        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
    }

    handleNextClick = async () => {
        let news = `https://newsapi.org/v2/top-headlines?country=in&apiKey=28520d0754f04729b27342c63aeb4a14&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(news);
        let parseData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })
    }
    handlePreviousClick = async () => {
        let news = `https://newsapi.org/v2/top-headlines?country=in&apiKey=28520d0754f04729b27342c63aeb4a14&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(news);
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    render() {
        return (

            <div className="container my-3">
                <h1 className="text-center">
                    Welcome to Head News from NewsTime!!
                </h1>
                {this.state.loading && <Spinner />}
                {/* <Spinner /> */}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {

                        return (
                            <div className="col-md-4 my-3" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        )
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick} >&larr;Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News