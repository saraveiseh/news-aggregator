import { Input, Select } from "@/components/ui";
import { CATEGORIES, SOURCES } from "@/config";
import { FiltersType } from "@/types";

type Props = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export const Filters: React.FC<Props> = ({ filters, setFilters }) => {
  const handleChange =
    (field: keyof FiltersType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: e.target.value,
      }));
    };

  const isNYT = filters.source === "nyt";

  return (
    <nav className="sm:flex gap-2 space-y-2 p-4">
      <Input
        label="Search"
        placeholder="Search for a keyword"
        value={filters.q}
        onChange={handleChange("q")}
      />
      <Select
        label="Source"
        options={SOURCES}
        value={filters.source}
        onChange={handleChange("source")}
      />
      <Select
        label="Category"
        options={CATEGORIES.map((category) => ({
          label: category.name,
          value: String(category.id),
        }))}
        value={filters.category}
        onChange={handleChange("category")}
      />
      <Input
        label={isNYT ? "Publish Date" : "From"}
        type="date"
        value={filters.from}
        onChange={handleChange("from")}
      />
      {!isNYT && (
        <Input
          label="to"
          type="date"
          value={filters.to}
          onChange={handleChange("to")}
        />
      )}
    </nav>
  );
};
