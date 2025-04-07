import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

const FilterBar = ({ filters, setFilters, requests, setFiltered }) => {
    const handleFilter = (newFilters) => {
        setFilters(newFilters);

        let filtered = [...requests];
        if (newFilters.search) {
            filtered = filtered.filter((r) => r.remarks.toLowerCase().includes(newFilters.search.toLowerCase()));
        }                                   
        if (newFilters.status && newFilters.status !== "ALL") {
            filtered = filtered.filter(r => r.status === newFilters.status);
        }
        setFiltered(filtered);
    };

    return (
        <div className="flex gap-2 items-center">
            <Input placeholder="Search remarks..." value={filters.search} onChange={(e) => handleFilter({ ...filters, search: e.target.value })} />
            <Select value={filters.status} onValueChange={(value) => handleFilter({ ...filters, status: value })}>
                <SelectTrigger className="w-[160px]">Status</SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

FilterBar.propTypes;

export default FilterBar;
