
# Proyecto CNMH Prototipo - Backend

Este es el backend del proyecto **CNMH Prototipo**, que forma parte de una aplicación desarrollada para el Centro Nacional de Memoria Histórica de Colombia. Este backend maneja las operaciones de la API, la integración con bases de datos, y otros servicios relacionados.

## Instalación

Para instalar las dependencias del proyecto, primero asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados. Luego, ejecuta:

```bash
npm install
```

### Variables de Entorno

El proyecto utiliza un archivo `.env` para configurar las variables de entorno. Asegúrate de tener un archivo `.env` con las siguientes variables:

```
DB_HOST=<tu_host_de_base_de_datos>
DB_USER=<tu_usuario_de_base_de_datos>
DB_PASSWORD=<tu_contraseña_de_base_de_datos>
DB_NAME=<nombre_de_tu_base_de_datos>
IPFS_API_KEY=<tu_clave_de_IPFS>
```

## Estructura del Proyecto

- **`index.js`**: Archivo principal de entrada para el servidor.
- **`package.json`**: Definición de dependencias y scripts del proyecto.
- **`.env`**: Archivo de configuración de variables de entorno.
- **`src/`**: Carpeta principal que contiene la lógica del backend:
  - **`db.js`**: Configuración y conexión a la base de datos.
  - **`app.js`**: Configuración de la aplicación con Express.
  - **`models/`**: Modelos de datos utilizados en la base de datos.
  - **`controllers/`**: Controladores que manejan la lógica de negocio.
  - **`routes/`**: Rutas definidas para diferentes recursos de la API.
  - **`common/`**: Funciones comunes y utilidades, como la integración con IPFS.
  - **`csv/`**: Archivos CSV y PDF relacionados con datos municipales y otros.

## Uso

Para ejecutar el servidor, utiliza el siguiente comando:

```bash
npm start
```

El servidor se ejecutará en el puerto definido en las variables de entorno o en el puerto 3000 por defecto.

### Rutas Principales

El backend define varias rutas para gestionar diferentes recursos. Algunas de las rutas principales incluyen:

- **GET** `/api/regions`: Obtiene la lista de regiones.
- **POST** `/api/exhibiciones`: Crea una nueva exhibición.
- **GET** `/api/lugares`: Obtiene la lista de lugares de memoria.

Revisa la carpeta `routes/` para ver todas las rutas disponibles.

## Modelos y Controladores

El proyecto utiliza modelos Sequelize para interactuar con la base de datos. Los modelos se encuentran en la carpeta `models/` y representan las diferentes entidades de la aplicación, como `sliders`, `regions`, `lugares`, etc.

Los controladores en la carpeta `controllers/` gestionan la lógica de negocio y responden a las solicitudes de las rutas.

## Integración con IPFS

El proyecto integra IPFS para la gestión de archivos descentralizados. Esta integración se maneja a través del archivo `pinFileToIPFS.js` en la carpeta `common/`.

## Contribuciones

Si deseas contribuir a este proyecto, por favor crea un fork y realiza un pull request con tus mejoras o soluciones a problemas.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, revisa el archivo `LICENSE`.
