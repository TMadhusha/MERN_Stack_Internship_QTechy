import { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dihslpqhq'
  }
});

export default function Header({ title, imageUrl, onUpdate }) {
  const [newTitle, setNewTitle] = useState(title);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'myPreset');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dihslpqhq/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      onUpdate({ title: newTitle, imageUrl: data.secure_url });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <header className="bg-blue-500 p-4 text-white">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onBlur={() => onUpdate({ title: newTitle, imageUrl })}
        className="bg-transparent border-b border-white text-2xl font-bold"
      />
      <input type="file" onChange={handleImageUpload} className="mt-2" />
      {imageUrl && (
        <AdvancedImage
          cldImg={cld.image(imageUrl.split('/').pop().split('.')[0])}
          className="mt-2 max-h-32"
        />
      )}
    </header>
  );
}