
# Famous Tables 🍽️

A map-based exploration of historic restaurants and bars where notable events have taken place. Whether it's a legendary business deal, a pivotal dinner, or a dramatic encounter, Famous Tables brings these moments to life with quotes from books.

Visit [Famous Tables](https://famoustables.com) to explore the map.

## Contributing

There are two ways to contribute new places:

### 1. Use the website

- Visit the website and use the **"Suggest a Place"** form.
- Fill in the required details about the place and event.
- Once submitted, your suggestion will be sent to us via email in JSON format.

### 2. Edit the repository

- Clone this repository and edit the `src/data.ts` file directly.

- Add a new place or update an existing one using the following structure:

```typescript
const places: PlaceType[] = [
  {
    name: "Evvia Estiatorio",
    address: "420 Emerson St, Palo Alto, CA 94301, United States",
    category: "Greek restaurant",
    closed: false,  // whether the place is permanently closed
    latlng: [37.44517395192061, -122.16378052454957],
    events: [
      {
        description: "Run-in between...", // 140 characters max
        people: ["Andrew Bosworth", "Kevin Systrom"],
        year: 2012,
        category: "Technology",
        quotes: [
          {
            title: "No Filter",
            authors: ["Sarah Frier"],
            url: "https://www.amazon.com/...",  // optional
            text: "A few weeks..." // include entire paragraph where place is mentioned
          }
        ]
      }
    ]
  }
]
```

- Submit a pull request with your changes.

## Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/famous-tables.git
   cd famous-tables
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Visit the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the GNU General Public License v3.0 License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

This is a [Next.js](https://nextjs.org) project using:
- [Catalyst](https://tailwindui.com/templates/catalyst/) for application UI
- [GitHub](https://github.com/) for hosting
- [Heroicons](https://heroicons.com/) for icons
- [Leaflet](https://leafletjs.com/) for maps
- [Tailwind CSS](https://tailwindcss.com/) for styling