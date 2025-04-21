const Button = ({ onClick, text, className }) =>
  <button onClick={onClick} className={className}>{text}
  </button>

export default Button