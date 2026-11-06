# Rinosoft — Asistente administrativo responsable

Proyecto integrador **AI-901**, opción B: implementación en Azure del proyecto de la fase 1. Autor: **Jorge Augusto Perales Soberanes**.

**[Abrir la aplicación en Azure](https://rinosoft-augusto-ai901.azurewebsites.net/)** · [Documentación del proyecto](docs/Documentacion_AI901_Rinosoft.md) · [Resultados de pruebas](docs/Pruebas_app_Azure_Rinosoft.md)

La incorporación de inteligencia artificial a una organización requiere considerar la calidad de su información y la forma en que las personas revisarán los resultados. El caso Rinosoft, desarrollado en la fase 1, plantea una operación administrativa con información principalmente en papel y un uso básico de herramientas de Office. Ante esa situación, este proyecto propone una adopción gradual: organizar el contexto disponible, apoyar tareas de bajo riesgo y conservar la revisión humana antes de utilizar cada salida. El propósito del prototipo es demostrar ese flujo mediante una aplicación funcional que el docente pueda abrir, probar y contrastar con la evidencia presentada.

La solución ayuda a preparar borradores administrativos y revisar información con supervisión humana. Está publicada en **Azure Functions Flex Consumption** y utiliza un agente de **Microsoft Foundry** para tres tareas: resumir documentos, proponer procedimientos y orientar la revisión de información sensible. Otras tres funciones emplean reglas y cálculos controlados en el servidor. Esta combinación permite elegir el método de procesamiento según la tarea y hacer visible al usuario cómo se obtuvo el resultado. El repositorio conserva el código, la documentación y las capturas reales de la aplicación.

![Rinosoft: resumen de un documento y revisión humana](static/evidencias/app_azure_02_resumen.png)

Para evaluar el funcionamiento, el docente puede abrir el enlace de Azure sin ingresar al portal ni instalar programas. Dentro de la interfaz, puede seleccionar **Resumen**, **Procedimiento** o **Revisión**, pulsar **Usar un ejemplo** y después el botón correspondiente a la tarea. Así obtiene una respuesta nueva del agente a partir del material proporcionado. La revisión consiste en contrastar esa salida con la fuente, identificar los datos pendientes y decidir qué debe corregirse antes de copiar o descargar el borrador. Se deben utilizar los ejemplos ficticios incluidos: el piloto público no cuenta con autorización empresarial por usuario y no debe recibir información confidencial real. Su disponibilidad depende de los recursos y del crédito de Azure del proyecto.

Las seis funciones trasladan los ejercicios administrativos de la fase 1 a un espacio de trabajo común. En el **correo de recepción**, una plantilla controlada permite preparar el acuse sin inventar registro, revisión o compromisos. Esta decisión acota el contenido a los datos suministrados y deja pendiente aquello que todavía no se conoce. En el **resumen**, el agente de Foundry prepara una salida de hasta 250 palabras, con identificación de la fuente y datos pendientes. La persona que lo utiliza debe comprobar que las cifras y las afirmaciones correspondan al documento de entrada.

El **procedimiento** se presenta como un borrador generado por el agente, con responsables, tiempos y aprobación por definir cuando esos datos no se han proporcionado. El resultado sirve como propuesta para revisión y requiere validación antes de adoptarse. En el **análisis de solicitudes**, los cálculos se realizan con Decimal sobre una tabla CSV y se informan las filas inválidas y las exclusiones. De esta manera, el promedio y los demás resultados pueden comprobarse directamente contra los registros utilizados. La **agenda** distribuye de forma comprobable una reunión de 30 minutos entre 2–8 temas. Por su parte, la **revisión sensible** utiliza el agente para orientar sobre categorías de información y minimización, acompañada de una regla previa de credenciales. Esa orientación mantiene la necesidad de examinar el contexto y los límites de la detección.

La arquitectura que sostiene estas funciones sigue el recorrido **Navegador → Flask en Azure Functions → reglas controladas o agente de Microsoft Foundry**. Entra ID y una identidad administrada autentican al servidor ante Foundry y Azure Storage. Blob Storage privado guarda el despliegue y un contador diario compartido; su función en esta solución no es actuar como archivo de documentos del usuario. Las credenciales y la configuración del entorno se mantienen fuera del repositorio. Cada consulta de IA se aísla en una conversación independiente y la aplicación intenta limpiar los artefactos temporales que crea. Esta descripción distingue los mecanismos implementados de las garantías de retención o eliminación que requerirían una auditoría adicional.

El repositorio permite examinar cómo se relacionan la interfaz, las validaciones y la conexión con Azure. Su estructura conserva una separación entre el servidor, el adaptador de Functions, los recursos de presentación y las pruebas:

```text
app.py                      Servidor Flask, validación y tareas
function_app.py             Adaptador de Azure Functions
host.json                   Configuración de Functions
requirements.txt            Dependencias de Python
templates/                  Interfaz web
static/                     Estilos, interacción y capturas
docs/                       Documento de entrega, pruebas e implementación
tests/test_app.py           Pruebas locales sin llamadas al modelo
```

La explicación de la solución y su alcance se desarrolla en el [Documento de entrega con capturas](docs/Documentacion_AI901_Rinosoft.md). Las [Entradas, salidas y observaciones de las pruebas públicas](docs/Pruebas_app_Azure_Rinosoft.md) permiten contrastar los resultados reportados, mientras que las [Instrucciones propuestas para el agente](docs/Instrucciones_agente_Rinosoft.md) permiten examinar las reglas sugeridas para su configuración. La [Configuración y despliegue en Azure](docs/Implementacion_Azure.md) documenta los aspectos de implementación. Las capturas de `docs/` usan rutas del repositorio para conservarse aunque deje de estar disponible el alojamiento de Azure; la aplicación mantiene además su documentación descargable con imágenes HTTPS.

La reproducción técnica requiere **Python 3.12**, Azure CLI y una cuenta autorizada para consumir el proyecto de Foundry. La aplicación lee variables de entorno y no carga archivos `.env` automáticamente. Para preparar un entorno de desarrollo local, se pueden ejecutar las siguientes instrucciones en PowerShell desde la raíz del repositorio; los valores de recurso y proyecto deben corresponder a una configuración autorizada:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

$env:PROJECT_ENDPOINT = "https://TU-RECURSO.services.ai.azure.com/api/projects/TU-PROYECTO"
$env:AGENT_NAME = "rinosoft-asistente"
$env:SECRET_KEY = (.\.venv\Scripts\python.exe -c "import secrets; print(secrets.token_hex(32))")

az login
.\.venv\Scripts\python.exe app.py
```

Después de iniciar el servidor, el acceso local se realiza en `http://127.0.0.1:5050`. El código de esta versión está vinculado al directorio institucional del proyecto para el acceso local; para portarlo a otro directorio se debe ajustar la selección de tenant de `AzureCliCredential` en `FoundryGateway`. En Azure se utiliza la identidad administrada indicada por `AZURE_CLIENT_ID`. El modo local sirve para desarrollo, mientras que la entrega del prototipo se utiliza mediante el enlace publicado en Azure. Tanto la sesión de Azure como el secreto generado deben mantenerse fuera de Git.

La validación del código se apoya en pruebas locales que pueden ejecutarse con el siguiente comando:

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

Las **15 pruebas locales** verifican plantillas, cálculos, duración de agenda, aislamiento, CSRF, credenciales, archivos, longitud y errores. Utilizan un agente simulado, por lo que no requieren credenciales de Azure ni consumen tokens. Su resultado aporta evidencia sobre los controles del código; la evaluación de las respuestas generadas necesita además las pruebas reales del agente y de la interfaz publicada, documentadas por separado con sus fechas y limitaciones. La prueba de áreas mostró diferencias residuales de interpretación, de modo que la revisión humana continúa siendo necesaria incluso cuando el modelo conserva las cifras principales.

El alcance de esta versión comprende la entrada de texto y archivos PDF digitales, TXT, MD y CSV. Quedan pendientes la voz, el OCR y la lectura de imágenes. Tampoco se han implementado integración con correo u Office, envío automático, pagos ni aprobación corporativa durable. Estas delimitaciones permiten evaluar lo que el prototipo demuestra y reconocer las capacidades que todavía requieren desarrollo y validación. GitHub comparte el proyecto y su evidencia; la ejecución del asistente ocurre en Azure y depende de ese alojamiento.

Entre los aspectos pendientes para evaluar un uso empresarial están la autenticación por usuario final y la gestión de secretos con Key Vault; tampoco se ha implementado una anonimización completa. Los controles existentes no sustituyen una revisión de seguridad empresarial antes de admitir información real. Asimismo, los límites de entrada y consultas están documentados, pero no equivalen a un tope de gasto: el costo real debe comprobarse en Azure.
