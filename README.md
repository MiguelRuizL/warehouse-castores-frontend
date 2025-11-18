# General

Proyecto frontend construido con React y Vite que simula la gestión de un almacén. Este proyecto consume la API REST del [backend de Spring Boot](https://github.com/MiguelRuizL/warehouse-castores-backend).

---

## Herramientas utilizadas:

* **Lenguaje:** JavaScript (ES6+)
* **Framework:** React (19.2.0)
* **Gestor:** Vite (5.1.0)
* **Runtime:** Node.js (22.20.0)
* **IDE:** Visual Studio Code (1.106.0)
* **Estilos:** TailwindCSS (4.1.17)
* **Componentes UI:** Flowbite React (4.0)

---

## Pasos para Correr la Aplicación
### 1. Requisitos Previos
* Tener instalado Node.js (versión 22.20.0 o superior).
* Tener el **backend de Spring Boot** ejecutándose localmente (o en un servidor) para que la API esté disponible.

### 2. Instalación y Ejecución
1.  Clonar el repositorio.
2.  Instalar las dependencias de Node con `npm install`
1.  Correr el servidor de desarrollo de Vite con `npm run dev`
2.  Abrir en el navegador  la URL `http://localhost:5173` (o la URL que indique Vite en terminal).

---

## Notas:
* Las variables de entorno (**.env**) ya están incluidas en el repositorio, no es necesario configurarlas.
* Este proyecto no se conecta directamente a una base de datos. El backend del que depende utiliza **SQL Server**.
* El servidor de backend por defecto corre en http://localhost:8080