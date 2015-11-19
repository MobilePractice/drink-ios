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
  getInitialState: function() {
    return {
      isNavBarHidden: true
    }
  },
  toggleNav: function(show) {
    this.setState({isNavBarHidden: show});
  },
  _handleBackButtonPress: function() {
    alert("asdfa")
  },
  render: function() {
    return (
          <NavigatorIOS
          style={styles.nav}
          barTintColor={"#ffffff"}
          tintColor={"#000000"}
          shadowHidden={true}
          translucent={true}
          initialRoute={{
            component: Main,
            passProps: { toggleNav: this.toggleNav},
            onLeftButtonPress: () => this._handleBackButtonPress(),
            navigationBarHidden: true,
            backButtonTitle: " "
          }}
        />
    );
  }
});

var styles = StyleSheet.create({
  nav: {
    flex:1,
    backgroundColor: "red"
  }
})

AppRegistry.registerComponent('DrinkAppReact', () => DrinkAppReact);