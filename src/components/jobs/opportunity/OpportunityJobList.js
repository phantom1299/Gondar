import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Content, List, Spinner } from 'native-base';

import OpportunityJobItem from './OpportunityJobItem';
import { data } from '../../../data';

class OpportunitiesList extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      jobs: []
    };
  }

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.DataSource = ds.cloneWithRows(this.state.jobs);

    fetch(`${data.url}/jobs/tags`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tags: this.props.tags
      })
    }).then(response => {
      response.json().then(responseJson => {
        this.setState({ jobs: responseJson, loading: false });
        this.DataSource = ds.cloneWithRows(this.state.jobs);
      });
    });
  }

  renderRow(job) {
    return <OpportunityJobItem job={job} />;
  }

  renderLoading() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    return (
      <Content>
        <List
          style={{ backgroundColor: '#eaeaf5' }}
          dataArray={this.state.jobs.reverse()}
          renderRow={this.renderRow}
        />
        {this.renderLoading()}
      </Content>
    );
  }
}

export default OpportunitiesList;
