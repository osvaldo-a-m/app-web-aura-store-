# 🚀 Inicio Rápido - Sistema POS

## ✅ Checklist de Configuración

### 1. Configuración de Supabase

- [ ] Proyecto creado en [Supabase](https://supabase.com)
- [ ] Tabla `productos` creada (ejecuta `setup-database.sql`)
- [ ] Tabla `pedidos` creada (incluida en `setup-database.sql`)
- [ ] Bucket `product-images` creado en Storage
- [ ] Políticas RLS configuradas (ejecuta `setup-storage.sql`)
- [ ] Credenciales copiadas a `config.js`

### 2. Configuración del Sistema

- [ ] Archivo `config.js` actualizado con:
  - URL de Supabase
  - API Key (anon/public)
  - Datos bancarios para transferencias

### 3. Hardware y Accesorios

- [ ] **Lector de Barras Inalámbrico 2.4GHz**
  - [ ] Receptor USB conectado a la PC
  - [ ] Scanner sincronizado con el receptor
  - [ ] Probado en Notepad (debe escribir números)
  - [ ] Configurado para agregar Enter al final (recomendado)
  - [ ] Probado en el POS y detecta productos correctamente

### 4. Pruebas del Sistema

- [ ] Agregar producto de prueba desde el POS
- [ ] Subir foto de prueba a un producto
- [ ] Escanear código de barras (simulado o real)
- [ ] Verificar que el producto aparece en catálogo público
- [ ] Verificar que la foto se muestra correctamente en `cliente.html`
- [ ] Hacer un pedido de prueba desde `cliente.html`
- [ ] Confirmar entrega del pedido desde el POS

---

## 📖 Guías Detalladas

### Configuración Completa
👉 **[GUIA-CONFIGURACION-COMPLETA.md](./GUIA-CONFIGURACION-COMPLETA.md)**

Esta guía incluye:
- ✅ Configuración paso a paso de Supabase Storage
- ✅ Configuración detallada del lector de barras inalámbrico
- ✅ Solución de problemas comunes
- ✅ Verificación de fotos en el catálogo

### Configuración de Base de Datos
👉 **[SUPABASE-SETUP.md](./SUPABASE-SETUP.md)**

### Scripts SQL
- **`setup-database.sql`**: Crea tablas de productos, pedidos y ventas
- **`setup-storage.sql`**: Configura Storage y políticas RLS para fotos

---

## 🎯 Flujo de Trabajo Recomendado

### Para Empezar:

1. **Lee primero**: [`GUIA-CONFIGURACION-COMPLETA.md`](./GUIA-CONFIGURACION-COMPLETA.md)
2. **Configura**: Supabase según la guía
3. **Prueba**: Scanner de códigos de barras
4. **Verifica**: Subida y visualización de fotos
5. **¡Listo!**: Empieza a usar el sistema

---

## 🆘 Problemas Comunes

### "Modo Offline" aunque Supabase esté configurado
➡️ Verifica las credenciales en `config.js`

### Scanner no detecta códigos
➡️ Aumenta `MAX_TIME_BETWEEN_CHARS` en `config.js` a 100ms

### Fotos no se suben
➡️ Verifica que el bucket `product-images` sea público

### Fotos no se ven en cliente.html
➡️ Verifica las políticas RLS en Supabase Storage

---

## 💡 Tips Útiles

- **Comprime las imágenes** antes de subirlas (usa [TinyPNG](https://tinypng.com))
- **Usa códigos de barras de 13 dígitos** (EAN-13) para productos comerciales
- **Prueba el scanner** en Notepad antes de usarlo en el POS
- **Haz backups** de la base de datos regularmente desde Supabase

---

## 📞 Soporte

- **Documentación Supabase**: [https://supabase.com/docs](https://supabase.com/docs)
- **README Principal**: [`README.md`](./README.md)

---

**¡Todo listo! 🎉 Comienza a vender con tu nuevo sistema POS.**
