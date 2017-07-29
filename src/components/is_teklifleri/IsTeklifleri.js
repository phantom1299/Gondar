import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Keyboard } from 'react-native';
import ListItem from './IsTeklifleriItem';

class IsTeklifleri extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.DataSource = ds.cloneWithRows(this.props.missions);
    this.onMenu = this.props.onLeft;
    this.props.onLeft = () => {
      Keyboard.dismisss();
      this.onMenu();
    };
  }

  renderRow(mission) {
    return <ListItem mission={mission} />;
  }

  render() {
    console.log(this.props);
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
