interface SidebarProps {
  onFilterChange: (filters: { species?: string; size?: string }) => void;
}

export function Sidebar({ onFilterChange }: SidebarProps) {
  
  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const species = e.target.value;
    onFilterChange({ species: species === '' ? undefined : species });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    onFilterChange({ size: size === '' ? undefined : size });
  };

  return (
    <aside className="w-72 bg-white border-r border-neutral-200 p-6 flex-shrink-0">
      <h2 className="font-semibold text-lg text-neutral-800 mb-6">Filters</h2>

      <div className="space-y-8">
        {/* Species Section - Dropdown */}
        <div>
          <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            Species
          </h3>
          <select 
            onChange={handleSpeciesChange}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-neutral-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block transition-all"
          >
            <option value="">All Species</option>
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Size Section - Dropdown */}
        <div>
          <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            Size
          </h3>
          <select 
            onChange={handleSizeChange}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-neutral-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block transition-all"
          >
            <option value="">All Sizes</option>
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
