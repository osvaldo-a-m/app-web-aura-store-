# 🏪 Sistema POS e Inventario para Tienda de Abarrotes

Sistema web completo de Punto de Venta (POS) e Inventario desarrollado con **Vanilla JavaScript**, HTML5 y CSS3. Incluye integración con scanner de códigos de barras, sincronización en tiempo real con Supabase, y catálogo público para clientes.

## ✨ Características

### 📊 Módulo POS/Administrador (`index.html`)
- **Interfaz de Venta Moderna**: Carrito lateral con total prominente y lista de productos
- **Scanner de Códigos de Barras**: Detección automática de entrada rápida (<50ms entre teclas)
- **Gestión de Inventario**: Alta, listado y actualización de productos
- **Búsqueda Inteligente**: Autocompletado de productos por nombre o código
- **Procesamiento de Ventas**: Actualización automática de stock al finalizar
- **Modo Offline**: Funciona sin internet usando localStorage

### 🛍️ Módulo Catálogo Público (`cliente.html`)
- **Diseño Mobile First**: Optimizado para móviles, tablets y desktop
- **Sincronización en Tiempo Real**: Los cambios se reflejan instantáneamente
- **Disponibilidad en Vivo**: Badges visuales de stock disponible/agotado
- **UI Moderna**: Animaciones suaves y diseño premium

### 🔧 Características Técnicas
- ✅ **100% Vanilla JavaScript** (ES6+) - Sin frameworks
- ✅ **Supabase Backend** - Base de datos en tiempo real
- ✅ **Sincronización Offline** - localStorage como fallback
- ✅ **Código Modular** - Arquitectura limpia y mantenible
- ✅ **Totalmente Comentado** - Documentación inline completa

## 📁 Estructura del Proyecto

```
pos-sistema/
├── index.html              # Módulo POS/Administrador
├── cliente.html            # Catálogo público
├── config.js               # Configuración central
├── css/
│   ├── main.css           # Sistema de diseño base
│   ├── pos.css            # Estilos del POS
│   └── cliente.css        # Estilos del catálogo
└── js/
    ├── supabase-client.js # Cliente Supabase
    ├── database.js        # Capa de abstracción de BD
    ├── barcode-scanner.js # Detector de scanner
    ├── pos.js             # Controlador del POS
    └── cliente.js         # Controlador del catálogo
```

## 🚀 Instalación y Configuración

### 1. Configurar Supabase

#### Crear Proyecto en Supabase
1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice (2-3 minutos)

#### Crear la Tabla de Productos
En el **SQL Editor** de Supabase, ejecuta:

```sql
-- Crear tabla de productos
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo_barras TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  precio NUMERIC(10, 2) NOT NULL CHECK (precio > 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsqueda rápida por código
CREATE INDEX idx_codigo_barras ON productos(codigo_barras);

-- Habilitar Row Level Security (RLS)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir lectura pública
CREATE POLICY "Permitir lectura pública"
  ON productos FOR SELECT
  USING (true);

-- Crear política para permitir escritura (ajustar según necesidades)
CREATE POLICY "Permitir escritura"
  ON productos FOR ALL
  USING (true);
```

#### Obtener Credenciales
1. Ve a **Settings** → **API**
2. Copia la **URL** del proyecto
3. Copia la **anon/public key**

### 2. Configurar el Sistema

Abre `config.js` y actualiza las credenciales:

```javascript
SUPABASE: {
  URL: 'https://tu-proyecto.supabase.co',  // Tu URL
  ANON_KEY: 'tu-anon-key-aqui',            // Tu API Key
  TABLE_NAME: 'productos'
}
```

### 3. Ejecutar el Sistema

#### Opción 1: Live Server (Recomendado)
Si usas VS Code:
1. Instala la extensión "Live Server"
2. Click derecho en `index.html` → "Open with Live Server"

