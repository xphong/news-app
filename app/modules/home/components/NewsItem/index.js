import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import moment from 'moment';
import styles from './styles';

const NewsItem = ({ article }) => {
  const { title, source, publishedAt } = article;

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={'transparent'}>
      <View style={styles.wrapper}>
        {
          article.urlToImage && <Image source={{ uri: article.urlToImage }} style={styles.img}/>
        }
        <View style={styles.info}>
          <Text style={styles.title}>
            {title}
          </Text>

          <View style={styles.bottom}>
            <Text style={styles.source}>
              {source.name}
            </Text>
            <Text style={styles.date}>
              {moment(publishedAt).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default NewsItem;
