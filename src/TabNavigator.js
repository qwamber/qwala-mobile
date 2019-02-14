import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import QwalaView from './QwalaView.js';
import StatisticList from './StatisticList.js';

let TabNavigator = createBottomTabNavigator({
    Main: QwalaView,
    Statistics: StatisticList,
}, {
    tabBarOptions: {
        activeTintColor: '#644AB2',
    }
});

export default createAppContainer(TabNavigator);
