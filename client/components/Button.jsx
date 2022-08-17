const Button = ({ text}) => {
    return (
        <div className="flex justify-center items-center pb-9 ">
            <button className="btn btn-outline btn-info"> {text} </button>
        </div>
    );
};
export default Button;
