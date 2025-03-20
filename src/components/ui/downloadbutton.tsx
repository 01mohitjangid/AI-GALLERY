import React from 'react';

export default function downloadButton() {
  const handleClick = async () => {
    const response = await fetch('/api/file');

    if (response.status !== 200) {
      console.error(response.status, response.statusText);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.png';
    link.click();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className='mt-2 font-bold text-black bg-white hover:bg-amber-300 py-2 px-4 rounded'
    >
      Download
    </button>
  );
}
