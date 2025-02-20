export const Header = ({ headerTitle }) => {
    return (
        <div className="flex justify-between items-center p-5 shadow-md bg-white">
            <h6 className="text-3xl font-bold">{headerTitle}</h6>
        </div>
    );
};

Header.propTypes;

export default Header;