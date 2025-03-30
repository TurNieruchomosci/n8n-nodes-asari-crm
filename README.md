# n8n-nodes-asari-crm

Integracja ASARI CRM z n8n jako Community Node. Node pozwala na połączenie z API ASARI CRM i wykonywanie zapytań, np. pobieranie klientów.

## 📁 Struktura

```
n8n-nodes-asari-crm/
├── nodes/
│   └── AsariCrm.node.ts
├── credentials/
│   └── AsariCrmApi.credentials.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Instalacja w Railway z GitHub

1. Wejdź do Railway i otwórz swój projekt z n8n.
2. Przejdź do zakładki **Variables**.
3. Dodaj zmienną środowiskową:

```
N8N_CUSTOM_EXTENSIONS=https://github.com/TurNieruchomosci/n8n-nodes-asari-crm
```

4. Zrestartuj projekt – Railway automatycznie pobierze i zbuduje node.

## 🛠️ Testowanie lokalne (opcjonalnie)

1. Sklonuj repozytorium:

```bash
git clone https://github.com/TurNieruchomosci/n8n-nodes-asari-crm
cd n8n-nodes-asari-crm
npm install
npm run build
```

2. Uruchom n8n z lokalną ścieżką do node’a:

```bash
N8N_CUSTOM_EXTENSIONS=/pełna/ścieżka/do/folderu n8n
```

## 🔐 Autoryzacja

Node korzysta z API Key, który należy ustawić w zakładce **Credentials** jako `asariCrmApi`.

## 📌 Obecne funkcje

- ✅ Pobieranie klientów z ASARI CRM (`GET /clients`)

## 📌 Plany rozwoju

- Dodawanie klientów
- Pobieranie ofert
- Obsługa webhooków

---

**Autor:** TurNieruchomosci  
**Licencja:** MIT
