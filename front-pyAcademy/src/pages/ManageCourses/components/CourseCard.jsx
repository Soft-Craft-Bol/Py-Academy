import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ id, title, description, imageUrl, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [editImage, setEditImage] = useState(imageUrl);

  const handleSave = () => {
    onEdit({ title: editTitle, description: editDesc, imageUrl: editImage });
    setEditModalOpen(false);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      <div className="h-80 relative">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 z-10">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl px-2">
            &#8942;
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg text-sm z-20">
              <button
                onClick={() => {
                  setEditModalOpen(true);
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-black"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  setDeleteConfirmOpen(true);
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
              >
                Eliminar curso
              </button>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
          <h2 className="text-white text-lg font-bold">{title}</h2>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between h-48 bg-white text-black dark:bg-gray-800 dark:text-white">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{description}</p>
        <button
          onClick={() => navigate(`/curso/${id}`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition"
        >
          Ver más
        </button>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-black dark:text-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Editar curso</h3>

            <label className="block mb-1 font-medium">Título</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título"
            />

            <label className="block mb-1 font-medium">Imagen (PNG, JPG, JPEG)</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="w-full mb-3 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setEditImage(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />

            <label className="block mb-1 font-medium">Descripción</label>
            <textarea
              className="w-full mb-4 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Descripción"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded dark:bg-gray-600 dark:text-white"
                onClick={() => setEditModalOpen(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm text-center text-black dark:text-white">
            <h3 className="text-lg font-semibold mb-4">¿Eliminar este curso?</h3>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded dark:bg-gray-600 dark:text-white"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  onDelete();
                  setDeleteConfirmOpen(false);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
