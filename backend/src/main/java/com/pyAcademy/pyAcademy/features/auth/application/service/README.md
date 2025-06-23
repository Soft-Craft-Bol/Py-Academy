NOMBRE DE CARPETA FEATURE: Auth Application Service

DESCRIPCIÓN: Este feature proporciona una integración con el servicio Cloudinary para permitir la carga y eliminación de archivos multimedia desde la aplicación Spring Boot.

PROPÓSITO

Facilitar el manejo de archivos multimedia como imágenes de perfil o recursos visuales en la nube, evitando el almacenamiento local y aprovechando la infraestructura optimizada de Cloudinary. Este servicio abstrae la lógica de conversión y operaciones básicas como subir y eliminar archivos.

DEPENDENCIAS
cloudinary (librería Java de Cloudinary)
Spring Boot (@Service, @Value, MultipartFile)
Archivo de propiedades application.properties o application.yml con las credenciales de Cloudinary y el nombre de la carpeta de carga:
cloudinary.cloud_name=your_cloud_name
cloudinary.api_key=your_api_key
cloudinary.api_secret=your_api_secret
cloudinary.upload_folder=your_folder_name

ESTRUCTURA INTERNA

```features
auth/
└── application/
    └── service/
        ├── CloudinaryService.java

EJEMPLO DE USO
DELETE /api/profile/delete?url=https://res.cloudinary.com/tu-nube/image/upload/v1234567890/folder/imagen.jpg
