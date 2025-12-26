#!/usr/bin/env node
/**
 * Seed Strapi database with blog posts and gallery images
 * Run this script with Strapi running: node scripts/seed-database.js
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@skladamy.pl';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';

let jwtToken = null;

// Blog posts data
const blogPosts = [
  {
    title: "Jak złożyć szafę PAX z IKEA - Kompletny przewodnik krok po kroku",
    slug: "jak-zlozyc-szafe-pax-ikea-przewodnik",
    excerpt: "Profesjonalny poradnik montażu szafy PAX. Dowiedz się, jak uniknąć najczęstszych błędów i złożyć szafę idealnie w zaledwie kilka godzin.",
    content: `# Montaż szafy PAX - przewodnik

Szafa PAX to jeden z najpopularniejszych systemów meblowych IKEA. Dzięki modułowej konstrukcji można ją dostosować do każdego pomieszczenia.

## Przygotowanie do montażu

Przed rozpoczęciem montażu upewnij się, że masz:
- Wszystkie elementy z instrukcji
- Odpowiednie narzędzia (poziomicę, śrubokręt, młotek)
- Minimum 2 osoby do montażu
- 3-4 godziny czasu

## Etapy montażu

### 1. Sprawdzenie elementów
Rozłóż wszystkie elementy i sprawdź, czy nic nie brakuje. Uporządkuj śruby i kołki według typu.

### 2. Montaż korpusu
Zacznij od złożenia bocznych ścianek. Używaj poziomnicy, aby upewnić się, że wszystko jest proste.

### 3. Montaż drzwi
Drzwi przesuwne wymagają precyzyjnego ustawienia prowadnic. Poświęć temu czas - to najważniejszy etap.

## Najczęstsze błędy

- Niedokładne wypoziomowanie
- Zbyt mocne dokręcanie śrub
- Montaż bez drugiej osoby

## Podsumowanie

Montaż szafy PAX nie jest trudny, ale wymaga cierpliwości i dokładności. Jeśli nie czujesz się pewnie, skorzystaj z usług profesjonalistów.`,
    category: "ikea-tips",
    author: "SkładaMy Team",
    readTime: 8,
    tags: [
      { label: "IKEA", color: "#0051BA" },
      { label: "PAX", color: "#FFDB00" },
      { label: "montaż", color: "#2E7D32" },
      { label: "poradnik", color: "#1976D2" }
    ],
    featured: true,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Ile kosztuje montaż mebli w Słupsku? Cennik 2025",
    slug: "ile-kosztuje-montaz-mebli-slupsk-cennik-2025",
    excerpt: "Aktualny cennik montażu mebli w Słupsku. Sprawdź, ile kosztuje złożenie szafy, kuchni czy biurka. Transparentne ceny bez ukrytych kosztów.",
    content: `# Cennik montażu mebli Słupsk 2025

## Ceny podstawowe

### Meble IKEA
- Szafa PAX (2-drzwiowa): 250-350 zł
- Szafa PAX (3-drzwiowa): 400-550 zł
- Komoda MALM: 120-180 zł
- Regał KALLAX: 80-150 zł
- Łóżko z szufladami: 200-300 zł

### Meble kuchenne
- Szafka wisząca: 40-60 zł/szt
- Szafka stojąca: 50-80 zł/szt
- Słupek: 100-150 zł
- Blat (montaż): 150-250 zł

### Meble biurowe
- Biurko: 80-150 zł
- Regał/biblioteczka: 100-200 zł
- Szafa biurowa: 180-300 zł

## Co wpływa na cenę?

1. **Wielkość mebla** - większe meble = więcej czasu
2. **Stopień skomplikowania** - systemy przesuwne są droższe
3. **Dojazd** - w centrum Słupska dojazd gratis
4. **Dodatkowe usługi** - montaż na ścianie, likwidacja opakowań

## Darmowy dojazd

Oferujemy darmowy dojazd w Słupsku przy zamówieniu powyżej 200 zł.`,
    category: "cennik",
    author: "SkładaMy Team",
    readTime: 5,
    tags: [
      { label: "cennik", color: "#F57C00" },
      { label: "Słupsk", color: "#D32F2F" },
      { label: "ceny", color: "#7B1FA2" }
    ],
    featured: true,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Top 5 narzędzi do montażu mebli - Co musisz mieć?",
    slug: "top-5-narzedzi-montaz-mebli",
    excerpt: "Profesjonalne narzędzia znacznie ułatwiają montaż mebli. Zobacz, które narzędzia są absolutnie niezbędne, a które warto mieć.",
    content: `# Top 5 narzędzi do montażu mebli

## 1. Wkrętak akumulatorowy
To absolutna podstawa. Pozwala na szybki montaż bez męczącego kręcenia ręcznie.

**Polecamy:** Bosch IXO, Makita DF330D

## 2. Poziomnica
Meble muszą być idealnie wypoziomowane. Poziomnica laserowa to najlepsza inwestycja.

## 3. Młotek gumowy
Kołki wbijasz gumowym młotkiem - nie uszkodzi mebla.

## 4. Miara i kątownica
Precyzyjne odmierzanie to klucz do sukcesu.

## 5. Zestaw kluczy imbusowych
IKEA używa głównie kluczy imbusowych. Warto mieć pełen zestaw.

## Bonus: Organizer na śrubki
Uporządkowanie drobnych elementów oszczędza mnóstwo czasu.`,
    category: "narzedzia",
    author: "SkładaMy Team",
    readTime: 4,
    tags: [
      { label: "narzędzia", color: "#455A64" },
      { label: "poradnik", color: "#1976D2" },
      { label: "DIY", color: "#00897B" }
    ],
    featured: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Jak urządzić małą sypialnię? 10 sprawdzonych trików",
    slug: "jak-urzadzic-mala-sypialnie-triki",
    excerpt: "Mała sypialnia to wyzwanie, ale nie problem! Zobacz 10 sprawdzonych sposobów na maksymalne wykorzystanie przestrzeni.",
    content: `# Jak urządzić małą sypialnię?

## Problem małych sypialni w Słupsku
Wiele mieszkań w Słupsku, zwłaszcza w starszych blokach, ma niewielkie sypialnie.

## 10 sprawdzonych trików

### 1. Łóżko z szufladami
IKEA MALM czy BRIMNES z szufladami to dodatkowe 2-3 komody miejsca!

### 2. Szafa do sufitu
Szafa PAX montowana pod sam sufit maksymalizuje przestrzeń pionową.

### 3. Jasne kolory
Biel i jasne beże optycznie powiększają pomieszczenie.

### 4. Lustro
Duże lustro naprzeciwko okna podwaja światło.

### 5. Minimalizm w dekoracjach
Mniej = więcej.`,
    category: "inspiracje",
    author: "SkładaMy Team",
    readTime: 7,
    tags: [
      { label: "inspiracje", color: "#FF6F00" },
      { label: "sypialnia", color: "#5E35B1" }
    ],
    featured: true,
    publishedAt: new Date().toISOString()
  }
];

async function login() {
  try {
    console.log('🔐 Logging in to Strapi...');
    const response = await axios.post(`${STRAPI_URL}/api/auth/local`, {
      identifier: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    jwtToken = response.data.jwt;
    console.log('✅ Logged in successfully');
    return jwtToken;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    console.log('\n💡 Ensure Strapi is running and admin user exists.');
    console.log('   Create admin at: http://localhost:1337/admin');
    throw error;
  }
}

async function createBlogPost(post) {
  try {
    const response = await axios.post(
      `${STRAPI_URL}/api/blog-posts`,
      { data: post },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`✅ Created: ${post.title}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to create "${post.title}":`, error.response?.data?.error || error.message);
    return null;
  }
}

async function uploadImages() {
  try {
    console.log('\n📸 Scanning images in public/uploads...');
    const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
    const files = fs.readdirSync(uploadsDir);
    
    // Filter original images (not thumbnails/resized versions)
    const originalImages = files.filter(file => 
      !file.startsWith('thumbnail_') && 
      !file.startsWith('small_') && 
      !file.startsWith('medium_') && 
      !file.startsWith('large_') &&
      (file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.png'))
    );

    console.log(`Found ${originalImages.length} original images`);
    
    const uploadedIds = [];
    
    for (const filename of originalImages.slice(0, 12)) { // Upload first 12 images
      try {
        const filePath = path.join(uploadsDir, filename);
        const formData = new FormData();
        formData.append('files', fs.createReadStream(filePath));
        
        const response = await axios.post(
          `${STRAPI_URL}/api/upload`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        
        uploadedIds.push(response.data[0].id);
        console.log(`  ✅ Uploaded: ${filename}`);
      } catch (error) {
        console.error(`  ❌ Failed to upload ${filename}`);
      }
    }
    
    return uploadedIds;
  } catch (error) {
    console.error('❌ Image upload failed:', error.message);
    return [];
  }
}

async function updateGallery(imageIds) {
  try {
    console.log('\n🖼️  Updating gallery with images...');
    
    const response = await axios.put(
      `${STRAPI_URL}/api/gallery`,
      {
        data: {
          images: imageIds,
          featuredImages: imageIds.slice(0, 6),
          publishedAt: new Date().toISOString()
        }
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('✅ Gallery updated successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Gallery update failed:', error.response?.data?.error || error.message);
    return null;
  }
}

async function main() {
  console.log(`
╔════════════════════════════════════════╗
║   Database Seeder - SkładaMy Słupsk   ║
╚════════════════════════════════════════╝
`);

  try {
    // Login
    await login();
    
    // Create blog posts
    console.log('\n📝 Creating blog posts...');
    for (const post of blogPosts) {
      await createBlogPost(post);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    }
    
    // Upload images and update gallery
    const imageIds = await uploadImages();
    if (imageIds.length > 0) {
      await updateGallery(imageIds);
    }
    
    console.log(`
╔════════════════════════════════════════╗
║            ✅ SEEDING COMPLETE         ║
╚════════════════════════════════════════╝

Created ${blogPosts.length} blog posts
Uploaded ${imageIds.length} images to gallery

Visit: ${STRAPI_URL}/admin
`);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { blogPosts, login, createBlogPost };
