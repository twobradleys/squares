import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.rowIndex = props.rowIndex;
    this.colIndex = props.colIndex;
    this.state = {owner: props.owner};
  }

  _onPressButton = () => {
    console.log("You tapped the button!");
    this.setState({owner: 'XX'});
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

  render () {
    let gridData = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ];

    let columnHeaders = [7,5,3,9,0,1,4,6,2,8];
    let rowHeaders    = [4,3,6,2,0,1,9,7,8,5];

    let cellStyle = {width:25,height:25,borderWidth:1,borderColor:'black'};

    return (
      <View style={{flexDirection:'column',borderWidth:1,borderColor:'black'}}>
        <View key="columnHeaders" style={{flexDirection: 'row'}}>
        <View key="blank" style={cellStyle}><Text/></View>
        {columnHeaders.map(function(header, i){
          return <View key={i} style={cellStyle}><Text>{header}</Text></View>;
        })}
        </View>
        {gridData.map(function(row, i){
          return <View key={i} style={{flexDirection: 'row'}}>
            <View key="rowHeader" style={cellStyle}><Text>{rowHeaders[i]}</Text></View>
            {row.map(function(owner, j){
              return <Cell key={j} rowIndex={i} colIndex={j} owner={owner} />;
            })}
          </View>
        })}
      </View>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Grid />
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
