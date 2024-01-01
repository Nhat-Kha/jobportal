export default function ProgressBar({ value }) {
  return (
    <div class="relative">
      <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${value}%` }}
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
        ></div>
      </div>
    </div>
  );
}
