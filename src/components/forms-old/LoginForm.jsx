import PropTypes from "prop-types";
import InputField from "../ui/custom/InputField";

const LoginForm = ({ handleSubmit, setUser, setPassword }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto w-full">
            <form>
            <h1 className="text-2xl font-bold text-gray-900 mb-10">User Login</h1>
                <InputField label="Username" id="username" type="text" icon="user-tie" setValue={setUser}/>
                <InputField label="Password" id="password" type="password" icon="lock" setValue={setPassword}/>
                <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Sign in
                </button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
