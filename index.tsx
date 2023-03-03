import * as React from 'react';
import { render } from 'react-dom';
import Main from './Main';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Main />
        <p>Start editing to see some magic happen :)</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
