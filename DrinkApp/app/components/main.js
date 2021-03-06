'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TabBarIOS,
  Text,
  View
  
} = React;

var Dashboard = require("./dashboard");
var Search = require("./search");
var TopPicks = require("./toppicks");
var Profile = require("./profile");
var Orders = require("./orders");

var Icon = require("react-native-vector-icons/Ionicons");

var TabBar = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBar',
  getInitialState: function() {
    return {
      selectedTab: 'dashboard',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <Text>jason</Text>
      /*<View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>*/
    );
  },

  render: function() {
    return (
      <TabBarIOS tintColor="black">

        <Icon.TabBarItem
          title="Dashboard"
          iconName="ios-navigate-outline"
          selectedIconName="ios-navigate"
          selected={this.state.selectedTab === "dashboard"}
          onPress={() => {
            this.setState({
              selectedTab: "dashboard",
            });
          }}>
          <Dashboard />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Search"
          iconName="ios-search"
          selectedIconName="ios-search"
          selected={this.state.selectedTab === "search"}
          onPress={() => {
            this.setState({
              selectedTab: "search",
            });
          }}>
          <Search />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Orders"
          iconName="ios-clock-outline"
          selectedIconName="ios-clock"
          selected={this.state.selectedTab === "orders"}
          onPress={() => {
            this.setState({
              selectedTab: "orders",
            });
          }}>
          <Orders />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Top Picks"
          iconName="ios-list-outline"
          selectedIconName="ios-list"
          selected={this.state.selectedTab === "top-picks"}
          onPress={() => {
            this.setState({
              selectedTab: "top-picks",
            });
          }}>
          <TopPicks />
        </Icon.TabBarItem>
    
        <Icon.TabBarItem
          title="Profile"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === "profile"}
          onPress={() => {
            this.setState({
              selectedTab: "profile",
            });
          }}>
          <Profile />
        </Icon.TabBarItem>

        
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TabBar;