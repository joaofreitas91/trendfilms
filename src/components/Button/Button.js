import './Button.css';

const Button = (props) => {
  function chamar(event) {
    console.log(event.target.innerText);
  }
  return (
    <button className="button" onClick={chamar}>
      {props.name}
    </button>
  );
};

export default Button;
