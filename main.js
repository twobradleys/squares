import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  AlertIOS
} from 'react-native';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.rowIndex = props.rowIndex;
    this.colIndex = props.colIndex;
    this.onPickCell = props.onPickCell;
    this.state = {owner: null};
  }

  _onPressButton = () => {
    // TODO assign to current picker, or unassign / replace
    let owner = this.onPickCell(this.rowIndex, this.colIndex);
    this.setState({owner: owner});
  };

  render () {
    let cellStyle = {width:25,height:25,borderWidth:1,borderColor:'black'};
    return <TouchableHighlight onPress={this._onPressButton}>
             <View style={cellStyle}>
               <Text>{this.state.owner}</Text>
             </View>
      </TouchableHighlight>;

  }
}
class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.onPickCell = props.onPickCell;
  }

  render () {
    // TODO shuffle after all squares picked
    let columnHeaders = [7,5,3,9,0,1,4,6,2,8];
    let rowHeaders    = [4,3,6,2,0,1,9,7,8,5];

    let dims = [...Array(10)];

    let cellStyle = {width:25,height:25,borderWidth:1,borderColor:'black'};

    let onPickCell = this.onPickCell;

    return (
      <View style={{flexDirection:'column',borderWidth:1,borderColor:'black'}}>
        <View key="columnHeaders" style={{flexDirection: 'row'}}>
        <View key="blank" style={cellStyle}><Text/></View>
        {columnHeaders.map(function(header, i){
          return <View key={i} style={cellStyle}><Text>{header}</Text></View>;
        })}
        </View>
        {dims.map(function(_, i){
          return <View key={i} style={{flexDirection: 'row'}}>
            <View key="rowHeaders" style={cellStyle}><Text>{rowHeaders[i]}</Text></View>
            {dims.map(function(_, j){
              return <Cell key={j} rowIndex={i} colIndex={j} onPickCell={onPickCell} />;
            })}
          </View>
        })}
      </View>
    );
  }
}

class PlayerList extends React.Component {
  render () {
    return (
      <View style={{flexDirection:'row'}}>
        {this.props.players.map(function(player,i){
          return <View style={{padding: 5}} key={i}><Text>{player.name} ${player.picks.length * 0.25}</Text></View>;
        })}
      </View>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {players: [], currentPicker: null};
  }

  addPlayer = (name) => {
    let s = this.state;
    s.players.push({name: name, picks: []});
    s.currentPicker = name;
    this.setState(s);
  }

  promptToAddPlayer = () => {
    AlertIOS.prompt(
      'Add Player',
      'Enter the new player\'s initials',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: this.addPlayer}
      ],
      'plain-text'
    );
  }

  onPickCell = (row, col) => {
    let s = this.state;
    let player = s.players.find((p) => p.name == this.state.currentPicker);
    player.picks.push([row, col]);
    this.setState(s);

    return this.state.currentPicker; // to render; TODO this should be state-based
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid onPickCell={this.onPickCell} />
        <PlayerList players={this.state.players} />
        <Text>{this.state.currentPicker} is picking</Text>
        <Button title="Add Player" onPress={this.promptToAddPlayer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

Exponent.registerRootComponent(App);
