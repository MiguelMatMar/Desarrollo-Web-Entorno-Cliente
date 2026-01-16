# Proyecto: Lector de Archivos del Usuario

## Descripción

Esta página permite al usuario seleccionar uno o varios archivos de su computadora y visualizar su contenido en la página web. Solo se aceptan archivos con extensión `.csv`, `.txt` y `.lst`.

El proyecto utiliza **JavaScript puro** y la **API FileReader** para leer archivos locales de manera segura.

---

## Paso a paso

### 1. Estructura HTML

- Se define un `<input type="file" id="myfile" multiple>` para permitir selección de archivos múltiples.
- Se incluye un `<script>` que contiene la lógica de manejo de archivos.
- Se incluye un `<link>` al CSS para dar estilo a la página.

### 2. Inicialización de listeners

```js
document.addEventListener('DOMContentLoaded', iniciaListeners);
