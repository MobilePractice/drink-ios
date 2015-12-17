'use strict';

var React = require('react-native');
var Main = require('./app/components/main');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} = React;


var DrinkAppReact = React.createClass({
  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator} />
      </View>
      )
  },
  render: function() {
    return (
      <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderScene}
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        navigationBarHidden={true}
        initialRoute={{
          title: 'LCBO',
          component: Main,
        }} />
    );
  }
});

var styles = StyleSheet.create({
  nav: {
    flex:1,
    height: 100,
  },
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('DrinkAppReact', () => DrinkAppReact);
