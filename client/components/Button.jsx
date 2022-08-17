const Button = ({ text, clickHandler }) => {
  return (
    <div className="flex justify-center items-center pb-9 ">
      <button className="btn glass" onClick={clickHandler}>
        {text}
      </button>
    </div>
  );
};
export default Button;
