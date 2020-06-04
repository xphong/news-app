import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../index'
import { theme } from '../../index'

export default function Home() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.homeReducer.isFetching);
  const articles = useSelector(state => state.homeReducer.articles);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNewsHeadlines(false);
  }, [])

  const fetchNewsHeadlines = (refreshing = true) => {
    setRefreshing(refreshing);

    dispatch(actions.getNewsHeadlines())
      .finally(() => setRefreshing(false));
  }

  if (isFetching) {
    return <ActivityIndicator/>
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.color.light_grey }}
      contentContainerStyle={{ paddingVertical: 5 }}
      data={articles}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      initialNumToRender={5}
      keyExtractor={(item, index) => index.toString() + '_home'}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchNewsHeadlines}
        />
      }/>
  );
}

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
