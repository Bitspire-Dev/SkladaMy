# INSTRUKCJA SEEDOWANIA DANYCH

## Krok 1: Uruchom CMS

W pierwszym terminalu (jeśli nie działa już):
```powershell
cd c:\Users\kubap\Desktop\SkładaMy\cms
npm run develop
```

Poczekaj aż CMS się uruchomi (około 30 sekund).

## Krok 2: Utwórz konto admina

1. Otwórz przeglądarkę: http://localhost:1337/admin
2. Utwórz pierwszego użytkownika (admin):
   - Email: admin@skladamy.pl
   - Password: Admin123! (lub własne)
   - Imię/Nazwisko: dowolne

## Krok 3: Uruchom seeding

W drugim terminalu:
```powershell
cd c:\Users\kubap\Desktop\SkładaMy\cms
npm run seed
```

## Co zostanie dodane?

✅ **4 artykuły blogowe:**
- Jak złożyć szafę PAX z IKEA (featured)
- Cennik montażu mebli Słupsk 2025 (featured)
- Top 5 narzędzi do montażu mebli
- Jak urządzić małą sypialnię (featured)

✅ **12 zdjęć do galerii** z folderu public/uploads

## Jeśli seeding się nie powiedzie

### Błąd logowania:
- Upewnij się, że email i hasło w skrypcie pasują do admina
- Możesz edytować: `cms/scripts/seed-database.js` (linie 7-8)

### Błąd uploadowania zdjęć:
- Sprawdź czy folder `cms/public/uploads` zawiera zdjęcia
- Sprawdź uprawnienia do odczytu plików

### Błąd tworzenia artykułów:
- Sprawdź czy CMS działa: http://localhost:1337/healthz
- Zrestartuj CMS i spróbuj ponownie

## Weryfikacja

Po zakończeniu seedingu sprawdź:
- http://localhost:1337/admin/content-manager/collection-types/api::blog-post.blog-post
- http://localhost:1337/admin/content-manager/single-types/api::gallery.gallery
