import React, {createRef} from 'react'
import SearchBar from 'react-search-box';
import {Col, Container, Row} from "react-bootstrap";
import {withRouter} from "react-router";


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    refSearchBar = createRef()

    state = {
        jobs: [],
        searchBarData: [] ,
        searchQuery : ''
    }

    componentDidMount = async () => {
        let res = await fetch(`https://remotive.io/api/remote-jobs?limit=150`)
        let obj = await res.json()
        let jobs = obj.jobs;
        let state = { ...this.state, jobs }
        this.setState(state)


    }

    onQueryChange =  async value => {
        let searchQuery = value
        let state = { ...this.state, searchQuery }
        this.setState(state)
        this.setSearchBarData()
    }


    setSearchBarData = () => {
        let jobs = this.state.jobs.filter(
            job => {
                console.log(job)
                let str = this.state.searchQuery.toLowerCase()
                let strIsPresent =
                job.title.toLowerCase().includes(str)

                return strIsPresent
            }
        )

        let searchBarData = jobs.map(
            ({id, title , description, company_name }) => {
                console.log ( {id, title , description, company_name } )
                return {
                    key: title+'_'+id,
                    value: title + ` at ${company_name}`+`\n` + description
                }
            }
        )
        let state = {...this.state, searchBarData }
    }

    redirectToJobDetail = e => {

    }

    render = () =>
        <Container>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <SearchBar
                        data={this.state.searchBarData}
                        onChange={this.onQueryChange}
                        onSelect={this.redirectToJobDetail}
                        placeholder='Search remote jobs'
                        disabled={ this.state.jobs.length < 1 }
                        fuseConfigs={{
                            threshold: 0.05,
                        }}
                    />
                </Col>
            </Row>
        </Container>


}

export default withRouter(SearchPage)