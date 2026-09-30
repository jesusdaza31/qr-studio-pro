# QR Studio Pro - Generador de Códigos QR Personalizados

Aplicación web estática, moderna y 100% gratuita para crear códigos QR personalizados con logos, imágenes, frases, títulos y páginas web interactivas listas para desplegar en Vercel.

**Creado y desarrollado por Jesús Orozco**  
*Fecha: 30 de septiembre de 2026*

---

## Características Principales

1. **Nuevo Módulo "Página Web" con 3 Plantillas Interactivas (Enfoque Online & Gratuito)**:
   - Permite enlazar el código QR a una página web interactiva (`ver.html`) alojada de forma gratuita en Vercel (`https://tu-proyecto.vercel.app/ver.html`).
   - Al codificar solo un enlace corto, el código QR se mantiene ultra liviano (Versión 2/3 con módulos gigantes) para escanearse al instante (<0.1s) en cualquier celular.
   - **Template 1: Elegante & Editorial**: Diseño de lujo para eventos, aniversarios, invitaciones o dedicatorias de alta gama con tipografía serif y detalles dorados.
   - **Template 2: Sobre Interactivo 3D**: Experiencia tridimensional con sobre animado, sello de cera pulsante, apertura interactiva, lluvia de partículas flotantes y botón de reacción.
   - **Template 3: Tarjeta Digital & Redes**: Tarjeta de presentación personal o profesional con foto/avatar, mensaje de bienvenida y botones directos a WhatsApp e Instagram.
   - Botón directo para **"Abrir y Probar Plantilla en Vivo"**.

2. **Carga y Visualización de Imagen o Logo en el Centro**:
   - Corrección total del selector de archivos mediante zona táctil directa y soporte de arrastrar y soltar (Drag & Drop).
   - Renderizado persistente con Data URIs que previene la pérdida de la imagen en redibujados del canvas.
   - Selección de 15 logotipos vectoriales de marcas (WhatsApp, Instagram, TikTok, YouTube, Spotify, etc.) o fotos personales desde el dispositivo.
   - Marcos de logo en círculo, squircle suave (iOS) o cuadrado moderno con margen de seguridad.

3. **Diseño Moderno y Optimizado para PC y Celulares**:
   - Sin emojis: estilo minimalista y corporativo con iconos vectoriales SVG de alta definición.
   - Interfaz ancha para PC (hasta 1480px) con vista previa fija que acompaña la pantalla (`position: sticky`).
   - Pestañas fluidas en celulares para cambiar entre edición y descarga.

4. **Formatos de Exportación 100% Locales**:
   - **Documento PDF Imprimible**: Generador nativo PDF 1.4 sin librerías externas pesadas.
   - **Imagen HD (PNG)**: Descarga directa a 1000px+.
   - **Compartir Nativo**: Web Share API para enviar directo a WhatsApp o guardar en la galería.

---

## Cómo Desplegar Gratis en Vercel

1. Crea una cuenta gratuita en [Vercel](https://vercel.com).
2. Sube esta carpeta a tu cuenta de GitHub o arrástrala directamente con la CLI de Vercel (`vercel deploy`).
3. Vercel te dará una URL como `https://tu-proyecto.vercel.app`.
4. En el generador de QR, en la sección **Página Web**, pega tu URL de Vercel (o úsalo directamente desde la misma URL).
5. ¡Listo! Cualquier persona que escanee el código QR verá la hermosa página web con la dedicatoria o presentación que configuraste.
