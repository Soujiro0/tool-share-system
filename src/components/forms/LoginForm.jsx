import PropTypes from "prop-types";
import InputField from "../ui/InputField";

export const LoginForm = ({ handleSubmit, setUser, setPassword }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto w-full">
            <form>
                <InputField label="Email address" id="email" type="email" icon="user-tie" setValue={setUser}/>
                <InputField label="Password" id="password" type="password" icon="lock" setValue={setPassword}/>
                <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Sign in
                </button>
            </form>
        </div>
    );
};
export default LoginForm;
LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setUser: PropTypes.string.isRequired,
    setPassword: PropTypes.string.isRequired,
}
