export default function ProgressBar({ value }) {
  return (
    <div className="relative">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${value}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
        ></div>
      </div>
    </div>
  );
}
