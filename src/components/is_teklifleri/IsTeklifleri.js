import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './IsTeklifleriItem';

class IsTeklifleri extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.DataSource = ds.cloneWithRows(this.props.missions);
  }

  renderRow(mission) {
    return <ListItem mission={mission} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.DataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { missions: state.missions };
};

export default connect(mapStateToProps)(IsTeklifleri);
