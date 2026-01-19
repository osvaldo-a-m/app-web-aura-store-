# 📊 Guía de Configuración de Base de Datos - Supabase

Esta guía te llevará paso a paso a través de la configuración completa de la base de datos para el sistema POS con el módulo de pedidos de clientes.

---

## 📋 Tabla de Contenidos

1. [Crear Cuenta y Proyecto en Supabase](#1-crear-cuenta-y-proyecto-en-supabase)
2. [Configurar las Tablas de la Base de Datos](#2-configurar-las-tablas-de-la-base-de-datos)
3. [Obtener las Credenciales](#3-obtener-las-credenciales)
4. [Configurar el Sistema](#4-configurar-el-sistema)
5. [Verificar la Instalación](#5-verificar-la-instalación)
6. [Solución de Problemas](#6-solución-de-problemas)

---

## 1. Crear Cuenta y Proyecto en Supabase

### Paso 1.1: Registrarse en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Puedes registrarte con:
   - GitHub (recomendado)
   - Google
   - Email

### Paso 1.2: Crear un Nuevo Proyecto

1. Una vez dentro, haz clic en **"New Project"**
2. Llena los datos del proyecto:
   - **Name**: `pos-sistema` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (¡guárdala!)
   - **Region**: Selecciona la región más cercana a tu ubicación (ej: `South America (São Paulo)`)
   - **Pricing Plan**: Selecciona **"Free"** para empezar

3. Haz clic en **"Create new project"**
4. ⏱️ **Espera 2-3 minutos** mientras Supabase configura tu proyecto

---

## 2. Configurar las Tablas de la Base de Datos

### Paso 2.1: Abrir el SQL Editor

1. En el panel lateral izquierdo, busca y haz clic en **"SQL Editor"**
2. Haz clic en **"New query"** para abrir un nuevo editor

### Paso 2.2: Copiar y Ejecutar el Script SQL

1. Abre el archivo `setup-database.sql` que se encuentra en la raíz de tu proyecto
2. **Copia TODO el contenido** del archivo
3. **Pega** el contenido en el SQL Editor de Supabase
4. Haz clic en el botón **"Run"** (▶️) en la esquina inferior derecha

> **✅ Si sale bien:** Verás un mensaje de "Success. No rows returned"  
> **❌ Si hay error:** Lee el mensaje de error y verifica que copiaste todo el script correctamente

### Paso 2.3: Verificar que las Tablas se Crearon

1. En el panel lateral, haz clic en **"Table Editor"**
2. Deberías ver **3 tablas nuevas**:
   - ✅ `productos` (ya existía)
   - ✅ `pedidos` (nueva)
   - ✅ `ventas_diarias` (nueva)

3. Haz clic en cada tabla para ver su estructura

---

## 3. Obtener las Credenciales

### Paso 3.1: Ir a Settings > API

1. En el panel lateral, haz clic en el ícono de **⚙️ Settings**
2. En el menú de Settings, selecciona **"API"**

### Paso 3.2: Copiar las Credenciales

Necesitas copiar **2 valores importantes**:

#### A) Project URL
- Busca la sección **"Project URL"**
- Copia el valor que se ve así: `https://xxxxxxxxxxxxx.supabase.co`
- 📝 Guárdalo en un lugar seguro

#### B) API Key (anon/public)
- Busca la sección **"Project API keys"**
- Encuentra la clave llamada **"anon" "public"**
- Haz clic en el ícono de 👁️ para revelar la clave
- Copia el valor completo (es una cadena muy larga)
- 📝 Guárdalo en un lugar seguro

> ⚠️ **IMPORTANTE:** 
> - Usa la clave **"anon"** o **"public"**, NO la "service_role"
> - La clave service_role es para el backend y nunca debe usarse en el frontend

---

## 4. Configurar el Sistema

### Paso 4.1: Abrir config.js

1. En tu proyecto, abre el archivo `config.js`
2. Busca la sección que dice `SUPABASE:`

### Paso 4.2: Actualizar las Credenciales

Reemplaza los valores de ejemplo con tus credenciales reales:

**ANTES:**
```javascript
SUPABASE: {
    URL: 'TU_SUPABASE_URL_AQUI',
    ANON_KEY: 'TU_SUPABASE_ANON_KEY_AQUI',
    TABLE_NAME: 'productos'
},
```

**DESPUÉS:**
```javascript
SUPABASE: {
    URL: 'https://xxxxxxxxxxxxx.supabase.co',  // ← Tu URL aquí
    ANON_KEY: 'eyJhbGc....(tu clave larga)',     // ← Tu API Key aquí
    TABLE_NAME: 'productos'
},
```

### Paso 4.3: Configurar Datos Bancarios (Opcional)

Si quieres recibir transferencias, actualiza esta sección:

```javascript
BANCO: {
    NOMBRE: 'Banco BBVA',                    // ← Nombre de tu banco
    TITULAR: 'Tu Nombre Completo',           // ← Tu nombre
    CUENTA: '0123456789',                     // ← Tu número de cuenta
    CLABE: '012345678901234567'               // ← Tu CLABE interbancaria
},
```

### Paso 4.4: Guardar los Cambios

- Guarda el archivo `config.js` (Ctrl+S o Cmd+S)

---

## 5. Verificar la Instalación

### Prueba 1: Verificar Conexión

1. Abre `index.html` en tu navegador (POS Admin)
2. Mira la esquina superior derecha
3. Deberías ver **"En línea"** con un punto verde ✅

### Prueba 2: Agregar un Producto de Prueba

1. En la sección "Gestión de Inventario", llena el formulario:
   - **Nombre**: Coca Cola 600ml
   - **Código de Barras**: 7501234567890
   - **Precio**: 15.00
   - **Stock**: 10

2. Haz clic en **"Agregar Producto"**
3. El producto debería aparecer en la tabla de abajo

### Prueba 3: Verificar en Supabase

1. Ve a Supabase → **Table Editor** → **productos**
2. Deberías ver el producto que acabas de agregar
3. ✅ Si lo ves, ¡la conexión funciona perfectamente!

### Prueba 4: Probar el Catálogo de Cliente

1. Abre `cliente.html` en tu navegador
2. Deberías ver el producto "Coca Cola 600ml"
3. Haz clic en **"🛒 Agregar"**
4. Haz clic en el botón flotante del carrito
5. Llena el formulario de pedido y envía
6. Ve a `index.html` (POS Admin)
7. ✅ Deberías ver el pedido en "Pedidos Pendientes"

---

## 6. Solución de Problemas

### ❌ Problema: "Modo Offline" aunque configuré las credenciales

**Causas posibles:**
1. URL o API Key incorrectas
2. Espacios extra al copiar/pegar
3. Usando la `service_role` key en lugar de `anon`

**Solución:**
1. Verifica que no haya espacios antes/después de las credenciales
2. Asegúrate de estar usando la clave **"anon"** o **"public"**
3. Revisa la consola del navegador (F12) para ver el error específico
4. Vuelve a copiar las credenciales directamente desde Supabase

---

### ❌ Problema: Error al ejecutar el script SQL

**Causas posibles:**
1. No se copió todo el script
2. Ya existían tablas con el mismo nombre

**Solución:**
1. Borra las tablas existentes (si es seguro hacerlo):
   ```sql
   DROP TABLE IF EXISTS ventas_diarias;
   DROP TABLE IF EXISTS pedidos;
   ```
2. Vuelve a ejecutar el script completo

---

### ❌ Problema: "No rows returned" al consultar tablas vacías

**Esto NO es un error:**
- Es normal al crear las tablas por primera vez
- Simplemente significa que las tablas están vacías
- Empieza a agregar productos y todo funcionará

---

### ❌ Problema: Los pedidos no aparecen en tiempo real

**Causas posibles:**
1. Las políticas RLS no se configuraron correctamente
2. Realtime no está habilitado

**Solución:**
1. Ve a **Table Editor** → **pedidos** → ⚙️ Settings
2. Asegúrate de que **"Enable Realtime"** esté activo
3. Verifica que las políticas RLS estén creadas:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'pedidos';
   ```

---

## 📊 Estructura de las Tablas

### Tabla: `productos`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| codigo_barras | TEXT | Código de barras del producto |
| nombre | TEXT | Nombre del producto |
| precio | NUMERIC | Precio de venta |
| stock | INTEGER | Cantidad en inventario |
| created_at | TIMESTAMP | Fecha de creación |

### Tabla: `pedidos`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| created_at | TIMESTAMP | Fecha del pedido |
| cliente | TEXT | Nombre del cliente |
| productos | JSONB | Productos ordenados (JSON) |
| total | NUMERIC | Total del pedido |
| metodo_pago | TEXT | 'transferencia' o 'efectivo' |
| tiempo_llegada | TEXT | Tiempo estimado de llegada |
| estado | TEXT | 'pendiente', 'completado', 'cancelado' |

### Tabla: `ventas_diarias`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| created_at | TIMESTAMP | Fecha de la venta |
| pedido_id | UUID | Referencia al pedido (opcional) |
| total | NUMERIC | Total de la venta |
| metodo_pago | TEXT | Método de pago utilizado |
| productos | JSONB | Productos vendidos (JSON) |

---

## 🔒 Seguridad - Notas Importantes

> ⚠️ **Para Producción:**
> 
> Las políticas RLS actuales permiten acceso público para facilitar el desarrollo.
> 
> **Antes de lanzar a producción, debes:**
> 1. Implementar autenticación de usuarios
> 2. Crear roles (cliente, admin, cajero)
> 3. Actualizar las políticas RLS para restringir acceso
> 4. Proteger las operaciones críticas (confirmar pedidos, modificar inventario)

---

## 🆘 ¿Necesitas Ayuda?

Si sigues teniendo problemas:

1. **Verifica la consola del navegador** (F12 → Console)
2. **Revisa los logs de Supabase** (Logs en el panel lateral)
3. **Consulta la documentación oficial**: [https://supabase.com/docs](https://supabase.com/docs)

---

## ✅ Checklist Final

Antes de considerar la configuración completa, verifica:

- [ ] Proyecto creado en Supabase
- [ ] Script SQL ejecutado sin errores
- [ ] 3 tablas visibles en Table Editor (productos, pedidos, ventas_diarias)
- [ ] Credenciales copiadas (URL y anon key)
- [ ] `config.js` actualizado con las credenciales
- [ ] `index.html` muestra "En línea" con punto verde
- [ ] Puedes agregar productos desde el POS
- [ ] Los productos aparecen en `cliente.html`
- [ ] Puedes crear pedidos desde el catálogo
- [ ] Los pedidos aparecen en tiempo real en el POS

---

**¡Listo! Tu base de datos Supabase está completamente configurada y funcionando.** 🎉

Ahora puedes empezar a usar el sistema POS con el módulo de pedidos de clientes.
