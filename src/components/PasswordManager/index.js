import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordManagerItem from '../PasswordManagerItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'yellow',
  'light-green',
  'orange',
  'green',
  'red',
  'white',
  'blue',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    showPassword: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
  }

  updateWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  updateUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  updatePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  deletePasswordListItem = id => {
    const {passwordsList} = this.state
    const filteredPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredPasswordList})
  }

  addNewPasswordItem = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordItem = {
      id: uuidv4(),
      websiteName: websiteInput,
      username: usernameInput,
      password: passwordInput,
      backgroundClassName:
        initialContainerBackgroundClassNames[Math.ceil(Math.random() * 7)],
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {
      passwordsList,
      showPassword,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
    } = this.state
    const searchedPasswordList = passwordsList.filter(eachPassword =>
      eachPassword.username.includes(searchInput),
    )
    console.log(searchedPasswordList)
    const noPasswordItem = (
      <div className="no-password-item">
        <img
          className="no-password-img"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
        />
        <p className="no-password-title">No Passwords</p>
      </div>
    )
    const passwordListItem = (
      <ul className="password-list">
        {searchedPasswordList.map(eachPassword => (
          <PasswordManagerItem
            key={eachPassword.id}
            eachPassword={eachPassword}
            showPassword={showPassword}
            deletePasswordListItem={this.deletePasswordListItem}
          />
        ))}
      </ul>
    )
    const isdisPlayPasswordsList =
      searchedPasswordList.length === 0 ? noPasswordItem : passwordListItem
    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-container">
          <form
            className="password-input-form"
            onSubmit={this.addNewPasswordItem}
          >
            <h1 className="password-form-title">Add New Password</h1>
            <div className="input-container">
              <img
                className="input-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="input-box"
                type="text"
                placeholder="Enter Website"
                onChange={this.updateWebsiteInput}
                value={websiteInput}
              />
            </div>
            <div className="input-container">
              <img
                className="input-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="input-box"
                type="text"
                placeholder="Enter Username"
                onChange={this.updateUsernameInput}
                value={usernameInput}
              />
            </div>
            <div className="input-container">
              <img
                className="input-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="input-box"
                type="password"
                placeholder="Enter Password"
                onChange={this.updatePasswordInput}
                value={passwordInput}
              />
            </div>
            <button className="password-form-btn" type="submit">
              Add
            </button>
          </form>
          <img
            alt="password manager"
            className="password-input-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div className="password-container storage-container">
          <div className="password-keeper-header">
            <div className="header-content">
              <h1 className="header-title">Your Passwords</h1>
              <p className="header-count">{passwordsList.length}</p>
            </div>
            <div className="input-container">
              <img
                className="input-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="input-box"
                type="search"
                onChange={this.updateSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="password-checkbox-container">
            <input
              className="input-checkbox"
              type="checkbox"
              id="checkBox"
              onClick={this.updateShowPassword}
            />
            <label className="input-label" htmlFor="checkBox">
              Show Passwords
            </label>
          </div>
          {isdisPlayPasswordsList}
        </div>
      </div>
    )
  }
}

export default PasswordManager