#### Opción 2: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Abrir en navegador: http://localhost:8000
```

#### Opción 3: Node.js HTTP Server
```bash
npx http-server -p 8000
```

## 📖 Guía de Uso

### Módulo POS (index.html)

#### Agregar Productos al Inventario
1. Completa el formulario en la sección "Gestión de Inventario"
2. Click en "➕ Agregar Producto"
3. El producto aparecerá en la tabla y estará disponible para venta

#### Realizar una Venta
**Opción 1: Scanner de Códigos**
- Simplemente escanea el código de barras del producto
- Se agregará automáticamente al carrito

**Opción 2: Búsqueda Manual**
- Escribe el nombre del producto en el campo de búsqueda
- Click en el producto de las sugerencias
- Se agregará al carrito

#### Finalizar Venta
1. Verifica los productos en el carrito
2. Click en "✅ Finalizar Venta"
3. Confirma la venta
4. El stock se actualizará automáticamente

### Catálogo Público (cliente.html)

Simplemente abre `cliente.html` en un navegador. Los clientes verán:
- Todos los productos disponibles
- Precios actualizados
- Disponibilidad en tiempo real

## 🔍 Testing del Scanner

### Probar sin Hardware Físico

Abre la **Consola del Navegador** (F12) y ejecuta:

```javascript
// Simular un escaneo
BarcodeScanner.simulateScan('7501234567890');
```

### Probar con Scanner Real

1. Conecta un scanner USB (la mayoría emula teclado)
2. Asegúrate de que `index.html` esté abierto
3. Escanea un código de barras de un producto existente
4. Deberías ver el producto agregarse al carrito automáticamente

**Ajustar Sensibilidad:**
Si el scanner no se detecta correctamente, ajusta en `config.js`:

```javascript
SCANNER: {
  MAX_TIME_BETWEEN_CHARS: 50,  // Aumentar si es necesario (ej: 100)
  MIN_BARCODE_LENGTH: 3        // Ajustar según tus códigos
}
```

## 🌐 Modo Offline

El sistema funciona AUTOMÁTICAMENTE en modo offline:

- ✅ Si Supabase no está disponible, usa localStorage
- ✅ Los cambios se guardan localmente
- ✅ Al reconectar, sincroniza automáticamente
- ✅ Indicador visual de estado de conexión

## 🎨 Personalización

### Cambiar Colores

Edita las variables en `css/main.css`:

```css
:root {
  --color-primary: #2563eb;    /* Azul principal */
  --color-success: #16a34a;    /* Verde */
  --color-danger: #dc2626;     /* Rojo */
  /* ... más colores ... */
}
```

### Modificar Moneda

En `config.js`:

```javascript
UI: {
  CURRENCY: 'MXN',              // Código de moneda
  CURRENCY_LOCALE: 'es-MX'      // Locale para formato
}
```

## 🐛 Troubleshooting

### "Modo Offline" aunque Supabase esté configurado

**Causa:** Credenciales incorrectas o problemas de CORS

**Solución:**
1. Verifica que la URL y API Key sean correctas
2. Asegúrate de estar usando la **anon/public key**, NO la service_role
3. Revisa la consola del navegador para errores específicos

### El Scanner no Detecta Códigos

**Causa:** Tiempo entre caracteres muy estricto

**Solución:**
Aumenta `MAX_TIME_BETWEEN_CHARS` en `config.js`:
```javascript
MAX_TIME_BETWEEN_CHARS: 100  // En lugar de 50
```

### Los Cambios no se Sincronizan en Tiempo Real

**Causa:** RLS (Row Level Security) mal configurado

**Solución:**
Verifica las políticas en Supabase:
```sql
-- Ver políticas actuales
SELECT * FROM pg_policies WHERE tablename = 'productos';
```

## 📝 Notas Importantes

### Seguridad
⚠️ **Este sistema usa la API Key pública de Supabase**. Para producción:
- Implementa autenticación de usuarios
- Configura RLS (Row Level Security) apropiadamente
- No uses la `service_role` key en el frontend

### Imágenes de Productos

**✅ Soporte de Imágenes Totalmente Implementado**

El sistema incluye funcionalidad completa para imágenes de productos:

1. **Desde el POS (`index.html`)**:
   - Al agregar un producto, puedes seleccionar una imagen
   - Las imágenes se suben automáticamente a Supabase Storage
   - Formatos soportados: JPG, PNG, WebP, GIF
   - Tamaño máximo: 2 MB

2. **En el Catálogo Público (`cliente.html`)**:
   - Muestra fotos reales de los productos
   - Fallback automático a emojis si no hay foto
   - Carga lazy para mejor rendimiento

3. **Configuración Requerida**:
   - Ver [`GUIA-CONFIGURACION-COMPLETA.md`](./GUIA-CONFIGURACION-COMPLETA.md) para instrucciones paso a paso
   - Crear bucket `product-images` en Supabase Storage
   - Configurar políticas RLS (incluidas en `setup-storage.sql`)

### Lector de Códigos de Barras

**✅ Compatible con Scanners Inalámbricos 2.4GHz**

El sistema detecta automáticamente scanners USB:
- ✅ Plug and play (sin drivers)
- ✅ Funcionan como teclados virtuales
- ✅ Detección automática basada en velocidad de entrada

**Configuración**:
1. Conecta el receptor USB
2. Sincroniza el scanner (si es necesario)
3. Prueba en el POS escaneando un producto
4. Ver [`GUIA-CONFIGURACION-COMPLETA.md`](./GUIA-CONFIGURACION-COMPLETA.md) para solución de problemas

### Impresoras y Básculas
Como se solicitó, esta versión **NO incluye**:
- ❌ Integración con impresoras térmicas
- ❌ Soporte para básculas

## 🚀 Próximos Pasos

Ideas para expandir el sistema:
- 📊 Reportes de ventas y estadísticas
- 👥 Sistema de usuarios y roles
- 🖨️ Integración con impresora de tickets
- 📱 App móvil nativa
- 💳 Procesamiento de pagos
- 📷 Carga de imágenes de productos

## 📄 Licencia

Este proyecto fue desarrollado como sistema personalizado. Úsalo libremente para tus necesidades.

## 💬 Soporte

Para ayuda con Supabase: [https://supabase.com/docs](https://supabase.com/docs)

---

**Desarrollado con ❤️ usando Vanilla JavaScript**
