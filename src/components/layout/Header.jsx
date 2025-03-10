const Header = ({ headerTitle }) => {
    return (
        <div className="flex justify-between items-center rounded-2xl p-5 shadow-md bg-gray-100">
            <h6 className="text-3xl font-bold">{headerTitle}</h6>
        </div>
    );
};

Header.propTypes;

export default Header;