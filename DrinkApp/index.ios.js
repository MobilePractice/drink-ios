'use strict';

var React = require('react-native');
var Main = require('./app/components/main');

var {
  AppRegistry,
  StyleSheet,
} = React;


var DrinkAppReact = React.createClass({
  render: function() {
    return (
        <Main />
    );
  }
});

var styles = StyleSheet.create({
  nav: {
    flex:1,
    height: 100
  }
})

AppRegistry.registerComponent('DrinkAppReact', () => DrinkAppReact);