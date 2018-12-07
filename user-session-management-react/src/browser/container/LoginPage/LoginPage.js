/* eslint-disable no-console */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import store from 'src/browser/stores/LocalStorage';
import {Alert, Button, FormControl, FormGroup} from 'react-bootstrap';
import {loginUser} from 'src/browser/actions/Authentication';
import style from './LoginPage.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  getValidationState() {
    const {username, errMessage} = this.state;
    const length = username.length;
    if (errMessage !== '') return 'error';
    else if (length >= 5) return 'success';
    else if (length >= 3) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  doLogin(event) {
    event.preventDefault();
    const {loginUser} = this.props;
    const {username, password} = this.state;
    if (username && password) {
      try {
        loginUser(username, password);
      } catch (e) {
        this.setState({errMessage: 'wrong login or password'});
      }
    } else {
      this.setState({
        errMessage: 'login or password is empty',
      });
    }
  }

  render() {
    const {username, password, errMessage} = this.state;
    const {user} = store.getState();
    if (user.isAdmin === true) {
      return <Redirect to="/" />;
    }
    const inputs = [
      <FormControl
        key={0}
        id="username"
        type="text"
        value={username}
        placeholder="Enter user name"
        onChange={this.handleChange}
      />,
      <FormControl
        key={1}
        id="password"
        type="password"
        value={password}
        placeholder="Enter user name"
        onChange={this.handleChange}
      />,
    ];
    return (
      <div className="container">
        <div className={style['login-container']}>
          <div id="output" />
          <div className={style.avatar} />
          <div className={style['form-box']}>
            <form action="" method="" onSubmit={this.doLogin}>
              <FormGroup validationState={this.getValidationState()}>
                {errMessage !== '' ? (
                  <Alert bsStyle="danger">
                    <h5>{errMessage}</h5>
                    {inputs}
                  </Alert>
                ) : (
                  inputs
                )}
                <Button type="button" block onClick={this.doLogin}>
                  Login
                </Button>
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({user}) => ({user});

export default connect(
  mapStateToProps,
  {loginUser},
)(LoginPage);
