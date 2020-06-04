import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../index';
import { theme } from '../../index';
import NewsItem from '../../components/NewsItem';

export default function Home() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.homeReducer.isFetching);
  const articles = useSelector(state => state.homeReducer.articles);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNewsHeadlines();
  }, []);

  useEffect(() => {
    if (isFetching) {
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  }, [isFetching]);

  const fetchNewsHeadlines = () => {
    dispatch(actions.getNewsHeadlines());
  };

  if (isFetching) {
    return <ActivityIndicator/>;
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.color.light_grey }}
      contentContainerStyle={{ paddingVertical: 5 }}
      data={articles}
      renderItem={({ item }) => <NewsItem article={item} />}
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
