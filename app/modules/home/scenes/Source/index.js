import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import NewsItem from '../../components/NewsItem';
import { theme, actions } from '../../index';

export default function Source({ source }) {
  const [articles, setArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchHeadlinesBySource(false, true);
  }, []);

  const fetchHeadlinesBySource = (refreshing = true, isFetching = false) => {
    setRefreshing(refreshing);
    setIsFetching(isFetching);

    actions.getHeadlinesBySource(source.id)
      .then(({articles}) => setArticles(articles))
      .catch((error) => alert(error.message))
      .finally(() => {
        setRefreshing(false);
        setIsFetching(false);
      });
  };

  if (isFetching) return <ActivityIndicator/>;

  return (
    <FlatList
      style={{ backgroundColor: theme.color.light_grey }}
      contentContainerStyle={{ paddingVertical:5 }}
      data={articles}
      renderItem={({ item }) => <NewsItem article={item} />}
      initialNumToRender={5}
      keyExtractor={(item, index) => `${index.toString()}_source`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchHeadlinesBySource}
        />
      }/>
  );
}
