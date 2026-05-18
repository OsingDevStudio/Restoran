// Tambahkan "onAdd" di dalam kurung kurawal (destructuring props)
const MenuCard = ({ item, onAdd }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="font-bold text-orange-600">Rp {item.price.toLocaleString()}</span>
          {/* Tambahkan onClick={onAdd} di bawah ini */}
          <button 
            onClick={onAdd}
            className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-700 active:scale-95 transition"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;