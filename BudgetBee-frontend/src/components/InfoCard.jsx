const InfoCard = ({ icon, label, color, value }) => {
  const colorClasses = {
    purple: {
      bg: "from-purple-500 to-blue-500",
      border: "border-purple-500/30",
      glow: "shadow-purple-500/20",
    },
    green: {
      bg: "from-green-500 to-emerald-500",
      border: "border-green-500/30",
      glow: "shadow-green-500/20",
    },
    red: {
      bg: "from-red-500 to-pink-500",
      border: "border-red-500/30",
      glow: "shadow-red-500/20",
    },
  };

  const colorClass = colorClasses[color] || colorClasses.purple;

  return (
    <div className="card p-6 group hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 flex items-center justify-center text-white bg-gradient-to-br ${colorClass.bg} rounded-xl border ${colorClass.border} ${colorClass.glow} shadow-lg`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-white">₹{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
