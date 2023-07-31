import { Provider } from "react-redux";
import store from "./store";
import Post from "./Post";


function App() {
  return (
    <Provider store={store}>
      <Post />
    </Provider>
  );
}
export default App;
