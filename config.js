/**
 * Configuración central del sistema POS
 * ====================================
 * Este archivo contiene todas las configuraciones necesarias para el sistema.
 * Actualiza los valores de Supabase con tus credenciales una vez que las tengas.
 */

const CONFIG = {
    // ==========================================
    // CONFIGURACIÓN DE SUPABASE
    // ==========================================
    SUPABASE: {
        URL: 'https://magxctfjszuvfrcgpgiu.supabase.co',
        ANON_KEY: 'sb_publishable_nZQ_ehoaANMxD-L3LgoPQA_9314Xzqm',
        TABLE_NAME: 'productos'
    },

    // ==========================================
    // CONFIGURACIÓN DEL SCANNER DE CÓDIGOS
    // ==========================================
    SCANNER: {
        MAX_TIME_BETWEEN_CHARS: 50,
        BUFFER_CLEAR_TIMEOUT: 100,
        MIN_BARCODE_LENGTH: 3
    },

    // ==========================================
    // CONFIGURACIÓN DE ALMACENAMIENTO LOCAL
    // ==========================================
    STORAGE: {
        PRODUCTOS_KEY: 'pos_productos',
        PENDING_CHANGES_KEY: 'pos_pending_changes',
        LAST_SYNC_KEY: 'pos_last_sync',
        SYNC_RETRY_INTERVAL: 5 * 60 * 1000
    },

    // ==========================================
    // CONFIGURACIÓN DE LA INTERFAZ
    // ==========================================
    UI: {
        CURRENCY: 'MXN',
        CURRENCY_LOCALE: 'es-MX',
        CONFIRM_DELETE: '¿Estás seguro de eliminar este producto?',
        CONFIRM_SALE: '¿Finalizar la venta?',
        NOTIFICATION_DURATION: 3000,
        ANIMATION_DURATION: 300
    },

    // ==========================================
    // VALIDACIONES
    // ==========================================
    VALIDATION: {
        MAX_PRODUCT_NAME_LENGTH: 100,
        MAX_STOCK: 999999,
        MIN_PRICE: 0.01,
        MAX_PRICE: 999999.99
    },

    // ==========================================
    // CONFIGURACIÓN DE PEDIDOS
    // ==========================================
    PEDIDOS: {
        TABLA_PEDIDOS: 'pedidos',
        VENTAS_TABLE: 'ventas_diarias',
        TIEMPOS_LLEGADA: ['15 minutos', '30 minutos', '1 hora'],
        METODOS_PAGO: [
            { value: 'transferencia', label: 'Transferencia Bancaria' },
            { value: 'efectivo', label: 'Efectivo en tienda' }
        ]
    },

    // ==========================================
    // DATOS BANCARIOS
    // ==========================================
    BANCO: {
        NOMBRE: 'Banco Ejemplo',
        TITULAR: 'Nombre del Titular',
        CUENTA: '1234567890',
        CLABE: '012345678901234567'
    },

    // ==========================================
    // NOTIFICACIONES
    // ==========================================
    NOTIFICACIONES: {
        DURACION: 5000,
        SOUND_ENABLED: true
    },

    // ==========================================
    // CARRITO DE COMPRAS
    // ==========================================
    CARRITO: {
        STORAGE_KEY: 'aura_store_carrito',
        MAX_CANTIDAD_POR_PRODUCTO: 99
    },

    // ==========================================
    // AUTENTICACIÓN DE ADMIN
    // ==========================================
    ADMIN: {
        USERNAME: 'Oscar',
        PASSWORD: 'Aurora1251', // ⚠️ Cambiar en producción
        SESSION_KEY: 'aura_store_admin_session'
    },

    // ==========================================
    // CONFIGURACIÓN DE IMÁGENES
    // ==========================================
    IMAGES: {
        STORAGE_BUCKET: 'product-images',
        MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB en bytes
        ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
        ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        THUMBNAIL_SIZE: 200, // pixels
        DEFAULT_PLACEHOLDER: '🛒' // Emoji de fallback
    }
};

// Hacer disponible globalmente
window.CONFIG = CONFIG;
