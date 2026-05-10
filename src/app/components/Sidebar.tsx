import { Checkbox } from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { Slider } from '@radix-ui/react-slider';

export function Sidebar() {
  return (
    <aside className="w-72 bg-cream-50 border-r border-neutral-200 p-6">
      <h2 className="font-semibold text-lg text-neutral-800 mb-6">Filters</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-neutral-700 mb-3">Species</h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                className="w-5 h-5 border-2 border-neutral-300 rounded data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex items-center justify-center"
                defaultChecked
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </Checkbox>
              <span className="text-neutral-700 group-hover:text-neutral-900">Dog</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                className="w-5 h-5 border-2 border-neutral-300 rounded data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex items-center justify-center"
                defaultChecked
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </Checkbox>
              <span className="text-neutral-700 group-hover:text-neutral-900">Cat</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                className="w-5 h-5 border-2 border-neutral-300 rounded data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </Checkbox>
              <span className="text-neutral-700 group-hover:text-neutral-900">Other</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <h3 className="font-medium text-neutral-700 mb-3">Age</h3>
          <select className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>All Ages</option>
            <option>Puppy / Kitten</option>
            <option>Adult</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <h3 className="font-medium text-neutral-700 mb-3">Size</h3>
          <select className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>All Sizes</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
