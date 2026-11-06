# Rinosoft - Asistente administrativo responsable

Aplicación de la opción B del proyecto AI-901. Usa el agente de Foundry `rinosoft-asistente`, con identidad de Azure en el servidor. No necesita claves API en el navegador.

## Alojamiento elegido

La publicación usa **Azure Functions Flex Consumption (FC1)** en North Central US. Los planes App Service F1/B1 y Functions Consumption Y1 fueron rechazados por cuota cero; no se crearon esos planes. La app conserva Flask y se integra con Functions mediante `function_app.py` y `host.json`. App Service Linux con Gunicorn queda como alternativa de portabilidad, no como el alojamiento actual.

La identidad administrada asignada por el usuario se selecciona mediante `AZURE_CLIENT_ID` y tiene consumo del agente al nivel de su proyecto, además de acceso al almacenamiento dedicado del piloto. Los contenedores de almacenamiento no son públicos y no se habilitaron claves compartidas.

## Funciones

- Correo de recepción: plantilla controlada; no usa el modelo para añadir texto libre o promesas.
- Resumen: consulta al agente con el documento como material no confiable, límite de entrada y aviso IA visible en la app.
- Procedimiento: propuesta generada por el agente; mantiene revisión humana.
- Solicitudes: calcula recuento, suma, promedio y máximos sobre CSV; informa filas excluidas. Son cálculos, no una predicción ni un diagnóstico causal.
- Agenda: distribuye exactamente 30 minutos entre 2-8 temas; objetivo propuesto y responsables pendientes.
- Información sensible: revisión orientativa de categorías por el agente. Una regla local bloquea algunos patrones de credenciales; no es un detector completo de datos sensibles.

Solo emplear información ficticia o autorizada. El piloto público no tiene autorización corporativa por usuario. No introducir nóminas, información financiera real, contraseñas u otros datos confidenciales.

## Límites reales

Texto hasta 16 000 caracteres por consulta; archivos hasta 4 MB. PDF con texto hasta 10 páginas; TXT/MD/CSV UTF-8. No se realiza OCR de escaneos ni se admiten imágenes. Voz todavía no implementada. No hay integración con correo, Office, ERP, OneDrive o SharePoint ni envío automático. Las comprobaciones de revisión permanecen en la pestaña y no constituyen una aprobación auditada. No se guardan documentos ni borradores en la base local; se guarda únicamente el contador de uso.

La app distingue "Agente de IA", "Plantilla controlada", "Cálculo verificable" y "Distribución calculada". Las referencias identifican el material aportado, pero no verifican automáticamente cada afirmación del modelo. La calidad se evalúa con pruebas y revisión humana.

Una regla previa acotada rechaza algunas instrucciones incrustadas que solicitan ignorar reglas; no es detección general de ataques y puede rechazar citas legítimas. El servidor rechaza resúmenes de más de 250 palabras, contadas por espacios sobre toda la salida, sin recortar silenciosamente.

## Ejecución

Python 3.12; instalar requirements.txt. Definir PROJECT_ENDPOINT, AGENT_NAME y SECRET_KEY. En local, iniciar sesión con Azure CLI o una identidad autorizada; ejecutar `python app.py`. En App Service Linux, comando de inicio:

```text
gunicorn --bind=0.0.0.0:8000 --workers=1 --threads=4 --timeout=180 'app:create_app()'
```

El docente utilizará la URL de Azure, sin ejecutar código en su computadora. La ejecución local es solo para desarrollo.

## Azure

En Azure Functions, seleccionar la identidad administrada asignada por el usuario y darle permiso de consumo del agente en el ámbito del proyecto de Foundry. En la configuración del servicio:

```text
PROJECT_ENDPOINT=https://peralesj93-ia-2455-resource.services.ai.azure.com/api/projects/peralesj93-ia-2455
AGENT_NAME=rinosoft-asistente
SECRET_KEY=(generada y guardada como configuración de servidor; no copiar a documentación)
MAX_AI_CALLS_PER_DAY=100
MAX_AI_CALLS_PER_IP_DAY=30
```

Los límites son diarios en UTC y cuentan intentos de consulta al agente, no dinero. En Flex, `RINOSOFT_RATE_BLOB_URL` identifica un contador compartido privado en Azure Blob Storage, con lease para evitar actualizaciones simultáneas. En desarrollo local se usa SQLite. No garantizan un tope económico. Un proxy puede agrupar visitantes por IP. La app requiere presupuesto y supervisión de costes.

Para Flex, la versión de Python se configura en `functionAppConfig.runtime` como 3.12. La raíz del ZIP incluye `function_app.py` y `host.json`, además de la app y sus dependencias. Publicar con `az functionapp deployment source config-zip --build-remote true`. No configurar `WEBSITE_RUN_FROM_PACKAGE`, `linuxFxVersion` ni el arranque Gunicorn en Flex.

El despliegue ZIP debe contener app.py, requirements.txt, templates y static en la raíz. Excluir `.local`, pruebas temporales, sesiones de Azure, entornos Python, archivos `.env` y secretos.

## Fuentes técnicas

- https://learn.microsoft.com/en-us/azure/app-service/quickstart-python
- https://learn.microsoft.com/en-us/python/api/azure-ai-projects/azure.ai.projects.aiprojectclient
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/configure-agent
- https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-how-to
- https://learn.microsoft.com/en-us/samples/azure-samples/flask-app-on-azure-functions/azure-functions-python-create-flask-app/

Estado de despliegue, pruebas reales y enlace final: consultar la documentación de entrega actualizada, no presuponer que el código local ya fue publicado.
