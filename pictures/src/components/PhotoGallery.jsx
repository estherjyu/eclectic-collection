import React, { useState } from 'react';

// Mock photo data - replace with your actual photo data
const photoData = {
  featured: [
    { id: 1, src: "/api/placeholder/400/300", caption: "Featured Mountain View", category: "featured" },
    { id: 2, src: "/api/placeholder/400/300", caption: "Featured City Lights", category: "featured" }
  ],
  nature: [
    { id: 3, src: "/api/placeholder/400/300", caption: "Forest Path", category: "nature" },
    { id: 4, src: "/api/placeholder/400/300", caption: "Mountain Lake", category: "nature" }
  ],
  urban: [
    { id: 5, src: "/api/placeholder/400/300", caption: "City Streets", category: "urban" },
    { id: 6, src: "/api/placeholder/400/300", caption: "Night Lights", category: "urban" }
  ],
  portraits: [
    { id: 7, src: "/api/placeholder/400/300", caption: "Summer Portrait", category: "portraits" },
    { id: 8, src: "/api/placeholder/400/300", caption: "Winter Portrait", category: "portraits" }
  ],
  newyork: [
    { id: 9, src: "/api/placeholder/400/300", caption: "Times Square", category: "newyork" },
    { id: 10, src: "/api/placeholder/400/300", caption: "Central Park", category: "newyork" }
  ]
};

const categories = [
  { id: 'featured', label: 'Featured' },
  { id: 'latest', label: 'Latest Uploads' },
  { id: 'nature', label: 'Nature & Landscapes' },
  { id: 'urban', label: 'Urban Photography' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'newyork', label: 'New York' }
];

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
        <nav>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {categories.find(c => c.id === selectedCategory)?.label || 'Photos'}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(photoData[selectedCategory] || []).map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-sm">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
