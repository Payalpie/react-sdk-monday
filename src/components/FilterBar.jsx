import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import DropdownButton from "./DropdownButton";
import IconButton from "./IconButton";
import MenuItem from "./MenuItem";

const FilterBar = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    createdDate: null,
    lastModified: null,
  });
  const [customRanges, setCustomRanges] = useState({
    createdDate: { start: "", end: "" },
    lastModified: { start: "", end: "" },
  });

  const hasActiveFilters = filters.createdDate || filters.lastModified;

  const clearFilters = () => {
    setFilters({
      createdDate: null,
      lastModified: null,
    });
    setCustomRanges({
      createdDate: { start: "", end: "" },
      lastModified: { start: "", end: "" },
    });
  };

  return (
    <div
      className={`bg-white border-b border-gray-200 transition-all duration-300 ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="px-4 sm:px-6 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-2">
            <DropdownButton label="Tags" showChevron={true} variant="filter" />
            <DropdownButton
              label="Version sets"
              showChevron={true}
              variant="filter"
            />

            <DateFilter
              label="Created date"
              value={filters.createdDate}
              customRange={customRanges.createdDate}
              onChange={(val) =>
                setFilters((f) => ({ ...f, createdDate: val }))
              }
              onCustomRangeChange={(range) =>
                setCustomRanges((r) => ({ ...r, createdDate: range }))
              }
            />

            <DateFilter
              label="Last modified"
              value={filters.lastModified}
              customRange={customRanges.lastModified}
              onChange={(val) =>
                setFilters((f) => ({ ...f, lastModified: val }))
              }
              onCustomRangeChange={(range) =>
                setCustomRanges((r) => ({ ...r, lastModified: range }))
              }
            />

            {hasActiveFilters && (
              <>
                <span className="mx-1 text-gray-300 hidden sm:inline">|</span>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>

          {/* RIGHT */}
          <IconButton
            icon={X}
            onClick={onClose}
            title="Close filters"
            variant="ghost"
            size={18}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

const DateFilter = ({
  label,
  value,
  onChange,
  customRange,
  onCustomRangeChange,
}) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectPreset = (val) => {
    onChange(val);
    setOpen(false);
  };

  const getButtonLabel = () => {
    if (!value) return label;

    const presets = {
      today: "Today",
      "7days": "Last 7 days",
      "28days": "Last 28 days",
    };

    if (presets[value]) {
      return `${label}: ${presets[value]}`;
    } else if (value === "custom" && customRange) {
      if (customRange.start && customRange.end) {
        return `${label}: ${customRange.start} - ${customRange.end}`;
      } else if (customRange.start) {
        return `${label}: From ${customRange.start}`;
      } else if (customRange.end) {
        return `${label}: Until ${customRange.end}`;
      }
    }
    return label;
  };

  return (
    <div className="relative" ref={ref}>
      <DropdownButton
        label={getButtonLabel()}
        onClick={() => setOpen((v) => !v)}
        isActive={value !== null}
        showChevron={true}
        variant="filter"
      />

      {open && (
        <div className="absolute z-50 mt-2 w-82 rounded-md border border-gray-200 bg-white shadow-lg p-3">
          <MenuItem label="Today" onClick={() => selectPreset("today")} />
          <MenuItem label="Last 7 days" onClick={() => selectPreset("7days")} />
          <MenuItem
            label="Last 28 days"
            onClick={() => selectPreset("28days")}
          />

          <div className="mt-2">
            <MenuItem
              label="Custom date range"
              onClick={() => onChange("custom")}
            />

            {value === "custom" && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={customRange.start}
                  onChange={(e) =>
                    onCustomRangeChange({
                      ...customRange,
                      start: e.target.value,
                    })
                  }
                />
                <span className="text-gray-400">–</span>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={customRange.end}
                  onChange={(e) =>
                    onCustomRangeChange({
                      ...customRange,
                      end: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
