import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Home from '../modules/home/scenes/Home';
import Article from '../modules/home/scenes/Article';
import Source from '../modules/home/scenes/Source';
import { color, navTitleStyle } from '../styles/theme';

export default class extends React.Component {
  render() {
    return (
      <Router>
        <Stack key='root'
          navigationBarStyle={{ backgroundColor: '#fff' }}
          titleStyle={navTitleStyle}
          backButtonTintColor={color.black}>
          <Scene key='Home' component={Home} title='Headlines' initial/>
          <Scene key='Article' component={Article} title=''/>
          <Scene key='Source' component={Source} title=''/>
        </Stack>
      </Router>
    );
  }
}
