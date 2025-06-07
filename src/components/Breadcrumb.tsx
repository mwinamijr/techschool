import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="list-reset flex flex-wrap items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.to ? (
              <Link
                to={item.to}
                className="hover:underline text-orange-600 font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-semibold">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
