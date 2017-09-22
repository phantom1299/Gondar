import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

const messages1 = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Halletik, çıkartıyorum apkyı',
    createdAt: new Date(2016, 7, 30, 15, 2, 0),
    user: {
      _id: 1,
      name: 'Developer'
    },
    sent: true,
    received: true
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Backend hallolduysa apkyı göndersene baha',
    createdAt: new Date(2016, 7, 30, 15, 0, 0),
    user: {
      _id: 2,
      name: 'Çağatay'
    }
  }
];

const messages2 = [
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      'It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer'
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'React Native lets you build mobile apps using only JavaScript',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer'
    }
  }
];

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState({
      messages: messages1
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState({
      isLoadingEarlier: true
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(previousState.messages, messages2),
            loadEarlier: false,
            isLoadingEarlier: false
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if (messages[0].image || messages[0].location || !this._isAlright) {
        this.setState(previousState => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else if (!this._isAlright) {
            this._isAlright = true;
            this.onReceive('Alright');
          }
        }
      }

      this.setState(previousState => {
        return {
          typingText: null
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native'
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          }
        })
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return <Text />;
    }
    const options = {
      'Action 1': props => {
        alert('option 1');
      },
      'Action 2': props => {
        alert('option 2');
      },
      Cancel: () => {}
    };
    return <Actions {...props} options={options} />;
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0'
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return <Text />;
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={{
          _id: 1 // sent messages should have same user._id
        }}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#aaa'
  }
});
