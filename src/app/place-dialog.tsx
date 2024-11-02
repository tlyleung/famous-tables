import { Button } from '@/components/catalyst/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog';
import { Divider } from '@/components/catalyst/divider';
import { PlaceType } from '@/data';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

const DynamicMiniMap = dynamic(() => import('@/components/mini-map'), {
  ssr: false,
});

export default function PlaceDialog({
  place,
  setPlace,
  setMiniMap,
}: {
  place: PlaceType;
  setPlace: (place: PlaceType | null) => void;
  setMiniMap: (map: L.Map | null) => void;
}) {
  return (
    <Dialog open={place != null} onClose={() => setPlace(null)}>
      <DialogTitle>{place.name}</DialogTitle>
      <DialogDescription>{place.address}</DialogDescription>
      <DialogBody className="text-base/6 text-zinc-900 sm:text-sm/6 dark:text-white">
        <DynamicMiniMap place={place} setMiniMap={setMiniMap} />
        {place.events.map((event, eventIndex) => (
          <Fragment key={`event-${eventIndex}`}>
            {eventIndex > 0 && <Divider className="my-6" />}
            <div>
              <p className="mb-4">{`${event.description} in ${event.year}.`}</p>
              {event.quotes.map((quote, quoteIndex) => (
                <div
                  key={`quote-${quoteIndex}`}
                  className="mb-4 text-zinc-500 dark:text-zinc-400"
                >
                  <blockquote>
                    <p>“{quote.text}”</p>
                  </blockquote>
                  <p>
                    ― {quote.authors.join(', ')}, <em>{quote.title}</em>
                  </p>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => setPlace(null)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
