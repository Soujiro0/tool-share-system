import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/ui/InputField";
import ItemCard from "../components/ui/ItemCard";
import SelectField from "../components/ui/SelectField";
library.add(faS);

export const BorrowingForm = () => {
    const [facultyMembers] = useState(["Dr. Smith", "Prof. Johnson", "Dr. Brown"]);
    const [items] = useState([
        { name: "Digital Multimeter", availability: true, availableQuantity: 5 },
        { name: "Oscilloscope", availability: false, availableQuantity: 0 },
    ]);

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6 w-full">
                <Link to="/">
                    <FontAwesomeIcon icon="arrow-left" />
                </Link>
                <div className="flex-grow text-center">
                    <h1 className="text-2xl font-semibold">Borrow an Item</h1>
                </div>
            </div>

            {/* Borrowing Details */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Borrowing Details</h2>
                <div className="space-y-4">
                    <InputField label="Borrower Name" id="borrower-name" type="text" icon="user" />
                    <InputField label="Borrower ID" id="borrower-id" type="text" icon="id-card" />
                    <div className="flex space-x-4">
                        <InputField label="mm/dd/yy" id="borrow-date" type="text" icon="calendar-alt" />
                        <InputField label="mm/dd/yy" id="borrow-date" type="text" icon="calendar-alt" />
                    </div>
                    <textarea placeholder="Reason for Borrowing" className="w-full border rounded-lg p-2 focus:ring-0"></textarea>
                </div>
            </div>

            {/* Faculty Member Supervision */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Faculty Supervision</h2>
                <SelectField icon="chalkboard-teacher" options={["Select Faculty Member", ...facultyMembers]} />
            </div>

            {/* Item Catalog */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select an Item to Borrow</h2>
                <div className="flex items-center space-x-4 mb-4">
                    <InputField label="Search Items..." id="search-item" type="text" icon="magnifying-glass" />
                    <SelectField options={["All Categories"]} />
                    <SelectField options={["Availability"]} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <ItemCard key={index} {...item} />
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Submit Request</button>
            </div>
        </div>
    );
};
export default BorrowingForm;
