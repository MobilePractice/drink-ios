/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/components/main');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;


var DrinkAppReact = React.createClass({
  render: function() {
    return (
          <NavigatorIOS
          style = {styles.nav}
          shadowHidden = {true}
          barTintColor = {"#fff"}
          initialRoute = {{
            component: Main,
            navigationBarHidden: true
          }}
        />
    );
  }
});

var styles = StyleSheet.create({
  nav: {
    flex:1,
    height: 100,
  }
})

AppRegistry.registerComponent('DrinkAppReact', () => DrinkAppReact);
