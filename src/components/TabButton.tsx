type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-t-md font-medium ${
        active
          ? "bg-white border-t border-l border-r border-gray-300"
          : "bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
