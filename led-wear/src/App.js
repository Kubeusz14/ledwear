import React, { Component } from 'react';
import Header from './components/header';
import Main from './components/main';

class App extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <header>
                <Header />
                </header>
                <main>
                    <Main />
                </main>
            </React.Fragment>
         );
    }
}
 
export default App;