import React, {createRef} from 'react'
import './SearchPage.css'
import {Card, Col, Container, Row} from "react-bootstrap";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import DOMPurify from 'dompurify';
import {connect} from "react-redux";
import {setPageResultsAction} from "./actions";

//TODO refactor to redux the search query handoff

const mapStateToProps  = state => ({
    pageResults: state.searchPage.pageResults
})
const mapDispatchToProps = dispatch => ({
    setPageResults: (data) => dispatch( setPageResultsAction(data) )
})

class SearchPage extends React.Component {
    state = {
        jobs: [],
        pageResults: [],
        searchQuery: '',
        isFocusing: false,
    }
    searchBarRef = createRef()

    componentDidMount = async () => {

        let pageResults = this.props.pageResults
        let state = {...this.state, pageResults }
        this.setState(state)

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
        let pageResults = obj.jobs;
        this.props.setPageResults(pageResults)
        let state = {...this.state, pageResults}
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
                        {this.state.pageResults.length > 0 &&
                        this.state.pageResults.slice(0, 10).map(
                            job =>
                                <>
                                    <Col sm={12} md={12} lg={12}>
                                        <Card className={'m-4'}>
                                            <Card.Title>

                                                <Link to={`/jobDetail/${job.id}`}>
                                                    <h3> {job.title} </h3>
                                                </Link>

                                            </Card.Title>
                                            <Card.Body>
                                                <p> company:  </p>
                                                <Link to={`/company-details/`}> {job.company_name} </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(SearchPage) )