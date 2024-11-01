import L, { LatLng, LatLngBounds } from 'leaflet';

export type EventCategory =
  | 'Applied Arts'
  | 'Archaeology and Ethnography'
  | 'Architecture and Building'
  | 'Armed Forces'
  | 'Aviation'
  | 'Cartography'
  | 'Cartoons and Illustration'
  | 'Collecting and Antiquities'
  | 'Commerce and Business'
  | 'Economics and Statistics'
  | 'Education'
  | 'Engineering and Transport'
  | 'Fine Arts'
  | 'Food and Drink'
  | 'Gardening'
  | 'Historical Sites'
  | 'History and Biography'
  | 'Industry and Invention'
  | 'Journalism and Publishing'
  | 'Law and Law Enforcement'
  | 'Literature'
  | 'Medicine'
  | 'Music and Dance'
  | 'Music Hall and Radio Comedy'
  | 'Other'
  | 'Overseas Visitors'
  | 'Philanthropy and Reform'
  | 'Philosophy'
  | 'Politics and Administration'
  | 'Radio and Television'
  | 'Religion'
  | 'Science'
  | 'Sport'
  | 'Technology'
  | 'Theatre and Film'
  | 'Travel and Exploration';

export type PlaceType = {
  name: string;
  address: string;
  category: string;
  closed: boolean;
  latlng: LatLng;
  events: EventType[];
};

export type EventType = {
  description: string;
  date: Date;
  category: EventCategory;
  people: string[];
  quotes: QuoteType[];
};

export type QuoteType = {
  text: string;
  authors: string[];
  title: string;
};

export async function getBoundedPlaces(
  bounds: LatLngBounds,
): Promise<PlaceType[]> {
  const places = await getPlaces();
  return places.filter((place) => bounds.contains(place.latlng));
}

export async function getPlaces(): Promise<PlaceType[]> {
  return [
    {
      name: 'Evvia Estiatorio',
      address: '420 Emerson St, Palo Alto, CA 94301, United States',
      category: 'Greek restaurant',
      closed: false,
      latlng: L.latLng(37.44517395192061, -122.16378052454957),
      events: [
        {
          description: 'The merger of X and Confinity was negotiated here.',
          date: new Date(2000, 0),
          category: 'Technology',
          people: ['Bill Harris', 'Max Levchin', 'Elon Musk', 'Peter Thiel'],
          quotes: [
            {
              text: 'Musk and his new CEO Bill Harris scheduled a meeting with Thiel and Levchin in the back room of Evvia, a Greek restaurant in Palo Alto. The two sides traded notes about how many users each had, with Musk engaging in some of his usual exaggerations. Thiel asked him how he envisioned potential merger terms.“We would own ninety percent of the merged company and you would own ten percent,” Musk replied. Levchin was not quite sure what to make of Musk. Was he serious? They had roughly equal user bases.“He had an extremely serious I’m-not-joking look on his face, but underneath there seemed to be an ironic streak,” Levchin says. As Musk later conceded,“We were playing a game.”',
              title: 'Elon Musk',
              authors: ['Walter Isaacson'],
            },
          ],
        },
      ],
    },
  ];
}
