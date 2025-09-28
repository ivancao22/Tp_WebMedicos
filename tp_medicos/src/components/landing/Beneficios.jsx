export default function Beneficios() {
  return (
    <div className="w-full max-w-3xl mb-10 px-4 mx-auto">
      <h3 className="text-xl font-semibold text-blue-800 mb-6 text-center">
        ¿Por qué elegirme?
      </h3>

      <ul className="flex flex-col md:flex-row justify-center gap-8 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-green-500 text-xl">✓</span>
          Trato cálido y personalizado
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 text-xl">✓</span>
          Última tecnología y productos certificados
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 text-xl">✓</span>
          Confidencialidad y seguridad
        </li>
      </ul>
    </div>
  );
}
