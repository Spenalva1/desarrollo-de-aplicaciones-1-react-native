# Gestor de Usuarios

App de React Native para gestión de usuarios con Redux Toolkit.

## Características

- ✅ Lista de usuarios con avatar, nombre completo y email
- ✅ Infinite scroll con paginación (20 usuarios por página)
- ✅ Crear nuevos usuarios con formulario completo
- ✅ Estado global con Redux Toolkit
- ✅ Manejo de estados: loading, succeeded, failed
- ✅ Headers nativos de React Navigation
- ✅ Diseño Material Design

## Estructura del Proyecto

```
gestor-de-usuarios/
├── App.tsx                         # Configuración principal
├── src/
│   ├── features/
│   │   └── users/
│   │       └── usersSlice.js      # Redux slice con thunks
│   ├── screens/
│   │   ├── HomeScreen.js          # Pantalla principal con lista
│   │   └── CreateUserScreen.js   # Formulario de creación
│   └── store/
│       └── store.js               # Configuración del store
├── assets/                         # Imágenes de la app
├── app.json                        # Configuración de Expo
└── package.json                    # Dependencias
```

## API Endpoints

- **GET Usuarios**: `https://reqres.in/api/users?page={page}&per_page=20`
- **POST Usuario**: `https://reqres.in/api/register`
- **API Key**: `reqres-free-v1`

## Instalación

```bash
cd gestor-de-usuarios
npm install
npm start
```

## Tecnologías

- React Native con Expo
- Redux Toolkit para estado global
- React Navigation para navegación
- Reqres.in como API de prueba

