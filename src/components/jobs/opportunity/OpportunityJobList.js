import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Content, List, Spinner } from 'native-base';

import OpportunityJobItem from './OpportunityJobItem';
import { getJobsByTags } from '../../../data';

class OpportunitiesList extends Component {
  constructor() {
    super();
    this.getJobs = this.getJobs.bind(this);
    this.state = {
      loading: true,
      jobs: []
    };
  }

  componentWillMount() {
    this.getJobs();
  }

  getJobs() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.DataSource = ds.cloneWithRows(this.state.jobs);

    getJobsByTags(this.props.user._id, this.props.user.tags)
      .then(response => {
        response.json().then(responseJson => {
          this.setState({ jobs: responseJson, loading: false });
          this.DataSource = ds.cloneWithRows(this.state.jobs);
        });
      })
      .catch(console.log);
  }

  renderRow(job) {
    console.log(this.getJobs);
    return <OpportunityJobItem navigation={this.props.navigation} job={job} />;
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
          renderRow={job => (
            <OpportunityJobItem
              updateJobs={this.getJobs}
              navigation={this.props.navigation}
              job={job}
              userId={this.props.user._id}
            />
          )}
        />
        {this.renderLoading()}
      </Content>
    );
  }
}

export default OpportunitiesList;
