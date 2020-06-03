import React from 'react';
import { FlatList, RefreshControl, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { actions as home } from '../../index'
import { theme } from '../../index'

const { getNewsHeadlines } = home;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    this.getNewsHeadlines(false)
  }

  getNewsHeadlines = (refreshing = true) => {
    this.setState({ refreshing });

    this.props.getNewsHeadlines()
      .finally(() => this.setState({ refreshing: false }));
  }

  render() {
    const { articles, isFetching, hasError, errorMsg } = this.props;

    if (isFetching) {
      return <ActivityIndicator/>
    }

    return (
      <FlatList
        style={{ backgroundColor: theme.color.light_grey }}
        contentContainerStyle={{ paddingVertical: 5 }}
        data={articles}
        extraData={this.state}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        initialNumToRender={5}
        keyExtractor={(item, index) => index.toString() + '_home'}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getNewsHeadlines}
          />
        }/>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.homeReducer.isFetching,
    hasError: state.homeReducer.hasError,
    errorMsg: state.homeReducer.errorMsg,
    articles: state.homeReducer.articles,
  }
}

export default connect(mapStateToProps, { getNewsHeadlines })(Home);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
