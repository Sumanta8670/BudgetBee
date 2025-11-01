import { Layers2, Pencil, Loader2 } from "lucide-react";

const CategoryList = ({ categories, onEditCategory, loading }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold text-white">Your Categories</h4>
        <div className="text-sm text-slate-400">
          {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
          <p className="text-slate-400">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
            <Layers2 className="text-purple-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No categories yet
          </h3>
          <p className="text-slate-400 text-center max-w-md">
            Start organizing your finances by creating your first category.
            Categories help you track and analyze your income and expenses
            better.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="category-item group relative">
              {/* Icon/Emoji display */}
              <div className="flex items-center gap-4 mb-3">
                <div className="icon-badge w-12 h-12 flex items-center justify-center rounded-xl">
                  {category.icon ? (
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-7 h-7"
                    />
                  ) : (
                    <Layers2 className="text-purple-400" size={24} />
                  )}
                </div>

                {/* Category details */}
                <div className="flex-1 min-w-0">
                  <p className="text-base text-white font-semibold truncate">
                    {category.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                        category.type === "income"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {category.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                onClick={() => onEditCategory(category)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-500/20 hover:scale-110"
              >
                <Pencil size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
