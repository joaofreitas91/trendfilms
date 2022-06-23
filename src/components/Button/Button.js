import "./Button.css";

const Button = ({ name, id, callback }) => {
  return (
    <button className="button" onClick={callback} id={id}>
      {name}
    </button>
  );
};

export default Button;
