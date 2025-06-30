import React, { useState } from 'react';
import { Plus, X, Eye, EyeOff, ArrowUp, ArrowDown, Image as ImageIcon, Type, Save, BookOpen, FileText, Layers } from 'lucide-react';

const LearningUnitsManager = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [units, setUnits] = useState([{
    courseId: Date.now(),
    title: '',
    description: '',
    sequenceNumber: 1,
    isActive: true,
    titles: [{
      id: Date.now() + 1,
      title: '',
      description: '',
      sequenceNumber: 1,
      isActive: true,
      contents: [{
        id: Date.now() + 2,
        type: 'text',
        content: '',
        imageUrl: null
      }]
    }]
  }]);

  const addUnit = () => {
    const newUnit = {
      id: Date.now(),
      title: '',
      description: '',
      sequenceNumber: units.length + 1,
      isActive: true,
      titles: [{
        id: Date.now() + 1,
        title: '',
        description: '',
        sequenceNumber: 1,
        isActive: true,
        contents: [{
          id: Date.now() + 2,
          type: 'text',
          content: '',
          imageUrl: null
        }]
      }]
    };
    setUnits([...units, newUnit]);
  };

  const removeUnit = (unitId) => {
    setUnits(units.filter(unit => unit.id !== unitId));
  };

  const updateUnit = (unitId, field, value) => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, [field]: value } : unit
    ));
  };

  const moveUnit = (unitId, direction) => {
    const unitIndex = units.findIndex(unit => unit.id === unitId);
    if (
      (direction === 'up' && unitIndex > 0) ||
      (direction === 'down' && unitIndex < units.length - 1)
    ) {
      const newUnits = [...units];
      const targetIndex = direction === 'up' ? unitIndex - 1 : unitIndex + 1;
      [newUnits[unitIndex], newUnits[targetIndex]] = [newUnits[targetIndex], newUnits[unitIndex]];
      
      // Update sequence numbers
      newUnits.forEach((unit, index) => {
        unit.sequenceNumber = index + 1;
      });
      
      setUnits(newUnits);
    }
  };

  const addTitle = (unitId) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        const newTitle = {
          id: Date.now(),
          title: '',
          description: '',
          sequenceNumber: unit.titles.length + 1,
          isActive: true,
          contents: [{
            id: Date.now() + 1,
            type: 'text',
            content: '',
            imageUrl: null
          }]
        };
        return { ...unit, titles: [...unit.titles, newTitle] };
      }
      return unit;
    }));
  };

  const removeTitle = (unitId, titleId) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return { ...unit, titles: unit.titles.filter(title => title.id !== titleId) };
      }
      return unit;
    }));
  };

  const updateTitle = (unitId, titleId, field, value) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          titles: unit.titles.map(title =>
            title.id === titleId ? { ...title, [field]: value } : title
          )
        };
      }
      return unit;
    }));
  };

  const addContent = (unitId, titleId, type = 'text') => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          titles: unit.titles.map(title => {
            if (title.id === titleId) {
              const newContent = {
                id: Date.now(),
                type,
                content: '',
                imageUrl: null
              };
              return { ...title, contents: [...title.contents, newContent] };
            }
            return title;
          })
        };
      }
      return unit;
    }));
  };

  const removeContent = (unitId, titleId, contentId) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          titles: unit.titles.map(title => {
            if (title.id === titleId) {
              return { ...title, contents: title.contents.filter(content => content.id !== contentId) };
            }
            return title;
          })
        };
      }
      return unit;
    }));
  };

  const updateContent = (unitId, titleId, contentId, field, value) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          titles: unit.titles.map(title => {
            if (title.id === titleId) {
              return {
                ...title,
                contents: title.contents.map(content =>
                  content.id === contentId ? { ...content, [field]: value } : content
                )
              };
            }
            return title;
          })
        };
      }
      return unit;
    }));
  };

  const handleImageUpload = (unitId, titleId, contentId, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateContent(unitId, titleId, contentId, 'imageUrl', imageUrl);
    }
  };

  const handleSave = () => {
    console.log('Saving units:', units);
    alert('Unidades guardadas correctamente');
  };

  const PreviewContent = ({ unit }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <BookOpen className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{unit.title || 'Título de la unidad'}</h2>
          <p className="text-gray-600 text-sm">Unidad {unit.sequenceNumber}</p>
        </div>
      </div>
      
      {unit.description && (
        <p className="text-gray-700 mb-6 leading-relaxed">{unit.description}</p>
      )}

      <div className="space-y-6">
        {unit.titles.map((title, titleIndex) => (
          <div key={title.id} className="border-l-4 border-indigo-500 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title.title || 'Título del tema'}
            </h3>
            {title.description && (
              <p className="text-gray-600 mb-4">{title.description}</p>
            )}
            
            <div className="space-y-4">
              {title.contents.map((content) => (
                <div key={content.id} className="ml-4">
                  {content.type === 'text' && content.content && (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{content.content}</p>
                    </div>
                  )}
                  {content.type === 'image' && content.imageUrl && (
                    <div className="my-4">
                      <img 
                        src={content.imageUrl} 
                        alt="Contenido visual" 
                        className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="-m-8 min-h-screen bg-gray-50 dark:bg-primary-pri4 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-primary-pri3 shadow-sm border-b border-gray-200 dark:border-primary-pri2 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-primary-pri2 p-3 rounded-xl">
                <Layers className="h-8 w-8 text-indigo-600 dark:text-primary-pri1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestor de Unidades de Aprendizaje</h1>
                <p className="text-gray-600 dark:text-primary-pri1">Crea y organiza el contenido de tu curso</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  previewMode
                    ? 'bg-gray-100 dark:bg-primary-pri2 text-gray-700 dark:text-primary-pri1 hover:bg-gray-200 dark:hover:bg-primary-pri1/80'
                    : 'bg-indigo-100 dark:bg-primary-pri1 text-indigo-700 dark:text-white hover:bg-indigo-200 dark:hover:bg-primary-pri2/80'
                }`}
              >
                {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {previewMode ? 'Editar' : 'Vista previa'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-indigo-600 dark:bg-primary-pri2 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-primary-pri1 transition-colors"
              >
                <Save className="h-4 w-4" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {previewMode ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Vista Previa del Curso</h2>
            {units.map(unit => (
              <PreviewContent key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Editor de Contenido</h2>
                <button
                  onClick={addUnit}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Unidad
                </button>
              </div>

              {units.map((unit, unitIndex) => (
                <div key={unit.id} className="bg-white dark:bg-primary-pri3 rounded-xl shadow-sm border border-gray-200 dark:border-primary-pri2 overflow-hidden transition-colors duration-300">
                  {/* Unit Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-primary-pri2 dark:to-primary-pri1 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 dark:bg-primary-pri1/20 p-2 rounded-lg">
                          <BookOpen className="h-5 w-5 text-white dark:text-primary-pri2" />
                        </div>
                        <div>
                          <h3 className="text-white dark:text-primary-pri1 font-semibold">Unidad {unit.sequenceNumber}</h3>
                          <p className="text-indigo-100 dark:text-primary-pri2 text-sm">
                            {unit.titles.length} {unit.titles.length === 1 ? 'tema' : 'temas'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveUnit(unit.id, 'up')}
                          disabled={unitIndex === 0}
                          className="p-1 text-white/70 dark:text-primary-pri2/70 hover:text-white dark:hover:text-primary-pri1 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveUnit(unit.id, 'down')}
                          disabled={unitIndex === units.length - 1}
                          className="p-1 text-white/70 dark:text-primary-pri2/70 hover:text-white dark:hover:text-primary-pri1 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeUnit(unit.id)}
                          className="p-1 text-white/70 dark:text-red-300 hover:text-red-200 dark:hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Unit Form */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-primary-pri1 mb-2">
                          Título de la unidad
                        </label>
                        <input
                          type="text"
                          value={unit.title}
                          onChange={(e) => updateUnit(unit.id, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-pri2 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary-pri2 focus:border-transparent bg-white dark:bg-primary-pri4 text-gray-900 dark:text-white"
                          placeholder="Ej: Introducción a Python"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-primary-pri1 mb-2">
                          Descripción de la unidad
                        </label>
                        <textarea
                          value={unit.description}
                          onChange={(e) => updateUnit(unit.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-primary-pri2 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary-pri2 focus:border-transparent bg-white dark:bg-primary-pri4 text-gray-900 dark:text-white"
                          placeholder="Describe brevemente el contenido de esta unidad..."
                        />
                      </div>
                    </div>

                    {/* Titles Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Temas de la unidad
                        </h4>
                        <button
                          onClick={() => addTitle(unit.id)}
                          className="flex items-center gap-1 text-indigo-600 dark:text-primary-pri2 hover:text-indigo-700 dark:hover:text-primary-pri1 text-sm font-medium"
                        >
                          <Plus className="h-4 w-4" />
                          Agregar tema
                        </button>
                      </div>

                      {unit.titles.map((title, titleIndex) => (
                        <div key={title.id} className="bg-gray-50 dark:bg-primary-pri4 rounded-lg p-4 border border-gray-200 dark:border-primary-pri2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600 dark:text-primary-pri1">
                              Tema {title.sequenceNumber}
                            </span>
                            <button
                              onClick={() => removeTitle(unit.id, title.id)}
                              className="text-gray-400 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="text"
                              value={title.title}
                              onChange={(e) => updateTitle(unit.id, title.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-primary-pri2 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary-pri2 focus:border-transparent text-sm bg-white dark:bg-primary-pri4 text-gray-900 dark:text-white"
                              placeholder="Título del tema"
                            />
                            
                            <textarea
                              value={title.description}
                              onChange={(e) => updateTitle(unit.id, title.id, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-primary-pri2 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary-pri2 focus:border-transparent text-sm bg-white dark:bg-primary-pri4 text-gray-900 dark:text-white"
                              placeholder="Descripción del tema..."
                            />

                            {/* Contents */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 dark:text-primary-pri1 uppercase tracking-wide">
                                  Contenido
                                </span>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => addContent(unit.id, title.id, 'text')}
                                    className="flex items-center gap-1 text-xs text-indigo-600 dark:text-primary-pri2 hover:text-indigo-700 dark:hover:text-primary-pri1 font-medium"
                                  >
                                    <Type className="h-3 w-3" />
                                    Texto
                                  </button>
                                  <button
                                    onClick={() => addContent(unit.id, title.id, 'image')}
                                    className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                                  >
                                    <ImageIcon className="h-3 w-3" />
                                    Imagen
                                  </button>
                                </div>
                              </div>

                              {title.contents.map((content) => (
                                <div key={content.id} className="bg-white dark:bg-primary-pri3 rounded-lg p-3 border border-gray-200 dark:border-primary-pri2">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-500 dark:text-primary-pri1 flex items-center gap-1">
                                      {content.type === 'text' ? (
                                        <Type className="h-3 w-3" />
                                      ) : (
                                        <ImageIcon className="h-3 w-3" />
                                      )}
                                      {content.type === 'text' ? 'Párrafo' : 'Imagen'}
                                    </span>
                                    <button
                                      onClick={() => removeContent(unit.id, title.id, content.id)}
                                      className="text-gray-400 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>

                                  {content.type === 'text' ? (
                                    <textarea
                                      value={content.content}
                                      onChange={(e) => updateContent(unit.id, title.id, content.id, 'content', e.target.value)}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-gray-300 dark:border-primary-pri2 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary-pri2 focus:border-transparent text-sm bg-white dark:bg-primary-pri4 text-gray-900 dark:text-white"
                                      placeholder="Escribe el contenido del párrafo..."
                                    />
                                  ) : (
                                    <div className="space-y-2">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(unit.id, title.id, content.id, e.target.files[0])}
                                        className="w-full text-sm"
                                      />
                                      {content.imageUrl && (
                                        <img
                                          src={content.imageUrl}
                                          alt="Preview"
                                          className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-primary-pri2"
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Preview */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vista Previa en Vivo</h2>
              <div className="bg-white dark:bg-primary-pri3 rounded-xl shadow-sm border border-gray-200 dark:border-primary-pri2 p-6 max-h-screen overflow-y-auto">
                {units.map(unit => (
                  <PreviewContent key={unit.id} unit={unit} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningUnitsManager;