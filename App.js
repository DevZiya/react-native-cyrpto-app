import Route from "./src/Navigation";
import WatchListProvider from "./src/Contexts/WatchListContext";
import { RecoilRoot } from "recoil";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <RecoilRoot>
      <WatchListProvider>
        <Route />
      </WatchListProvider>
    </RecoilRoot>
  );
}
