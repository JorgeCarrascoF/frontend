
const ErrorButton = () => {
    const errorAction = null;
    const num = 42;

    return <button onClick={() => {
        throw new Error("This is a test error");
    }}>
        {num.toUpperCase()}
        Oops! This is an error button!
    </button>
}

export default ErrorButton;