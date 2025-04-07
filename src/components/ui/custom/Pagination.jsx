import { Button } from "@/components/ui/button";

const Pagination = ({ pagination, setPagination, total }) => {
    const pages = Math.ceil(total / pagination.perPage);
    return (
        <div className="flex justify-end gap-2">
            <Button onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))} disabled={pagination.page <= 1}>
                Prev
            </Button>
            <Button onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))} disabled={pagination.page >= pages}>
                Next
            </Button>
        </div>
    );
};

Pagination.propTypes;

export default Pagination;
