# Rinosoft — Asistente administrativo responsable

**Proyecto integrador AI-901 · Opción B: continuidad de la fase 1**  
Autor: Jorge Augusto Perales Soberanes.  
Versión de la documentación: 1.0, 5 de noviembre de 2026.  
Entrega: viernes 6 de noviembre de 2026, 23:45, hora del centro de México (UTC-6).

## Acceso y prueba rápida

**Aplicación funcional: [Abrir Rinosoft](https://rinosoft-augusto-ai901.azurewebsites.net/).** No requiere cuenta del curso, acceso al portal de Azure ni instalación local.

1. Abrir el enlace en un navegador con JavaScript habilitado.
2. Elegir **Resumen** y pulsar **Usar un ejemplo**.
3. Pulsar **Preparar resumen**. Se obtiene una respuesta nueva del agente de Microsoft Foundry.
4. Contrastar la salida con el texto de entrada; marcar las comprobaciones de revisión si se realizaron.
5. Copiar el borrador o descargarlo como Markdown para corregirlo antes de utilizarlo.

También se pueden probar Correo, Procedimiento, Solicitudes, Agenda y Revisión. El primer acceso después de inactividad puede tardar más por el arranque del servicio. Si hay un límite temporal del modelo, conservar el texto y reintentar después.

**Última prueba pública completa: 05/11/2026 21:38, UTC-6.** Navegador Edge en un contexto nuevo sin sesión institucional: seis tareas respondieron HTTP 200, con tres consultas reales al agente. Se verificaron además revisión, descarga, bloqueo de una credencial ficticia y vista móvil de 390 × 844, sin desbordamiento horizontal. Estas pruebas son una muestra acotada, no una certificación de seguridad o accesibilidad.

Este es un piloto académico público. Utilizar los ejemplos incluidos o material ficticio; no introducir documentos confidenciales ni datos personales reales.

## Problema y continuidad de la fase 1

El caso Rinosoft plantea información administrativa principalmente en papel, uso básico de Office y necesidad de preparar documentos y personas antes de ampliar la IA. La fase 1 propone digitalización gradual, capacitación y tareas de bajo riesgo con revisión humana. La solución convierte esos ejercicios en una aplicación que un usuario puede abrir y utilizar directamente.

La app ayuda a preparar borradores, organizar información y revisar cifras; no digitaliza el archivo empresarial completo ni acredita capacitación o ahorros reales. Se eligió la opción B del integrador: implementar con Microsoft Foundry el proyecto de fase 1. El caso de pronóstico incluido como ejemplo de resumen en el PDF no se tomó como objetivo del proyecto.

La fase 1 utilizó Copilot en sus ejercicios. Esta implementación conserva el problema y los seis casos, usando Azure y Foundry como servicios de ejecución. No se conecta a Microsoft 365, Outlook, ERP, OneDrive o SharePoint.

## Requisitos de entrega y cobertura real

| Requisito del integrador | Evidencia y estado |
| --- | --- |
| Opción A o B; individual o equipo de hasta cuatro, con el mismo nivel de exigencia | Opción B, trabajo individual, continuidad de Rinosoft. |
| Prototipo funcional accesible como usuario normal | URL pública comprobada en navegador sin sesión de Azure; produce respuestas nuevas. |
| Funcionamiento con Azure y herramientas de Azure | Azure Functions, Microsoft Foundry, Entra ID e infraestructura de Azure Storage. El código propio calcula métricas y prepara plantillas dentro de Azure. |
| Documento exclusivamente Markdown con explicación y capturas | Este archivo, con imágenes HTTPS públicas del prototipo y anexo de pruebas. El ZIP de código es respaldo, no sustituye el documento ni la aplicación. |
| Seis preguntas de IA responsable con evidencia propia | Matriz adaptada a Rinosoft más adelante; se declaran las brechas. |
| Cargas de IA mencionadas: generación, agentes, texto, voz, visión y extracción | Generación y agente disponibles; resumen y revisión de texto por el modelo. Extracción de texto de PDF digital con código. Voz, visión y OCR no implementados. No se presenta esa extracción como Document Intelligence ni como visión. |

La opción B está expresamente permitida. El PDF formula las preguntas responsables usando el caso Río Claro y no aporta una rúbrica alternativa detallada para B: se adaptaron al contexto de Rinosoft, sin suponer una exención de las cargas restantes ni garantizar una calificación.

## Preparación mínima de datos

Todos los ejemplos nuevos son ficticios y están identificados como tales. El Excel completo y el PDF de pronóstico de los ejercicios originales no se aportaron como fuentes independientes: no se reconstruyeron ni se presentaron como datos reales.

| Material de prueba | Preparación y control |
| --- | --- |
| RIN-DOC-001 · versión 1.0 | Texto ficticio: 20 documentos, 12 procesados, 8 pendientes; 4 de 6 participantes capacitados. Se mantienen responsables, fechas y presupuesto sin definir. |
| Propuesta de registro de solicitudes | Contexto ficticio con campos mínimos; responsables, tiempos, herramienta y aprobación pendientes. |
| CSV nuevo de solicitudes | Encabezados normalizados, folio y tiempo_dias; cinco valores: 2, 5, 1, 8 y 4 días. Se rechazan o excluyen valores no válidos de manera explícita. |
| Agenda | Cuatro temas ficticios; distribución calculada 8 + 8 + 7 + 7 = 30 minutos. |
| Revisión sensible | Solo nombres de categorías: datos de contacto, precios negociados, contraseñas y horarios publicados; no se introducen valores reales. |

Para un piloto empresarial, antes de cargar datos habría que inventariar documentos, asignar propietario y versión vigente, resolver copias contradictorias, clasificar sensibilidad y autorizar accesos. La app admite una fuente por consulta y no resuelve automáticamente conflictos entre repositorios.

## Casos implementados y resultados

| Caso | Método real | Criterio y resultado observado |
| --- | --- | --- |
| Correo de recepción | Plantilla controlada en el servidor | Asunto y cuerpo sin registro, revisión o promesas inventadas; cliente y firma ausentes quedan pendientes. No utiliza el modelo para esta tarea. |
| Resumen | Agente rinosoft-asistente en Foundry | Conservó 20/12/8 y 4/6, riesgos, pendientes y presupuesto no definido. La salida completa observada tiene 203 palabras. Se rechazan respuestas de más de 250 palabras, sin recortarlas silenciosamente. |
| Procedimiento | Agente de Foundry | Borrador con propósito, alcance, campos, pasos y pendientes; requiere seleccionar herramienta y responsables antes de adoptar. No es una política vigente. |
| Solicitudes | Cálculo con Decimal en el servidor | Cinco registros, suma 20.00 días, promedio 4.00 y máximo 8.00. Otra prueba con tres filas inválidas conservó dos válidas y promedio 3.00. No atribuye causas. |
| Agenda | Distribución calculada en el servidor | Cuatro temas, 8/8/7/7 minutos; total exactamente 30. Responsables y decisiones no autorizadas quedan pendientes. |
| Información sensible | Agente de Foundry y regla previa de credenciales | Recomendaciones por categoría, aviso de límites y revisión humana. La entrada de una credencial ficticia se bloqueó antes de enviarla al modelo. No es anonimización automática. |

Los tres casos generativos observados tardaron 5.5, 5.8 y 6.3 segundos respectivamente, medidos en el servidor. Son latencias de esa ejecución, no compromisos de servicio ni mediciones de ahorro de trabajo.

## Arquitectura y servicios justificados

Navegador del usuario → Azure Functions → reglas locales o agente de Microsoft Foundry. La identidad administrada del servidor obtiene acceso mediante Entra ID. Azure Blob Storage guarda el paquete de despliegue y un contador de uso compartido.

| Servicio | Configuración efectiva | Justificación |
| --- | --- | --- |
| Azure Functions | rinosoft-augusto-ai901; Flex Consumption FC1; Python 3.12; North Central US; sin instancias Always Ready | Publica interfaz y servidor en un enlace; consumo bajo demanda. Los planes F1/B1 y Y1 fueron rechazados por cuota cero; se eligió el plan que pudo aprovisionarse. |
| Microsoft Foundry | Proyecto peralesj93-ia-2455; agente rinosoft-asistente; implementación gpt-4.1-mini, Global Standard | Genera resúmenes, procedimientos y recomendaciones de minimización. No usa búsqueda web ni conectores corporativos en esta app. |
| Entra ID e identidad administrada | Identidad id-rinosoft-web; permiso Foundry Agent Consumer al nivel del proyecto | Autentica al servidor sin publicar una clave del modelo en el navegador. No equivale a login individual de usuarios finales. |
| Azure Storage | strinosofta20b1105, Standard LRS; contenedores privados; HTTPS; acceso por identidad, claves compartidas deshabilitadas | Aloja despliegue y contador diario compartido con bloqueo para evitar actualizaciones simultáneas. No se usa como archivo de documentos del usuario. |

La app usa Flask mediante el adaptador WSGI de Azure Functions. Las dependencias de código abierto se ejecutan dentro de Azure; no se llama a otro proveedor de IA. No se entrenó ni ajustó un modelo nuevo. La app consulta el agente por nombre; cambios posteriores de su versión activa requieren repetir pruebas.

## Coste y control del piloto

La captura inicial de Azure for Students mostró USD 100 de crédito, vigencia de 365 días y coste mostrado de USD 0.00 en ese momento. No constituye una medición del consumo posterior ni implica que la solución sea gratuita.

El catálogo público de Microsoft consultado el 5 de noviembre muestra, para North Central US y los medidores de GPT 4.1 mini Global, **USD 0.0004 por 1 000 tokens de entrada** y **USD 0.0016 por 1 000 de salida**: equivalen a USD 0.40 y USD 1.60 por millón. Fuente: [Azure Retail Prices API, medidores seleccionados](https://prices.azure.com/api/retail/prices?%24filter=armRegionName%20eq%20%27northcentralus%27%20and%20%28meterName%20eq%20%27gpt%204.1%20mini%20Inp%20glbl%20Tokens%27%20or%20meterName%20eq%20%27gpt%204.1%20mini%20Outp%20glbl%20Tokens%27%29). Son tarifas de lista en USD; no sustituyen la facturación de la suscripción, impuestos o condiciones de la oferta.

Ejemplo de planificación, no consumo medido: 100 consultas de 3 000 tokens de entrada y 1 000 de salida cada una costarían aproximadamente **USD 0.28 por el modelo**, más Functions, almacenamiento y cualquier otro cargo aplicable. Las instrucciones del agente también consumen tokens. No hay tarifa de entrenamiento ni capacidad provisionada contratada por este prototipo.

[Functions Flex se factura por ejecución y recursos consumidos](https://azure.microsoft.com/en-us/pricing/details/functions/). Su página publica una franquicia mensual para consumo bajo demanda, cuya aplicabilidad depende de la oferta; no se presupone que todos los cargos queden cubiertos por ella. El almacenamiento y sus operaciones se facturan aparte. Objetivo operativo propuesto para la demostración: mantener el gasto adicional por debajo de USD 5 y revisar el costo antes de ampliar el uso; **no es un presupuesto técnico ni un tope configurado**.

La app limita intentos de consulta al agente a 100 diarios globales y 30 por IP, reiniciados en UTC. Solo guarda día, contadores e identificadores derivados de la IP mediante hash. Un proxy puede agrupar visitantes. Los límites de solicitudes o tokens por minuto no son límites monetarios; no hay alerta presupuestal configurada ni gasto final medido en esta entrega. Se recomienda revisar Cost Management antes de continuar el piloto y detener la app desde Azure si fuera necesario.

## Generar, revisar, corregir y decidir

El usuario aporta el contexto y la fuente. La app distingue **Agente de IA**, **Plantilla controlada**, **Cálculo verificable** y **Distribución calculada**. El aviso de revisión lo controla la interfaz, independientemente de lo que escriba el modelo.

Antes de usar una salida, la persona responsable contrasta hechos y cifras, revisa datos pendientes, tono y privacidad y marca las dos comprobaciones si las realizó. Puede cambiar la entrada y generar otra versión, o descargar el Markdown y corregirlo. La app no envía correos ni aprueba procedimientos. Las marcas se mantienen solo en la pestaña actual, se reinician con otra tarea y no son una aprobación corporativa auditada.

En el piloto académico, el autor revisa la configuración y las pruebas; el docente evalúa el prototipo. El responsable empresarial de aprobación continúa por designar: no se inventa un nombramiento ni se presenta al autor como autoridad de Rinosoft.

## IA responsable: respuestas con evidencia

| Principio y pregunta adaptada | Control y prueba real | Resultado y límite |
| --- | --- | --- |
| Equidad: ¿se trata de forma comparable a distintas áreas? | Dos resúmenes con los mismos 20/12/8 documentos, cambiando Administración por Operaciones. Mismas reglas y límites para ambas áreas. | Ambas conservaron cifras y ausencia de causas y presupuesto. Tras el ajuste, ambas indicaron riesgos no especificados. Persistió una diferencia: una propuso definir causas y presupuesto como pendientes; la otra no. Equidad evaluada parcialmente; hace falta una muestra más amplia y revisar inferencias. |
| Confiabilidad y seguridad: ¿qué pasa con material ilegible o incompleto? | PDF sin texto extraíble rechazado con aviso de OCR no disponible; CSV con datos ausentes, negativos y NaN; nombre y firma faltantes; instrucción incrustada. | No se inventó lectura de PDF. CSV informó tres exclusiones; correo dejó pendientes. Una regla acotada rechazó la instrucción incrustada antes del modelo. No es detección general de ataques ni OCR; puede rechazar ejemplos citados legítimos. |
| Privacidad y seguridad: ¿se minimizan datos y protegen accesos? | Ejemplos ficticios; bloqueo previo de algunos patrones de credenciales; Entra ID e identidad del servidor; almacenamiento privado; CSRF y verificación de origen. | Se bloqueó una credencial ficticia y solicitudes sin token de sesión. No hay login por usuario final, autorización corporativa, anonimización completa ni Key Vault. El secreto de sesión está en configuración del servidor. La app pública no es apta para nóminas o expedientes reales. |
| Inclusión: ¿se puede utilizar desde celular y por voz? | Vista móvil 390 × 844, controles etiquetados, navegación por teclado prevista y enlace para saltar al contenido. | La prueba móvil pasó sin desbordamiento horizontal. Voz no implementada; tampoco hay auditoría completa con lector de pantalla o prueba física de micrófono. No se presenta inclusión como completamente resuelta. |
| Transparencia: ¿se identifica IA y fuente? | Aviso fijo, método de procesamiento, nombre/versión de fuente y descarga Markdown. | Visible en las seis tareas. La fuente es la aportada por el usuario; no hay citas verificadas por frase, búsqueda documental ni garantía automática de fidelidad. |
| Rendición de cuentas: ¿quién revisa y aprueba? | Lista de revisión visible y pendientes de responsables en borradores; corrección y descarga. | Se probaron ambas marcas y su inclusión en la descarga. No hay aprobación durable ni autoridad empresarial asignada; el humano decide fuera de la automatización. |

Cada llamada de IA crea una conversación independiente. La app intenta eliminar los artefactos temporales creados para esa consulta al terminar. No persiste documentos o borradores en su almacenamiento propio, pero la retención del servicio de Foundry y el éxito de todas las eliminaciones no se han auditado. No se promete eliminación total de datos de la plataforma ni residencia en México: Global Standard puede procesar fuera de la región del recurso.

## Capturas reales de la aplicación publicada

Las imágenes siguientes se tomaron desde la URL pública. No son maquetas ni capturas del área de juegos de Foundry. Las imágenes se alojan mediante HTTPS para que el Markdown conserve evidencia aunque se entregue un solo archivo.

### 1. Correo con datos pendientes

Se observa el método de plantilla y un acuse sin prometer registro o contacto posterior.

![Correo de recepción con cliente y firma pendientes](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_01_correo.png)

### 2. Resumen conectado al agente

La fuente RIN-DOC-001 versión 1.0, sus cifras y datos ausentes pueden contrastarse con la salida y la lista de revisión.

![Resumen real de Microsoft Foundry con entrada, salida y revisión](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_02_resumen.png)

### 3. Procedimiento como propuesta

Los responsables y tiempos no suministrados permanecen pendientes; requiere aprobación antes de usarse.

![Borrador de procedimiento con pasos y responsables pendientes](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_03_procedimiento.png)

### 4. Cálculos sobre el CSV nuevo

El promedio 4.00 se calcula sobre cinco registros y suma 20.00; no se toma una cifra del ejemplo del PDF como resultado universal.

![Tabla CSV y estadísticas calculadas, promedio de cuatro días](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_04_analisis.png)

### 5. Agenda comprobable

Los tiempos 8, 8, 7 y 7 suman 30 minutos.

![Agenda de cuatro temas con duración total de treinta minutos](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_05_agenda.png)

### 6. Minimización por categorías

El ejemplo describe categorías y no valores reales; el agente explica límites y revisión humana.

![Revisión de categorías sensibles con advertencia de sus límites](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_06_sensible.png)

### 7. Control previo y celular

El rechazo se probó con un valor ficticio creado exclusivamente para la prueba. No se utilizó una contraseña real.

![Rechazo previo de una credencial ficticia](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_07_control.png)

![Vista de Rinosoft en ancho móvil con entrada, resultado y revisión](https://rinosoft-augusto-ai901.azurewebsites.net/static/evidencias/app_azure_08_movil.png)

## Validación e indicadores

| Indicador | Resultado observado |
| --- | --- |
| Casos de fase 1 evaluados en la app | Seis, de los cuales tres usan el agente. Supera el objetivo mínimo de tres casos evaluados de la fase 1. |
| Conectividad | Seis respuestas HTTP 200 en navegador nuevo; acceso público sin portal. |
| Cifras verificables | 20/5 = 4.00 días; otra tabla 6/2 = 3.00 tras tres exclusiones; agenda 30 minutos. |
| Controles locales automatizados | 15 pruebas aprobadas: plantillas, cifras, tiempos, aislamiento, credenciales, CSRF, archivos, longitud y errores controlados. No equivalen a 15 evaluaciones del modelo. |
| Interfaz | Sin errores JavaScript observados en la ejecución; descarga y revisión probadas; sin desbordamiento móvil de página. |
| Calidad del modelo | Ejemplos principales útiles como borradores; variación residual de interpretación en la prueba de áreas. Ningún porcentaje general de exactitud se deduce de esta muestra. |
| Ahorro empresarial, adopción y capacitación | No medidos en la empresa. Las cifras del ejemplo RIN-DOC-001 son ficticias y no son indicadores reales del proyecto. |
| Coste real acumulado | Pendiente de medición posterior en Azure; la estimación no sustituye el costo facturado. |

El [anexo de entradas y salidas verificadas](https://rinosoft-augusto-ai901.azurewebsites.net/static/Pruebas_app_Azure_Rinosoft.md) conserva los resultados de las pruebas públicas y sus observaciones. Las primeras respuestas de correo en Foundry habían inventado registro y compromisos; por eso se implementó una plantilla controlada en la app. También se detectó una respuesta de error vacía al probar una instrucción incrustada; tras añadir el control previo, la repetición devolvió HTTP 400 con explicación y sin llamada al modelo. No se concluye que todas las variantes estén cubiertas.

## Límites y trabajo pendiente

- Texto hasta 16 000 caracteres por consulta; archivos hasta 4 MB; PDF digital de hasta 10 páginas, TXT/MD/CSV UTF-8; CSV hasta 1 000 filas. Las entradas que exceden los límites se rechazan en lugar de recortarse silenciosamente.
- Sin voz, OCR, procesamiento de imágenes, extracción de facturas ni servicio independiente de Azure AI Language. No se realizaron pagos, envíos de correo o acciones sobre sistemas empresariales.
- Sin inventario empresarial completo, autenticación por persona, autorización por área, Key Vault, historial durable de revisiones ni aprobación corporativa.
- El detector básico de credenciales o instrucciones incrustadas puede omitir variantes o rechazar texto legítimo. El modelo puede interpretar de más y requiere contraste de fuente.
- La aplicación depende de red, disponibilidad de Azure, crédito, cuota y vigencia del modelo y las interfaces de Foundry utilizadas en vista previa. No hay garantía contractual de tiempo de respuesta.
- Prioridad antes de ampliar el uso: mejorar evidencia de voz e inclusión, evaluar OCR con documentos ficticios, definir acceso y retención, ampliar pruebas de equidad y medir coste. Esas funciones no se presentan como existentes en esta versión.

## Fuentes

- Proyecto_AI-901_Rio_Claro Final 1.pdf, pp. 1–2: opciones, condiciones, preguntas responsables y entrega.
- Fase 1 proyecto Augusto Perales.pdf, pp. 2–6, 7–21 y 23–24: problema, seis casos, revisión humana y evaluación del piloto.
- [Microsoft: configurar agentes de Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/configure-agent).
- [Microsoft: cliente de proyectos de Azure AI](https://learn.microsoft.com/en-us/python/api/azure-ai-projects/azure.ai.projects.aiprojectclient).
- [Microsoft: Functions Flex Consumption](https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan).
- [Microsoft: Flask en Azure Functions](https://learn.microsoft.com/en-us/samples/azure-samples/flask-app-on-azure-functions/azure-functions-python-create-flask-app/).
- [Microsoft: precios de Functions](https://azure.microsoft.com/en-us/pricing/details/functions/) y [precios de Azure OpenAI](https://azure.microsoft.com/es-mx/pricing/details/azure-openai/).

Las pruebas y capturas documentan esta versión y este momento. La entrega exige mantener los recursos y el enlace disponibles durante la revisión del docente.
