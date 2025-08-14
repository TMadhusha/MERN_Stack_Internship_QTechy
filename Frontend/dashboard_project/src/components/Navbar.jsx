export default function Navbar({ links, onUpdate }) {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="text-white hover:text-blue-300">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}