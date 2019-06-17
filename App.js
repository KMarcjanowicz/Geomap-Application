import {createStackNavigator} from "react-navigation";
import Main from "./components/screens/Main"
import List from "./components/screens/List"
import ListItem from "./components/screens/ListItem"
import Map from "./components/screens/Map"

const App = createStackNavigator({
  main: { screen: Main },
  list: { screen: List },
  listitem: { screen: ListItem },
  map: { screen: Map },
});

export default App;