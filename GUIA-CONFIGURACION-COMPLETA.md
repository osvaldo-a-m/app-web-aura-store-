# 📖 Guía de Configuración Completa del Sistema POS

Esta guía te ayudará a configurar todos los componentes necesarios para que tu sistema POS funcione al 100%.

## 📋 Tabla de Contenidos

1. [Configuración de Supabase Storage (Fotos de Productos)](#1-configuración-de-supabase-storage)
2. [Configuración del Lector de Códigos de Barras](#2-configuración-del-lector-de-códigos-de-barras)
3. [Verificación de Fotos en Catálogo del Cliente](#3-verificación-de-fotos-en-catálogo)

---

## 1. Configuración de Supabase Storage

### ✅ Paso 1: Crear el Bucket en Supabase

1. **Accede a tu proyecto en Supabase**
   - Ve a [https://supabase.com](https://supabase.com)
   - Inicia sesión y selecciona tu proyecto

2. **Navega a Storage**
   - En el menú lateral izquierdo, haz clic en **"Storage"**
   - Verás la lista de buckets existentes (o vacía si es la primera vez)

3. **Crear el Bucket**
   - Haz clic en el botón **"Create a new bucket"** (esquina superior derecha)
   - Completa el formulario:
     - **Name**: `product-images` (exactamente así, es importante)
     - **Public bucket**: ✅ **ACTIVADO** (muy importante para que las imágenes sean visibles)
     - **File size limit**: 2 MB (recomendado)
     - **Allowed MIME types**: `image/jpeg, image/png, image/webp` (opcional pero recomendado)
   - Haz clic en **"Create bucket"**

![Crear Bucket](https://i.imgur.com/example-create-bucket.png)

### ✅ Paso 2: Configurar Políticas de Acceso (RLS)

1. **Abrir SQL Editor**
   - En el menú lateral izquierdo, haz clic en **"SQL Editor"**
   - Haz clic en **"New query"**

2. **Ejecutar el Script de Políticas**
   - Abre el archivo [`setup-storage.sql`](./setup-storage.sql) de tu proyecto
   - Copia **SOLO las líneas 23-40** (las políticas CREATE POLICY)
   - Pega en el SQL Editor de Supabase
   - Haz clic en **"Run"** (esquina inferior derecha)

```sql
-- Permitir lectura pública de todas las imágenes
CREATE POLICY "Lectura pública de imágenes de productos"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Permitir subida pública de imágenes (para el sistema POS)
CREATE POLICY "Permitir subida de imágenes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Permitir actualización de imágenes
CREATE POLICY "Permitir actualización de imágenes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Permitir eliminación de imágenes
CREATE POLICY "Permitir eliminación de imágenes"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
```

3. **Verificar que se crearon correctamente**
   - Deberías ver un mensaje: "Success. No rows returned"
   - Si ves un error, revisa que el nombre del bucket sea exactamente `product-images`

### ✅ Paso 3: Agregar Columna `imagen_url` a la Tabla Productos

Si aún no tienes la columna `imagen_url` en tu tabla `productos`:

1. En el **SQL Editor**, ejecuta:

```sql
ALTER TABLE productos ADD COLUMN IF NOT EXISTS imagen_url TEXT;

COMMENT ON COLUMN productos.imagen_url IS 'URL de la imagen del producto almacenada en Supabase Storage';
```

### ✅ Paso 4: Verificar la Configuración

1. **Verificar Políticas**
   - En el SQL Editor, ejecuta:

```sql
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects';
```

   - Deberías ver 4 políticas listadas para el bucket `product-images`

2. **Probar Subida de Imagen**
   - Ve a `Storage` > `product-images` en Supabase
   - Haz clic en **"Upload file"**
   - Sube una imagen de prueba (cualquier .jpg o .png)
   - Si se sube correctamente, ¡todo funciona! 🎉

---

## 2. Configuración del Lector de Códigos de Barras

### 📡 Características del Scanner Inalámbrico 2.4GHz

Tu scanner inalámbrico 2.4GHz funciona como un **teclado virtual**, es decir:
- ✅ **No requiere drivers especiales** (plug and play)
- ✅ **Emula entrada de teclado** automáticamente
- ✅ El sistema POS lo detecta automáticamente

### ✅ Paso 1: Conectar el Receptor USB

1. **Desempaquetar el Scanner**
   - Saca el scanner y el **receptor USB** (dongle pequeño)
   - Asegúrate de tener pilas en el scanner (generalmente 2 AAA)

2. **Conectar el Receptor**
   - Conecta el **receptor USB** en un puerto USB libre de tu computadora
   - Windows detectará automáticamente el dispositivo
   - Espera 10-15 segundos para que se instale el driver genérico

3. **Sincronizar el Scanner** (si es necesario)
   - La mayoría de scanners ya vienen sincronizados
   - Si no funciona, busca el código de barras de "Pairing" en el manual
   - Escanea ese código para sincronizar con el receptor

### ✅ Paso 2: Probar el Scanner

1. **Prueba Básica en Notepad**
   - Abre el Bloc de Notas (Notepad) en Windows
   - Escanea cualquier código de barras
   - Deberías ver los números aparecer automáticamente
   - Si funciona aquí, ¡está listo para el POS!

2. **Configurar Ajustes del Scanner**
   - En el manual de tu scanner, busca los códigos de configuración:
     - **Agregar Enter al final**: Escanea el código "Add Suffix CR" (recomendado)
     - **Velocidad de transmisión**: Deja en modo "Fast" (predeterminado)

### ✅ Paso 3: Probar en el Sistema POS

1. **Abrir el POS**
   - Abre `index.html` en tu navegador
   - Asegúrate de que la página esté **enfocada** (click en cualquier parte)

2. **Escanear un Producto**
   - Escanea el código de barras de un producto que **ya esté en tu inventario**
   - El producto debería agregarse automáticamente al carrito
   - Verás una animación flash en el carrito

3. **Si No Funciona: Ajustar Sensibilidad**
   - Abre [`config.js`](./config.js)
   - Busca la sección `SCANNER`:

```javascript
SCANNER: {
    MAX_TIME_BETWEEN_CHARS: 50,  // Aumenta a 100 si no funciona
    MIN_BARCODE_LENGTH: 3,       // Ajusta según el largo de tus códigos
    ENTER_KEY: 'Enter'           // Tecla que envía el scanner al final
}
```

   - **Aumenta `MAX_TIME_BETWEEN_CHARS` a 100** si el scanner es lento
   - Guarda y recarga la página

### ✅ Paso 4: Simular Escaneo (Sin Scanner Físico)

Para probar el sistema sin un scanner real:

1. Abre la **Consola del Navegador** (F12)
2. Ejecuta:

```javascript
BarcodeScanner.simulateScan('7501234567890');
```

3. El sistema simulará un escaneo del código `7501234567890`

### 🔧 Solución de Problemas Comunes

| Problema | Solución |
|----------|----------|
| **El scanner no responde** | 1. Verifica las pilas<br>2. Re-conecta el receptor USB<br>3. Sincroniza el scanner (busca código de pairing en manual) |
| **Escanea pero el POS no detecta** | 1. Asegúrate de que `index.html` esté enfocado<br>2. Aumenta `MAX_TIME_BETWEEN_CHARS` en `config.js`<br>3. Verifica que el producto exista en inventario |
| **Agrega múltiples veces el mismo producto** | 1. Configura el scanner para NO agregar Enter al final<br>2. Escanea el código de "Remove Suffix" en el manual |
| **No funciona en Chrome/Edge** | Funciona en todos los navegadores modernos. Asegúrate de que la página esté enfocada. |

### 📝 Configuración Avanzada del Scanner

Busca estos códigos en el manual de tu scanner y escánealos para configurar:

- **🔊 Sonido de Confirmación**: Escanea "Beep On" (recomendado)
- **💡 LED de Confirmación**: Escanea "LED On" (recomendado)
- **⌨️ Agregar Enter**: Escanea "Add Suffix CR" (recomendado para el POS)
- **🌐 Layout del Teclado**: Escanea "USA/English" si tienes problemas con números

---

## 3. Verificación de Fotos en Catálogo

### ✅ Las Fotos YA Funcionan en el Cliente

**¡Buenas noticias!** 🎉 El catálogo del cliente (`cliente.html`) **ya está configurado** para mostrar las fotos de los productos.

### Cómo Funciona

1. **Sistema de Fallback Inteligente**
   - Si un producto tiene `imagen_url`, muestra la foto real
   - Si no tiene foto o falla la carga, muestra un emoji representativo
   - **No requiere modificaciones adicionales**

2. **Código Actual** (ya implementado en `cliente.js` líneas 98-101):

```javascript
const imagenHTML = producto.imagen_url
  ? `<img src="${producto.imagen_url}" alt="${producto.nombre}" class="producto-img" loading="lazy">`
  : `<span class="producto-imagen-emoji">${emoji}</span>`;
```

### ✅ Cómo Agregar Fotos a los Productos

1. **Desde el POS (index.html)**
   - Ve a la sección "Gestión de Inventario"
   - Completa el formulario de nuevo producto
   - Haz clic en **"Seleccionar Imagen"** (si está disponible el input)
   - Selecciona una foto desde tu computadora
   - Click en **"➕ Agregar Producto"**
   - La imagen se subirá automáticamente a Supabase Storage

2. **Formato de Imágenes Recomendado**
   - **Formato**: JPG, PNG o WebP
   - **Tamaño**: 500x500 px (cuadrado)
   - **Peso máximo**: 2 MB
   - **Optimización**: Comprime las imágenes antes de subirlas (usa [TinyPNG](https://tinypng.com))

3. **Verificar en el Catálogo**
   - Abre `cliente.html` en tu navegador
   - Deberías ver las fotos de los productos con imágenes
   - Los productos sin foto mostrarán emojis

### 🎨 Ejemplo de Visualización

**Producto CON foto:**
```
┌─────────────────┐
│  [Foto Real]    │
│  Coca-Cola 2L   │
│  $25.00         │
│  10 disponibles │
│  [🛒 Agregar]   │
└─────────────────┘
```

**Producto SIN foto:**
```
┌─────────────────┐
│      🥤         │
│  Coca-Cola 2L   │
│  $25.00         │
│  10 disponibles │
│  [🛒 Agregar]   │
└─────────────────┘
```

### ✅ Verificar que Todo Funciona

**Checklist Final:**

- [ ] Bucket `product-images` creado en Supabase
- [ ] Políticas RLS configuradas correctamente
- [ ] Columna `imagen_url` agregada a la tabla `productos`
- [ ] Scanner inalámbrico conectado y probado en Notepad
- [ ] Scanner probado en `index.html` y agrega productos al carrito
- [ ] Productos con fotos se visualizan correctamente en `cliente.html`
- [ ] Productos sin fotos muestran emojis en `cliente.html`

---

## 🆘 Soporte Adicional

Si tienes problemas con alguna configuración:

### Supabase Storage
- **Documentación oficial**: [https://supabase.com/docs/guides/storage](https://supabase.com/docs/guides/storage)
- **Políticas RLS**: [https://supabase.com/docs/guides/storage/security/access-control](https://supabase.com/docs/guides/storage/security/access-control)

### Scanner de Códigos de Barras
- **Consulta el manual** de tu modelo específico (generalmente incluye códigos de configuración)
- **Video tutorial genérico**: Busca "configurar scanner inalámbrico 2.4GHz" en YouTube

---

## 📝 Notas Finales

> **⚠️ Producción**: Las políticas actuales permiten acceso público al storage. Para un entorno de producción, considera implementar autenticación y restringir las operaciones de escritura.

> **💡 Optimización**: Comprime las imágenes antes de subirlas para mejorar el rendimiento del catálogo público.

> **🔒 Seguridad**: No uses la `service_role` key en el frontend, solo la `anon` key pública.

---

**¿Todo listo?** 🚀 

Tu sistema POS ahora tiene:
- ✅ Almacenamiento de fotos en Supabase
- ✅ Scanner de códigos de barras inalámbrico configurado
- ✅ Catálogo público mostrando fotos de productos

**¡Felices ventas! 🛒💰**
