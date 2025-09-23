export default function Beneficios() {
  return (
    <div className="w-full max-w-3xl mb-10 px-4">
      <h3 className="text-xl font-semibold text-pink-600 mb-3 text-center">¿Por qué elegirme?</h3>
      <ul className="flex flex-col md:flex-row justify-center gap-6">
        <li className="flex items-center gap-2 text-gray-700">
          <span className="text-green-500 text-xl">✔</span>
          Trato cálido y personalizado
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          <span className="text-green-500 text-xl">✔</span>
          Última tecnología y productos certificados
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          <span className="text-green-500 text-xl">✔</span>
          Confidencialidad y seguridad
        </li>
      </ul>
    </div>
  );
}