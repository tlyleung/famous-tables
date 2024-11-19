const places: PlaceType[] = [
  {
    name: 'Evvia Estiatorio',
    address: '420 Emerson St, Palo Alto, CA 94301, United States',
    category: 'Greek restaurant',
    closed: false,
    latlng: [37.44517395192061, -122.16378052454957],
    events: [
      {
        description:
          'Run-in between Facebook and Instagram executives happened here',
        people: ['Andrew Bosworth', 'Kevin Systrom'],
        year: 2012,
        category: 'Technology',
        quotes: [
          {
            title: 'No Filter',
            authors: ['Sarah Frier'],
            url: 'https://www.amazon.com/No-Filter-Inside-Story-Instagram/dp/1982126809/',
            text: 'A few weeks after the deal closed, he joined Facebook executives for a meeting with a couple of the company’s top advertisers, at Evvia Estiatorio, a Greek restaurant in Palo Alto. Before it started, he ran into the advertising vice president Andrew Bosworth, a tall bald man who was one of Zuckerberg’s top lieutenants, known to speak his mind. Bosworth wore a T-shirt that said “Keep Calm and Hack On.”',
          },
        ],
      },
      {
        description:
          'President Obama’s 2011 Silicon Valley dinner was planned here',
        people: ['John Doerr', 'Steve Jobs'],
        year: 2011,
        category: 'Technology',
        quotes: [
          {
            title: 'Steve Jobs',
            authors: ['Walter Isaacson'],
            url: 'https://www.amazon.com/Steve-Jobs-Walter-Isaacson/dp/1451648537/',
            text: 'In February 2011, Doerr began making plans to host a small dinner for President Obama in Silicon Valley. He and Jobs, along with their wives, went to dinner at Evvia, a Greek restaurant in Palo Alto, to draw up a tight guest list. The dozen chosen tech titans included Google’s Eric Schmidt, Yahoo’s Carol Bartz, Facebook’s Mark Zuckerberg, Cisco’s John Chambers, Oracle’s Larry Ellison, Genentech’s Art Levinson, and Netflix’s Reed Hastings. Jobs’ attention to the details of the dinner extended to the food. Doerr sent him the proposed menu, and he responded that some of the dishes proposed by the caterer—shrimp, cod, lentil salad—were far too fancy “and not who you are, John.” He particularly objected to the dessert that was planned, a cream pie tricked out with chocolate truffles, but the White House advance staff overruled him by telling the caterer that the president liked cream pie. Because Jobs had lost so much weight that he was easily chilled, Doerr kept the house so warm that Zuckerberg found himself sweating profusely.',
          },
        ],
      },
      {
        description: 'The merger of X and Confinity was negotiated here',
        people: ['Bill Harris', 'Max Levchin', 'Elon Musk', 'Peter Thiel'],
        year: 2000,
        category: 'Technology',
        quotes: [
          {
            title: 'Elon Musk',
            authors: ['Walter Isaacson'],
            url: 'https://www.amazon.com/Elon-Musk-Walter-Isaacson/dp/',
            text: 'Musk and his new CEO Bill Harris scheduled a meeting with Thiel and Levchin in the back room of Evvia, a Greek restaurant in Palo Alto. The two sides traded notes about how many users each had, with Musk engaging in some of his usual exaggerations. Thiel asked him how he envisioned potential merger terms.“We would own ninety percent of the merged company and you would own ten percent,” Musk replied. Levchin was not quite sure what to make of Musk. Was he serious? They had roughly equal user bases.“He had an extremely serious I’m-not-joking look on his face, but underneath there seemed to be an ironic streak,” Levchin says. As Musk later conceded,“We were playing a game.”',
          },
          {
            title: 'The Founders',
            authors: ['Jimmy Soni'],
            url: 'https://www.amazon.com/Founders-Paypal-Entrepreneurs-Shaped-Silicon/dp/1501197266/',
            text: 'Harris felt the time had come. He requested a formal meeting between Confinity and X.com. Meeting at Evvia Estiatorio, a posh Palo Alto restaurant, Thiel and Levchin sat across from Harris and Musk. The mood was tense. “Bill had on his suit and tie, and you know, Elon had sold his company for three hundred million dollars,” Levchin remembered. “They were trying to intimidate us.” The conversation opened with pleasantries and shop talk—but with a probing undertone. “It was like, ‘How many users do you have?’” Levchin said.',
          },
        ],
      },
    ],
  },
  {
    name: 'Jack in the Box',
    address: '2280 El Camino Real, Palo Alto, CA 94306, United States',
    category: 'Fast food restaurant',
    closed: false,
    latlng: [37.42551190241305, -122.14716509992438],
    events: [
      {
        description:
          'While building Zip2, Elon and Kimbal Musk subsisted on fast food here',
        people: ['Elon Musk', 'Kimbal Musk'],
        year: 1995,
        category: 'Technology',
        quotes: [
          {
            title: 'Elon Musk',
            authors: ['Walter Isaacson'],
            url: 'https://www.amazon.com/Elon-Musk-Walter-Isaacson/dp/',
            text: 'The brothers rented a tiny office in Palo Alto that had room for two desks and futons. For the first six months, they slept in the office and showered at the YMCA. Kimbal, who would later become a chef and restaurateur, got an electric coil and cooked meals occasionally. But mainly they ate at Jack in the Box, because it was cheap, open twenty-four hours, and just a block away. “I can still tell you every single menu item,” Kimbal says. “It’s just seared into my brain.” Elon became a fan of the teriyaki bowl.',
          },
        ],
      },
    ],
  },
];

export const london: [[number, number], [number, number]] = [
  [51.491576912253926, -0.19390027804411508],
  [51.53135619079523, -0.08182149094053658],
];

export const newYork: [[number, number], [number, number]] = [
  [40.66404484264575, -74.06826645151733],
  [40.86323212220611, -73.80047469988962],
];

export const siliconValley: [[number, number], [number, number]] = [
  [37.34403806224733, -122.18491921873996],
  [37.44932057039871, -121.88416847719738],
];

export type PlaceType = {
  name: string;
  address: string;
  category: string;
  closed: boolean;
  latlng: [number, number];
  events: EventType[];
};

export type EventType = {
  description: string;
  people: string[];
  year: number;
  category: string;
  quotes: QuoteType[];
};

export type QuoteType = {
  title: string;
  authors: string[];
  url: string;
  text: string;
};

export async function getBoundedPlaces(
  bounds: [[number, number], [number, number]],
): Promise<PlaceType[]> {
  const places = await getPlaces();
  const [[swLat, swLng], [neLat, neLng]] = bounds;
  return places.filter(
    ({ latlng: [lat, lng] }) =>
      lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng,
  );
}

export async function getPlace(name: string): Promise<PlaceType | null> {
  const places = await getPlaces();
  const place = places.find((place) => place.name === name);
  return place === undefined ? null : place;
}

export async function getPlaces(): Promise<PlaceType[]> {
  return places;
}
