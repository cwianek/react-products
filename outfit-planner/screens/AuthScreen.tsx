import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome'

import Colors from '../constants/Colors'
const TEXT_COLOR = Colors.black;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import { signupUser, loginUser, restoreSession } from '../reducers/sessionSlice';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false,
      signIn: false,
      accounButtonText: 'Create an Account',
      buttonText: 'LOG IN',
      loginAdditionalText: 'New here?'
    };
  }

  async componentDidMount() {
    this.props.restoreSession();
    this.navigateToRoot();

    await Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
      'bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  async componentDidUpdate(){
    this.navigateToRoot();
  }

  navigateToRoot(){
    if (this.props.user && this.props.user.token) {
      this.props.navigation.navigate('Root');
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  submitLoginCredentials() {
    const { password, email, signIn } = this.state;
    if (signIn) {
      console.log('singIn')
      this.props.signupUser(email, password);
    } else {
      console.log('login')
      this.props.loginUser(email, password);
    }
  }

  accountButtonPress() {
    let { accounButtonText, buttonText, loginAdditionalText, signIn } = this.state;

    signIn = !signIn;
    console.log(signIn);
    if (signIn) {
      buttonText = 'SIGN IN'
      accounButtonText = 'Switch to login',
        loginAdditionalText = 'Already have an account?'
    } else {
      buttonText = 'LOG IN'
      accounButtonText = 'Create an Account'
      loginAdditionalText = 'New here?'
    }
    this.setState({ signIn, buttonText, accounButtonText, loginAdditionalText })
  }

  render() {
    const { email, password, email_valid, login_failed } = this.state;
    const { loading } = this.props;

    return (
      <View style={styles.container}>
        {this.state.fontLoaded ?
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <Text style={[styles.title, { fontWeight: 'bold' }]}>Outfit planner</Text>
            </View>
            <View style={styles.loginInput}>
              <View style={{ marginVertical: 15 }}>
                <Input
                  width={230}
                  icon={
                    <Icon
                      name='user-o'
                      color={TEXT_COLOR}
                      size={25}
                    />
                  }
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: TEXT_COLOR }}
                  keyboardAppearance="light"
                  placeholder="Email"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  ref={input => this.emailInput = input}
                  onSubmitEditing={() => {
                    this.setState({ email_valid: this.validateEmail(email) });
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={TEXT_COLOR}
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage={email_valid ? '' : "Please enter a valid email address"}
                />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Input
                  containerStyle={{ width: 300 }}
                  icon={
                    <Icon
                      name='lock'
                      color={TEXT_COLOR}
                      size={25}
                    />
                  }
                  onChangeText={(password) => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: TEXT_COLOR }}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => this.passwordInput = input}
                  blurOnSubmit={true}
                  placeholderTextColor={TEXT_COLOR}
                  renderErrorMessage={true}
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage={!login_failed ? '' : "The email and password you entered did not match out records. Please try again!"}
                />
              </View>
            </View>
            <View style={styles.switchView}>
              <Text style={{ color: TEXT_COLOR }}>
                {this.state.loginAdditionalText}
              </Text>
              <Button
                title={this.state.accounButtonText}
                type="clear"
                titleStyle={{ color: Colors.gray, fontSize: 15 }}
                onPress={this.accountButtonPress.bind(this)}
              />
            </View>
            <View style={styles.loginButton}>
              <Button
                title={this.state.buttonText}
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.submitLoginCredentials.bind(this)}
                loading={loading}
                loadingProps={{ size: 'small', color: 'white' }}
                disabled={!email_valid && password.length < 8}
                buttonStyle={{ height: 50, width: 250, elevation: 0, backgroundColor: Colors.pink, borderWidth: 1, borderColor: 'white', borderRadius: 30 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
              />
            </View>
          </View>
          :
          <Text>Loading...</Text>
        }
      </View>
    );
  }
}

const styles = {
  container: {
    height: 700,
    alignItems: 'center',
  },
  loginView: {
    flex: 1,
    width: 300,
    alignItems: 'center',
  },
  loginTitle: {
    justifyContent: 'center',
    flex: 1.5,
  },
  title: {
    color: Colors.pink,
    fontSize: 30,
  },
  loginInput: {
    flex: 1.2,
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center'
  },
  switchView: {
    flex: 0.4,
    alignItems: 'center',
  }
};

const mapStateToProps = state => ({
  loading: state.session.loading,
  user: state.session.user,
  error: state.session.error
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser, loginUser, restoreSession }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);