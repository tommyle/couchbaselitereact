/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Couchbase from "react-native-couchbase-lite";
import {Router, Scene, ActionConst} from 'react-native-router-flux';
import DataManager from './app/DataManager';
import Session from './app/Session';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {};
  }

  _onLoginButtonPressed() {
    Session.createSyncGatewaySession(this.state.username, this.state.password)
    .then(res => {
      DataManager.login(this.state.username, this.state.password);
    })
    .catch(e => {
      console.log(e);
      if (e.status == 401) {
        Alert.alert(
          'Oops',
          'There doesn\'t seem to be any user for the credentials you provided.',
          [
            {text: 'Try again',},
          ]
        );
      } else if (e.status == 0) {
        Alert.alert(
          'Oops',
          'Could not connect to server.',
          [
            {text: 'Try again',},
          ]
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.dialog}>
          <Text style={styles.header}>
            Log In
          </Text>
          <TextInput style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username} />
          <TextInput style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this._onLoginButtonPressed()}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2d2d2d',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  dialog: {
    width: 280,
    height: 280,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  header: {
    marginTop: 25,
    fontSize: 20,
  },
  subheader: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 44,
    width: 250,
    borderColor: '#96A6B4',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#D63B30',
    width: 250,
    height: 44,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});
