import './index.css'

const PasswordManagerItem = props => {
  const {eachPassword, showPassword, deletePasswordListItem} = props
  const {id, websiteName, username, password, backgroundClassName} =
    eachPassword
  const displayPassword = showPassword ? (
    <p className="password">{password}</p>
  ) : (
    <img
      className="password-stars"
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )
  const onClickDeletePasswordItem = () => {
    deletePasswordListItem(id)
  }
  return (
    <li className="password-item">
      <div className="password-content">
        <p className={`password-profile ${backgroundClassName}`}>
          {username[0]}
        </p>
        <div className="password-profile-info">
          <p className="name">{websiteName}</p>
          <p className="name">{username}</p>
          {displayPassword}
        </div>
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={onClickDeletePasswordItem}
        data-testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordManagerItem
