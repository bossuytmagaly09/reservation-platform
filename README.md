🚀 Nuxt 3 + Supabase + TailwindCSS — Reservatie App
Welkom bij onze groepsapplicatie!
Deze webapp is gebouwd door Nikita, Magaly en Friedel en maakt gebruik van moderne webtechnologieën:

Nuxt 3 — frontend framework

Supabase — backend, database & authentication

Pinia — state management

Tailwind CSS — utility‑first styling

Custom CSS — kleuren, fonts & theming

Deze README legt uit hoe je het project lokaal opstart, hoe de structuur werkt en welke stappen je moet volgen na een git pull.

📦 Installatie
Clone de repository:

bash
git clone <repo-url>
cd <project-folder>
Installeer dependencies:

bash
npm install
Start de development server:

bash
npm run dev
De app draait standaard op:

Code
http://localhost:3000
🧱 Projectstructuur
📁 Belangrijke mappen
Map	Beschrijving
/components	Herbruikbare Vue‑componenten
/pages	Nuxt‑routes
/layouts	Pagina‑layouts
/assets/css	Tailwind, kleuren & fonts
/server	API‑routes (indien nodig)
/plugins	Supabase client, Pinia, enz.
🎨 Styling
We gebruiken een combinatie van TailwindCSS en custom CSS.

Tailwind configuratie
Geactiveerd via:

@nuxtjs/tailwindcss

assets/css/tailwind.css

tailwind.config.js

Tailwind biedt:

spacing & layout utilities

gradients

shadows

animaties

responsive design

Custom CSS
We hebben drie centrale CSS‑bestanden:

assets/css/colors.css
Bevat kleurvariabelen zoals:

css
--color-primary;
--color-accent;
--color-bg;
--color-text;
assets/css/fonts.css
Bevat:

imports van Google Fonts

variabelen zoals --font-base en --font-title

body‑font setup

assets/css/tailwind.css
Activeert Tailwind:

css
@tailwind base;
@tailwind components;
@tailwind utilities;
🗄️ Supabase integratie
De homepage (pages/index.vue) bevat een automatische check:

Is de Supabase client beschikbaar?

Werkt de verbinding correct?

Zijn er auth‑errors?

De status wordt getoond in een info‑blok.

🔄 Workflow na een git pull
Iedereen in het team moet:

Nieuwe code ophalen

bash
git pull
Dependencies installeren

bash
npm install
Dev server herstarten

bash
npm run dev
(Optioneel) Build cache wissen bij rare fouten

bash
rm -rf .nuxt
npm run dev
🧑‍🤝‍🧑 Team
Dit project wordt gebouwd door:

Nikita

Magaly

Friedel

Samen creëren we een moderne, intuïtieve reservatie‑app met Nuxt 3.

🔒 Belangrijk: .env wordt niet meegestuurd
Zorg dat je nooit je .env pusht.
De repo bevat een .gitignore die .env uitsluit.

Als een .env toch zichtbaar is in GitHub:

bash
git rm --cached .env
git commit -m "Remove .env from repo"
git push
En vergeet niet je API keys te roteren.

📜 License
Dit project is privé en bedoeld voor educatieve en interne teamdoeleinden.