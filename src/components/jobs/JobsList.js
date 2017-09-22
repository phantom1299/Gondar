import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './JobsItem';
import { Content, Container } from 'native-base';

class JobsList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.DataSource = ds.cloneWithRows(this.props.jobs);
  }

  renderRow(job) {
    return <ListItem job={job} />;
  }

  render() {
    return (
      <Container>
        <Content>
          <ListView
            contentContainerStyle={{ paddingBottom: 20 }}
            dataSource={this.DataSource}
            renderRow={this.renderRow}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { jobs: state.jobs };
};

export default connect(mapStateToProps)(JobsList);
