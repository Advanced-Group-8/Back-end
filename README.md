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

## 🏗️ Teknisk arkitektur
- **Backend**: REST API / MQTT (valfritt beroende på implementation)  
- **Databas**: SQL/NoSQL med stöd för loggning och historik  
- **Molnplattform**: (ex. AWS, Azure eller GCP)  
- **Integrationer**: Fordonsenheter, logistik-appar, spårningssystem  

## 🚀 Användningsområden
- Realtidsspårning av paket  
- Övervakning av miljöparametrar (temperatur, luftfuktighet)  
- Fordonsflottehantering  
- Prediktiv analys för leveranser  

## 📌 Status
Projektet är under utveckling. Funktioner och integrationer byggs ut successivt.  

---
👨‍💻 Utvecklat som del av ett systemutvecklingsprojekt i backend-arkitektur.
