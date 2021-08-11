import React, {createRef} from 'react'
import './SearchPage.css'
import {Card, Col, Container, Row} from "react-bootstrap";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import DOMPurify from 'dompurify';
//TODO refactor to redux the search query handoff
class SearchPage extends React.Component {
    state = {
        jobs: [],
        searchBarData: [],
        searchQuery: '',
        isFocusing: false,
        handOffCallback: null
    }
    searchBarRef = createRef()

    componentDidMount = async () => {

        //let res = await fetch(`https://remotive.io/api/remote-jobs?limit=10`)
        //let obj = await res.json()
        //let [searchBarData, jobs] = obj.jobs;
        //let state = {...this.state, jobs, searchBarData}
        if ( !!this.props.searchBarData ){
            let searchBarData = this.props.searchBarData
            let state = {...this.state, searchBarData }
            this.setState(state)
        }
    }
    onSearchFocus = e => {
        let state = {...this.state}
        state.isFocusing = true
        this.setState(state)
    }
    onSearchBlur = e => {
        let state = {...this.state}
        state.isFocusing = false
        this.setState(state)
    }
    onQueryChange = async e => {
        let searchQuery = this.searchBarRef.current.value
        let state = {...this.state, searchQuery}
        this.setState(state)
    }
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.state.searchQuery !== prevState.searchQuery) {
            await this.fetchJobsBySearch()
        }
    }
    fetchJobsBySearch = async () => {
        let queryStr = encodeURIComponent(this.state.searchQuery)
        let res = await fetch(`https://remotive.io/api/remote-jobs?limit=10&search=${queryStr}`)
        let obj = await res.json()
        let searchBarData = obj.jobs;
        this.props.handOffCallback && this.props.handOffCallback( searchBarData )
        let state = {...this.state, searchBarData}
        this.setState(state)
    }
    render = () =>
                <Col >
                    <Row>
                    <div id={'search-page'}  style={{minHeight: '175px'}}>

                        <Col sm={12} md={{span:6, offset:3}} lg={{span: 4, offset: 4}} className={'d-flex flex-row justify-content-center '}>
                            <div className="search-bar mt-4">
                                <input type="search" name="search" pattern=".*\S.*" required
                                       onFocus={this.onSearchFocus}
                                       onBlur={this.onSearchBlur}
                                       placeholder={this.state.isFocusing ? 'Search remote jobs' : ''}

                                       ref={this.searchBarRef}
                                />
                                <button
                                    onClick={e => this.onQueryChange(e)}
                                    className="search-btn">
                                    <span>Search</span>
                                </button>
                            </div>
                        </Col>
                        {this.state.searchBarData.length > 0 &&
                        this.state.searchBarData.slice(0, 10).map(
                            job =>
                                <>
                                    <Col sm={12} md={12} lg={12}>
                                        <Card className={'m-4'}>
                                            <Card.Title>

                                                <Link to={`/company-details/${job.id}`}>
                                                    <h3> {job.title} </h3>
                                                </Link>

                                            </Card.Title>
                                            <Card.Body>
                                                <p> company: {job.company_name} </p>
                                                <p> category: {job.category} </p>
                                                {/*}
                                                <div dangerouslySetInnerHTML={
                                                    {__html: DOMPurify.sanitize(job.description)}
                                                }>
                                                </div>*/}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                        )}
                    </div>
                    </Row>
                </Col>

}

export default withRouter(SearchPage)