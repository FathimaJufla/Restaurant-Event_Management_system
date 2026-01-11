const MenuItem = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer space-y-3 pb-8 border-b hover:bg-white transition px-4"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-serif text-lg">{item.title}</h3>
        <span className="text-orange-400 font-semibold">
          £{Number(item.price).toFixed(2)}
        </span>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed">
        {item.subtitle}
      </p>
    </div>
  );
};

export default MenuItem;
