export default function Footer({ contact = {}, onUpdate }) {
  // Provide default empty values if contact is undefined
  const { email = '', phone = '', address = '' } = contact || {};

  return (
    <footer className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto">
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
      </div>
    </footer>
  );
}