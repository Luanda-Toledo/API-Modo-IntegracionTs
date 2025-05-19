# 🧾 API de Integración con MODO – NestJS + TypeScript

API REST construida con NestJS y TypeScript para conectarse con la plataforma de pagos MODO.  
Permite generar tokens, crear intenciones de pago, consultar información de pagos y realizar devoluciones.

---

## 🚀 Tecnologías utilizadas

- Node.js
- NestJS
- TypeScript
- Axios
- Dotenv

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
```

---

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
CLIENT_ID=...
CLIENT_SECRET=...
STORE_ID=...
MODO_BASE_URL=...
PORT=3000
```

---

## 🏃‍♂️ Uso

```bash
npm run start:dev
```

La API estará disponible en:  
📍 `http://localhost:3000`

---

## 📬 Endpoints disponibles

### GET `/modo/token`  
Obtiene un token válido desde MODO.

### POST `/modo/pago`  
Crea una intención de pago. Requiere un body en formato JSON:

```json
{
  "amount": 250.5,
  "currency": "ARS",
  "description": "Compra de prueba",
  "callbackUrl": "https://miapp.com/pago-finalizado"
}
```

### GET `/modo/pago/:paymentId`  
Consulta el estado de una intención de pago por ID.

### POST `/modo/pago/:paymentId/devolucion`  
Realiza una devolución. Requiere un body en formato JSON:

```json
{
  "amount": 250.5
}
```

---

## 🛡️ Seguridad

- El archivo `.env` está ignorado por Git.
- No se suben credenciales ni secretos.
- Las peticiones a MODO se realizan con autenticación y por HTTPS.

---

## 📜 Licencia

MIT
