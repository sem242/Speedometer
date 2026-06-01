# GPS Speedometer 🚗

Een mobiele web-app die je huidige snelheid meet met behulp van GPS. Perfect voor iPhone en andere mobiele apparaten.

## Functies

✅ **Real-time GPS snelheid** - Nauwkeurige snelheidsmeting via GPS  
✅ **Visuele tachometer** - Mooie grafische weergave  
✅ **iPhone optimized** - Volledig responsief ontwerp  
✅ **Offline beschikbaar** - Werkt ook offline na eerste laadbeurt  
✅ **Locatiegegevens** - Toont breedte, lengte en hoogte  
✅ **Maximale snelheid** - Houdt je hoogst gemeten snelheid bij  
✅ **Nauwkeurigheidsindicator** - Toont GPS-nauwkeurigheid  

## Vereisten

- **Voor Python**: Python 3.6+
- **Voor Node.js**: Node.js 12+
- **Browser**: Moderne browser met GPS-ondersteuning (iOS Safari, Chrome, Firefox)
- **iPhone**: iOS 10+ (voor web app)

## Installatie & gebruik

### Optie 1: Python (Aanbevolen - geen instalatie nodig)

```bash
cd Speedometer
python server.py
```

De server start op: `http://localhost:8000`

### Optie 2: Node.js

```bash
cd Speedometer
npm install
npm start
```

## Toegang vanuit iPhone

### Op hetzelfde WiFi netwerk:

1. Start de server op je computer
2. Vind het IP-adres van je computer:
   - **Windows**: Open PowerShell en typ `ipconfig` (zoek naar IPv4-adres)
   - **Mac/Linux**: Open terminal en typ `ifconfig` (zoek naar inet)
3. Open Safari op je iPhone
4. Navigeer naar: `http://<jouw-computer-ip>:8000`
   - Bijvoorbeeld: `http://192.168.1.100:8000`

### Via QR-code (sneller):
```bash
# Maak een QR-code op je computer
# Windows: Voeg 'qrcode' module toe aan server.py
# Of gebruik online: https://www.qr-code-generator.com/
```

### Als Web App op iPhone:
1. Open de URL in Safari
2. Tik op het Deel-icon
3. Selecteer "Naar Startscherm"
4. Nu heb je een app-icoon op je Home screen

## Hoe het werkt

1. **Start GPS**: Tik op "Start GPS" knop
2. **Verleen toestemming**: Accepteer locatieverzoek
3. **Rijd**: De snelheidsmeter toont je huidige snelheid in km/h
4. **Gegevens**: Ziet live coördinaten, hoogte en maximale snelheid

## Bestanden

```
Speedometer/
├── index.html      # HTML structuur
├── style.css       # Styling en layout
├── app.js          # GPS logica en snelheidsberekening
├── server.py       # Python HTTP server
├── server.js       # Node.js HTTP server
├── package.json    # Node.js configuratie
└── README.md       # Dit bestand
```

## Technische details

### Snelheidsberekening

De app gebruikt:
- **Haversine-formule** voor afstandsberekening tussen twee GPS-coördinaten
- **Tijdsverschil** tussen metingen
- **Formule**: snelheid = afstand / tijd

### GPS Parameters

- **Nauwkeurigheid**: Hoog (enableHighAccuracy: true)
- **Timeout**: 10 seconden
- **Frequentie**: Continu monitoring

### Filter

- Onrealistische snelheden > 300 km/h worden gefilterd
- Vereist minstens 2 metingen voor berekening

## Troubleshooting

### "Geolocation not supported"
- Update je browser naar de nieuwste versie
- Zorg dat je HTTPS gebruikt (behalve voor localhost)

### "Location permission denied"
- Geef locatietoegang in browser-instellingen
- Op iPhone: Instellingen > Privacy > Locatie

### Lage nauwkeurigheid
- Ga naar buiten voor betere GPS-ontvangst
- Hoe groter het open veld, hoe beter
- Fijnere nauwkeurigheid na stabiliseren

### Server werkt niet
- Zorg dat poort 8000 vrij is
- Probeer ander poort: Wijzig PORT variabel in server
- Firewall: Toelaat poort 8000 voor interne netwerk

## Browser Compatibiliteit

| Browser | iOS | Android | Desktop |
|---------|-----|---------|---------|
| Safari | ✅ | - | ✅ |
| Chrome | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ |

## Performance Tips

1. **Sluit andere apps**: Meer resources voor GPS
2. **Outdoor testen**: Betere GPS signaal
3. **Snelle beweging**: Stabielere metingen boven 10 km/h
4. **Scherm aan**: Verhoogt GPS nauwkeurigheid

## Privacy

- ✅ Geen gegevens wordt opgeslagen
- ✅ Geen externe servers
- ✅ Alles werkt lokaal
- ✅ GPS-gegevens blijft op je device

## Licentie

MIT

## Versie

v1.0.0 - Eerste release

---

**Veel plezier met je GPS Speedometer! 🚗💨**
