# Guía operativa GSC / GBP — SPEC 11

Pasos manuales del dueño del negocio. El código del spec ya está implementado;
esta guía completa la parte que ningún commit puede hacer: pedirle a Google que
rastree e indexe, y alinear el Perfil de Empresa (GBP) con la web.

> Nota: el baseline PageSpeed "antes" no pudo registrarse con la API pública
> (cuota diaria excedida el 2026-10-12). Regístralo a mano con los pasos de la
> sección 1 antes de desplegar este spec.

## NAP canónico (idéntico en web y GBP)

- Nombre: `NOVACAD`
- Dirección: `Cerezo 77A, Boulevares Impala, 55040 Ecatepec de Morelos, Méx.`
- Teléfono: `+52 56 6268 2487`
- Horario: lunes a viernes, 9:00–18:00 (sábados y domingos cerrado)
- Web: `https://novacad.com.mx/`

## 1. Baseline PageSpeed / CWV (antes y después)

1. Abre `https://pagespeed.web.dev/` e ingresa `https://novacad.com.mx/`.
2. Anota los valores de móvil y escritorio en la tabla.
3. Repite **después** de desplegar este spec y compara.

| Métrica | Móvil antes | Móvil después | Escritorio antes | Escritorio después |
|---|---|---|---|---|
| Performance | | | | |
| SEO | | | | |
| LCP | | | | |
| CLS | | | | |
| INP / TBT | | | | |

## 2. Solicitud de indexación en Search Console (en este orden)

En `https://search.google.com/search-console` → Inspección de URLs, una por una:

1. `https://novacad.com.mx/`
2. `https://novacad.com.mx/servicios/zirconia`
3. `https://novacad.com.mx/servicios/e-max`
4. `https://novacad.com.mx/servicios/diseno-de-sonrisa`
5. `https://novacad.com.mx/videos`

En cada una: clic en **Solicitar indexación**. Expectativa: Google tarda de
4 a 12 semanas en indexar todo aunque el código esté perfecto; que GSC marque
cada solicitud como recibida es la verificación de este paso.

## 3. Verificación en Rich Results Test

En `https://search.google.com/test/rich-results`, probar:

- `https://novacad.com.mx/` → debe validar `Organization` y `FAQPage` sin errores.
- Una ficha de servicio (p. ej. `/servicios/zirconia`) → `BreadcrumbList` + `Service`.
- Una página de video (p. ej. `/videos/procedimiento-1`) → `VideoObject`.

## 4. Checklist del Perfil de Empresa (GBP)

- [ ] Nombre, dirección y teléfono idénticos al NAP canónico de arriba.
- [ ] Horario: lun–vie 9:00–18:00; sábado y domingo marcado como cerrado.
- [ ] Sitio web enlazado: `https://novacad.com.mx/`.
- [ ] Categorías y servicios dados de alta, cada servicio con enlace a su
      ficha (`/servicios/zirconia`, `/servicios/e-max`, etc.).
- [ ] Fotos recientes del laboratorio y de trabajos.
- [ ] Conseguir de 5 a 10 reseñas de odontólogos clientes y responderlas.
- [ ] Publicar novedades cada 1–2 semanas (casos, materiales, tiempos).

## 5. Keywords base (medir posición cada 2 semanas)

| # | Keyword | Posición inicial | Fecha |
|---|---|---|---|
| 1 | laboratorio dental Ecatepec | | |
| 2 | prótesis de zirconia CDMX | | |
| 3 | prótesis E-max Estado de México | | |
| 4 | diseño de sonrisa Ecatepec | | |
| 5 | guardas oclusales laboratorio dental | | |
