# 📦 Logistics Backend System

## 🌐 Översikt
Detta projekt är en **backend-server** som knyter samman hela logistikflödet – från avsändare, via transportör/logistikbärare, till mottagare.  
Systemet erbjuder **molnbaserad hantering** av paket, fordonsdata och analysmöjligheter för effektiv spårning och övervakning.

## ✨ Funktioner
- 🔗 **Kopplar samman aktörer**: avsändare, logistikbärare och mottagare, samt deras individuella paket.
- ☁️ **Molnbaserad arkitektur** för skalbarhet och tillgänglighet.
- 🗄️ **Databasloggning** av paket:
  - Var i kedjan de befinner sig
  - GPS-positionerad historik
  - Temperatur- och luftfuktighetsloggar
- 🚚 **Integration med fordonens styrenheter** för att samla in och lagra data i databasen.
- 📱 **Integration med logistik-appar** för kommunikation med systemet.
- 📊 **Dataanalys & spårning**:
  - Separat databas för analys av paketdata
  - Möjliggör realtids spårningsapp
- 📝 **Loggvisning och nedladdning** via `/logs`-endpoint

## 🏗️ Teknisk arkitektur
- **Backend**: REST API med Express och TypeScript
- **Databas**: PostgreSQL (lokalt via Docker eller Azure)
- **Molnplattform**: Azure Web App for Containers
- **CI/CD**: GitHub Actions för test, build, och deployment
- **Swagger/OpenAPI**: Dokumentation på `/api-docs`

## 🚀 API-struktur

### Paket
- `GET /package` – Hämta paket med filter
- `POST /package` – Skapa nytt paket
- `GET /package/{id}` – Hämta paket med ID
- `GET /package/device/{deviceId}` – Hämta paket med deviceId

### Paketspårning
- `GET /package-tracking` – Hämta all tracking-data, grupperad per enhet
- `POST /package-tracking` – Skapa ny tracking-post
- `GET /package-tracking/{deviceId}` – Hämta tracking för en enhet

### Loggar
- `GET /logs` – Visa loggar som HTML och ladda ner loggfilen
- `GET /logs/download` – Ladda ner loggfilen som text
- `DELETE /logs` – Rensa loggfilen

## Hur startar jag servern?
Servern är alltid igång via länk som finns på Azure. 
 
ATM är vår kod utformad att fungera mot Azure. Men för att få den att fungera **lokalt**:
navigera till `./backend/api` -> i din CLI kör `npm run dev`.  
Du ska nu få följande meddelande:  
```powershell
> logi@1.0.0 dev
> tsx watch src/server.ts

🚀 Server running on http://0.0.0.0:3000
```
Koden körs nu på localhost:3000 för testning.



## 📌 Status
Projektet är under utveckling. Funktioner och integrationer byggs ut successivt.  

---
👨‍💻 Utvecklat som del av ett systemutvecklingsprojekt i backend-arkitektur.