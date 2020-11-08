import React from 'react';
import { connect } from 'react-redux';
import { getUserId } from './redux/selectors';
import { setUserId } from './redux/actions';

import logo from './logo.svg';
import App from './router';
import './App.css';


export default App;
// class App extends React.Component {
//   render() {
//     return (
//       <div className='App'>
//         <header className='App-header'>
//           <img src={logo} className='App-logo' alt='logo' />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <button onClick={() => this.props.setUserId('randomid')}>Set User Id</button>
//           <a
//             className='App-link'
//             href='https://reactjs.org'
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             UserId: {this.props.userId}
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   const userId = getUserId(state) || 'not logged in';
//   return { userId };
// };

// export default connect(
//   mapStateToProps,
//   { setUserId },
// )(App);
