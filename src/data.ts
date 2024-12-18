const places: PlaceType[] = [
  {
    name: 'Antonio’s Nut House',
    address: '321 California Ave, Palo Alto, CA 94306, USA',
    category: 'Bar',
    closed: true,
    latlng: [37.42708804567121, -122.1439462221286],
    events: [
      {
        description: 'Plot against X.com CEO Bill Harris was hatched here',
        people: ['Elon Musk', 'David Sacks', 'Mark Woolway'],
        year: 2000,
        category: 'Technology',
        quotes: [
          {
            title: 'The Founders',
            authors: ['Jimmy Soni'],
            url: 'https://www.amazon.com/Founders-Paypal-Entrepreneurs-Shaped-Silicon/dp/1501197266',
            text: 'The week following Thiel’s departure, Sacks, Musk, and Mark Woolway met at a nearby bar called Antonio’s Nut House for a drink. The bar was a Palo Alto melting pot, best known for its bottomless free peanuts—and for the cracking of discarded shells under patrons’ feet. [...] “By the time we left the Nut House that night, we realized everybody was on the same page about this,” one participant said. “That it wasn’t working.” That night, the assembled employees began plotting a putsch against their CEO.',
          },
        ],
      },
      {
        description:
          'Theranos’ cheating on proficiency testing was admitted here',
        people: ['Alan Beam', 'Curtis Schneider', 'Daniel Young'],
        year: 2014,
        category: 'Science',
        quotes: [
          {
            title: 'Bad Blood',
            authors: ['John Carreyrou'],
            url: 'https://www.amazon.com/Bad-Blood/dp/B001ZXO340',
            text: "Daniel Young had sidled up next to him, interrupting his somber thoughts. As was his habit at these work parties, Daniel was drunk. The alcohol made him uncharacteristically friendly and approachable, but Alan knew better than to share his misgivings. Daniel was part of the inner circle. They made small talk, bantering about Daniel’s upper-crust upbringing in Connecticut. As they chatted, the festivities seemed to be winding down. Some colleagues were headed to Antonio's Nut House, a dive bar a few blocks down the street, to have a few more beers. Alan and Daniel tagged along. [...] He told Curtis about the lab’s quality-control data and how it was being kept from him. And he confided something else: the company was cheating on proficiency testing. In case Curtis hadn’t registered the implication of what he’d just said, he spelled it out: Theranos was breaking the law.",
          },
        ],
      },
    ],
  },
  {
    name: 'Buck’s of Woodside',
    address: '3062 Woodside Rd, Woodside, CA 94062, United States',
    category: 'Restaurant',
    closed: false,
    latlng: [37.42970357450607, -122.25511990247084],
    events: [
      {
        description:
          'PayPal made the first transfer using its own technology here',
        people: ['Max Levchin', 'Peter Thiel'],
        year: 1999,
        category: 'Technology',
        quotes: [
          {
            title: 'Founders at Work',
            authors: ['Jessica Livingston'],
            url: 'https://www.amazon.com/Founders-Work-Stories-Startups-Early/dp/1590597141',
            text: 'Then we had the famous Buck’s beaming—at Buck’s restaurant in Woodside, which is sort of the home away from home for many VCs. Our first round of financing was actually transferred to us via Palm Pilot. Our VCs showed up with a $4.5 million preloaded Palm Pilot, and they beamed it to us.',
          },
        ],
      },
    ],
  },
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
            url: 'https://www.amazon.com/No-Filter-Inside-Story-Instagram/dp/1982126809',
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
            url: 'https://www.amazon.com/Steve-Jobs-Walter-Isaacson/dp/1451648537',
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
            url: 'https://www.amazon.com/Elon-Musk-Walter-Isaacson/dp/1982181281',
            text: 'Musk and his new CEO Bill Harris scheduled a meeting with Thiel and Levchin in the back room of Evvia, a Greek restaurant in Palo Alto. The two sides traded notes about how many users each had, with Musk engaging in some of his usual exaggerations. Thiel asked him how he envisioned potential merger terms.“We would own ninety percent of the merged company and you would own ten percent,” Musk replied. Levchin was not quite sure what to make of Musk. Was he serious? They had roughly equal user bases.“He had an extremely serious I’m-not-joking look on his face, but underneath there seemed to be an ironic streak,” Levchin says. As Musk later conceded,“We were playing a game.”',
          },
          {
            title: 'The Founders',
            authors: ['Jimmy Soni'],
            url: 'https://www.amazon.com/Founders-Paypal-Entrepreneurs-Shaped-Silicon/dp/1501197266',
            text: 'Harris felt the time had come. He requested a formal meeting between Confinity and X.com. Meeting at Evvia Estiatorio, a posh Palo Alto restaurant, Thiel and Levchin sat across from Harris and Musk. The mood was tense. “Bill had on his suit and tie, and you know, Elon had sold his company for three hundred million dollars,” Levchin remembered. “They were trying to intimidate us.” The conversation opened with pleasantries and shop talk—but with a probing undertone. “It was like, ‘How many users do you have?’” Levchin said.',
          },
        ],
      },
    ],
  },
  {
    name: 'Gourmet Haus Staudt',
    address: '2615 Broadway Redwood City, CA 94063, United States',
    category: 'Bar',
    closed: false,
    latlng: [37.48605290777849, -122.23344767302144],
    events: [
      {
        description: 'Apple iPhone 4 prototype was left here',
        people: ['Gray Powell'],
        year: 2010,
        category: 'Technology',
        quotes: [
          {
            title: 'Burn Book',
            authors: ['Kara Swisher'],
            url: 'https://www.amazon.com/Burn-Book-Tech-Love-Story/dp/1982163895',
            text: 'Of course, Dave was the only one I would pick on a reporting lark I went on to grab a Weihenstephaner Vitus at Redwood City’s Gourmet Haus Staudt, where a drunk Apple engineer left the iPhone 4 prototype after he was hoisting too many German beers. He was excited to play the reporter and took notes and asked questions of the patrons there, like he was Woodward and Bernstein combined, even though I only was doing a simple and silly stunt story. We ended up sitting at one of the huge wood tables and just laughing at the absurdity of all of it for hours. “You have the best job,” he said to me. I did.',
          },
        ],
      },
    ],
  },
  {
    name: 'Il Fornaio',
    address: '520 Cowper St, Palo Alto, CA 94301, United States',
    category: 'Restaurant',
    closed: false,
    latlng: [37.44792639422866, -122.15883876011927],
    events: [
      {
        description: 'The merger of X and Confinity was negotiated here',
        people: ['Pete Buhl', 'Bill Harris', 'John Mallory'],
        year: 2000,
        category: 'Technology',
        quotes: [
          {
            title: 'The Founders',
            authors: ['Jimmy Soni'],
            url: 'https://www.amazon.com/Founders-Paypal-Entrepreneurs-Shaped-Silicon/dp/1501197266',
            text: 'The meager offer astonished Levchin. “I didn’t know if I was supposed to speak up, but I was definitely not up for this,” he recalled. Confinity’s cofounders politely left the meeting—but smarted at the terms, which they considered lopsided. At a subsequent meeting at the restaurant Il Fornaio, Confinity’s investors Pete Buhl and John Malloy attended—and balked at the lowball terms. “We walked out of the room and said, ‘There’s no way,’” Buhl recalled.',
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
            url: 'https://www.amazon.com/Elon-Musk-Walter-Isaacson/dp/1982181281',
            text: 'The brothers rented a tiny office in Palo Alto that had room for two desks and futons. For the first six months, they slept in the office and showered at the YMCA. Kimbal, who would later become a chef and restaurateur, got an electric coil and cooked meals occasionally. But mainly they ate at Jack in the Box, because it was cheap, open twenty-four hours, and just a block away. “I can still tell you every single menu item,” Kimbal says. “It’s just seared into my brain.” Elon became a fan of the teriyaki bowl.',
          },
        ],
      },
    ],
  },
  {
    name: 'Kaygetsu',
    address: '325 Sharon Park Dr, Menlo Park, CA 94025, United States',
    category: 'Restaurant',
    closed: true,
    latlng: [37.42357638442663, -122.19717598401411],
    events: [
      {
        description:
          'Steve Jobs relocated his favourite Japanese restaurant to Apple HQ',
        people: ['Steve Jobs', 'Toshio Sakuma'],
        year: 2011,
        category: 'Technology',
        quotes: [
          {
            title: "Steve Jobs' Life By Design",
            authors: ['George Beahm'],
            url: 'https://www.amazon.com/Steve-Jobs-Life-Design-Lessons/dp/1137279834',
            text: "Back home, Jobs frequented two Palo Alto restaurants—Jinsho and Kaygetsu—where the food was carefully prepared by experienced Japanese chefs. (When Kaygetsu closed, Jobs wooed its chef to Apple's cafeteria, to the delight of its employees who shared Jobs’ enthusiasm for authentic Japanese cuisine.)",
          },
        ],
      },
    ],
  },
  {
    name: 'Madera',
    address: '2825 Sand Hill Rd, Menlo Park, CA 94025, United States',
    category: 'Restaurant',
    closed: false,
    latlng: [37.41976664174141, -122.2118057324804],
    events: [
      {
        description:
          'Groupon executives celebrated a $5.75bn acquisition offer from Google here',
        people: ['Andrew Mason', 'Eric Lefkofsky', 'Rob Solomon'],
        year: 2010,
        category: 'Technology',
        quotes: [
          {
            title: "Groupon's Biggest Deal Ever",
            authors: ['Frank Sennett'],
            url: 'https://www.amazon.com/Groupons-Biggest-Deal-Ever-Unbelievable/dp/125000084X',
            text: 'Around 9:00 p.m., Mason, Lefkofsky, and Solomon returned to the Rosewood Sand Hill, a luxury hotel in Menlo Park on Sand Hill Road, the fabled street of dreams for seekers of venture capital in Silicon Valley. The trio retired to Madera, the Rosewood restaurant where many a high-tech deal is sealed and celebrated. It was just before closing time, and they had the place all to themselves.',
          },
        ],
      },
    ],
  },
  {
    name: 'The Creamery',
    address: '685 4th St, San Francisco, CA 94107, United States',
    category: 'Restaurant',
    closed: true,
    latlng: [37.77745378363689, -122.39515752763064],
    events: [
      {
        description: 'Coinbase co-founders first met here',
        people: ['Brian Armstrong', 'Fred Ehrsam'],
        year: 2012,
        category: 'Technology',
        quotes: [
          {
            title: 'Kings of Crypto',
            authors: ['Jeff John Roberts'],
            url: 'https://www.amazon.com/Kings-Crypto-Startups-Cryptocurrency-Silicon/dp/1647820189',
            text: 'Fred and Brian met at The Creamery. Like so many other famous Silicon Valley venues, The Creamery doesn’t look like much: a low-slung, single-story wooden building with white letters above the doorframe; a small patio; some seat-yourself indoor tables; a menu of breakfast sandwiches, salads, and the usual assortment of cocktails and cappuccinos. It’s a modest place on a nondescript San Francisco street corner, yet its walls have heard billions of dollars’ worth of venture capital deals and countless startup pitches for massive successes and failures alike.',
          },
        ],
      },
    ],
  },
  {
    name: 'The Village Pub',
    address: '2967 Woodside Rd, Woodside, CA 94062, United States',
    category: 'Restaurant',
    closed: false,
    latlng: [37.42884624885372, -122.25146664326634],
    events: [
      {
        description:
          'Mark Zuckerberg faced a moral dilemma in the bathroom here',
        people: [
          'Jim Breyer',
          'Matt Cohler',
          'Kevin Efrusy',
          'Sean Parker',
          'Mark Zuckerberg',
        ],
        year: 2005,
        category: 'Technology',
        quotes: [
          {
            title:
              'The Facebook Effect: The Inside Story of the Company That Is Connecting the World',
            authors: ['David Kirkpatrick'],
            url: 'https://www.amazon.com/Facebook-Effect-Inside-Company-Connecting/dp/1439102112',
            text: 'That night, Jim Breyer hosted a dinner for Thefacebook’s leaders at the elegant and expensive Village Pub near Breyer’s home in tony Woodside, north of Palo Alto. At the table were Zuckerberg, Parker, Cohler, and Efrusy. The Pub is known for its wine list, and Breyer, a wine connoisseur, ordered a $400 bottle of Quilceda Creek Cabernet. Zuckerberg, still only twenty and below drinking age, ordered a Sprite. The point of the dinner was in part for Efrusy and Breyer to get better acquainted with Zuckerberg, who had been mostly quiet in their meetings up until then.',
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
