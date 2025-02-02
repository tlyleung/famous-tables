import { Badge } from '@/components/catalyst/badge';
import { Button } from '@/components/catalyst/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog';
import { Divider } from '@/components/catalyst/divider';
import {
  Description,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Select } from '@/components/catalyst/select';
import { Switch, SwitchField } from '@/components/catalyst/switch';
import { Textarea } from '@/components/catalyst/textarea';
import { PlaceType } from '@/data';
import { BookmarkIcon, LinkIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const DynamicMiniMap = dynamic(
  () => import('@/components/map').then((mod) => mod.MiniMap),
  { ssr: false },
);

export function PlaceDialog({
  miniMap,
  setMiniMap,
  place,
  setPlace,
}: {
  miniMap: L.Map | null;
  setMiniMap: (map: L.Map | null) => void;
  place: PlaceType;
  setPlace: (place: PlaceType | null) => void;
}) {
  const [buttonText, setButtonText] = useState('Copy Link');

  const handleCopy = () => {
    const baseUrl = `${location.protocol}//${location.host}${location.pathname}`;
    navigator.clipboard.writeText(
      `${baseUrl}?p=${encodeURIComponent(place.name)}`,
    );
    setButtonText('Link Copied');
    setTimeout(() => setButtonText('Share'), 3000);
  };

  return (
    <Dialog open={place != null} onClose={() => setPlace(null)}>
      <DialogTitle>
        <span>{place.name}</span>
        {place.closed && (
          <Badge color="red" className="ml-2">
            Permanently Closed
          </Badge>
        )}
      </DialogTitle>
      <DialogDescription>{place.address}</DialogDescription>
      <DialogBody className="text-base/6 text-zinc-900 sm:text-sm/6 dark:text-white">
        <div className="mb-6 flex space-x-4">
          <Button outline onClick={handleCopy}>
            <LinkIcon />
            {buttonText}
          </Button>
          <Button outline disabled>
            <BookmarkIcon />
            Save Place
          </Button>
        </div>
        <DynamicMiniMap
          place={place}
          miniMap={miniMap}
          setMiniMap={setMiniMap}
        />
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
                    <p>{quote.text}</p>
                  </blockquote>
                  {quote.url ? (
                    <p>
                      ―{' '}
                      <Link
                        className="underline"
                        href={`${quote.url}?tag=${process.env.NEXT_PUBLIC_TAG}`}
                      >
                        {quote.authors.join(', ')}, <em>{quote.title}</em>
                      </Link>
                    </p>
                  ) : (
                    <p>
                      ― {quote.authors.join(', ')}, <em>{quote.title}</em>
                    </p>
                  )}
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

export function SuggestionDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  // Define the Zod schema
  const schema = z.object({
    placeName: z.string().min(1, 'Place name is required'),
    placeAddress: z.string().min(1, 'Street address is required'),
    placeCategory: z.string().min(1, 'Category is required'),
    placeClosed: z.boolean(),
    eventDescription: z
      .string()
      .min(1, 'Event description is required')
      .max(140, 'Event description must be under 140 characters'),
    eventYear: z
      .number()
      .min(0, 'Year must be at least 0')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    eventCategory: z.string().min(1, 'Category is required'),
    eventPeople: z.string().min(1, 'At least one person is required'),
    quoteTitle: z.string().min(1, 'Book title is required'),
    quoteAuthors: z.string().min(1, 'At least one author is required'),
    quoteText: z.string().min(1, 'Quote is required'),
    quoteUrl: z
      .string()
      .url('Link URL must be a valid or left blank')
      .optional()
      .or(z.literal('')),
  });

  // Integrate with React Hook Form using zodResolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      placeName: '',
      placeAddress: '',
      placeCategory: 'Restaurant',
      placeClosed: false,
      eventDescription: '',
      eventPeople: '',
      eventYear: new Date().getFullYear(),
      eventCategory: 'Other',
      quoteTitle: '',
      quoteAuthors: '',
      quoteText: '',
      quoteUrl: '',
    },
  });

  const eventDescription = watch('eventDescription');
  const placeClosed = watch('placeClosed');

  // Called only if validation passes
  const onSubmit = (data: any) => {
    const formData = {
      name: data.placeName,
      address: data.placeAddress,
      category: data.placeCategory,
      closed: data.placeClosed,
      latlng: null,
      events: [
        {
          description: data.eventDescription,
          people: data.eventPeople
            .split(',')
            .map((person: string) => person.trim()),
          year: data.eventYear,
          category: data.eventCategory,
          quotes: [
            {
              title: data.quoteTitle,
              authors: data.quoteAuthors
                .split(',')
                .map((author: string) => author.trim()),
              url: data.quoteUrl,
              text: data.quoteText,
            },
          ],
        },
      ],
    };

    // Convert JSON to string and open mail client
    const jsonContent = JSON.stringify(formData, null, 2);

    // Email body with structured message and JSON footer
    const emailBody = `Hello,

I would like to add the following place to Famous Tables:

Place
- Place name: ${formData.name}
- Street address: ${formData.address}
- Category: ${formData.category}
- Permanently closed: ${formData.closed ? 'Yes' : 'No'}

Event
- Event description: ${formData.events[0].description}
- People involved: ${formData.events[0].people.join(', ')}
- Year: ${formData.events[0].year}
- Category: ${formData.events[0].category}

Book
- Book title: ${formData.events[0].quotes[0].title}
- Authors: ${formData.events[0].quotes[0].authors.join(', ')}
- Link URL: ${formData.events[0].quotes[0].url}
- Quote: "${formData.events[0].quotes[0].text}"

---

Note: The JSON data below is auto-generated. Please do not modify.

${jsonContent}
`;

    // Generate mailto link with the formatted email content
    const mailtoLink = `mailto:timothyleung@gmail.com?subject=Suggested Place: ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    // Close dialog
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Suggest a Place</DialogTitle>
      <DialogDescription>
        Suggest an important event at a bar or restaurant that has been
        mentioned in a book.
      </DialogDescription>
      <DialogBody>
        <Fieldset>
          <Legend>Place</Legend>
          <FieldGroup>
            <Field>
              <Label>Place name</Label>
              <Input
                {...register('placeName')}
                invalid={!!errors.placeName}
                autoFocus
              />
              {errors.placeName && (
                <ErrorMessage>{String(errors.placeName.message)}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Street address</Label>
              <Input
                {...register('placeAddress')}
                invalid={!!errors.placeAddress}
              />
              {errors.placeAddress && (
                <ErrorMessage>
                  {String(errors.placeAddress.message)}
                </ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Category</Label>
              <Select
                {...register('placeCategory')}
                invalid={!!errors.placeCategory}
              >
                <option>Bar</option>
                <option>Restaurant</option>
              </Select>
              {errors.placeCategory && (
                <ErrorMessage>
                  {String(errors.placeCategory.message)}
                </ErrorMessage>
              )}
            </Field>
            <SwitchField>
              <Label>Permanently closed</Label>
              <Switch
                checked={placeClosed}
                onChange={(checked) => setValue('placeClosed', checked)}
              />
            </SwitchField>
          </FieldGroup>
          <Divider className="my-8" />
          <Legend>Event</Legend>
          <FieldGroup>
            <Field>
              <Label>Event description</Label>
              <Textarea
                {...register('eventDescription')}
                invalid={!!errors.eventDescription}
              />
              {!errors.eventDescription && eventDescription.length <= 140 && (
                <Description>{`${eventDescription.length}/140`}</Description>
              )}
              {!errors.eventDescription && eventDescription.length > 140 && (
                <ErrorMessage>{`${eventDescription.length}/140`}</ErrorMessage>
              )}
              {errors.eventDescription && (
                <ErrorMessage>
                  {String(errors.eventDescription.message)}
                </ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>People involved</Label>
              <Description>Separate names with commas</Description>
              <Input
                {...register('eventPeople')}
                invalid={!!errors.eventPeople}
              />
              {errors.eventPeople && (
                <ErrorMessage>
                  {String(errors.eventPeople.message)}
                </ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Year</Label>
              <Input
                type="number"
                {...register('eventYear', { valueAsNumber: true })}
                invalid={!!errors.eventYear}
              />
              {errors.eventYear && (
                <ErrorMessage>{String(errors.eventYear.message)}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Category</Label>
              <Select
                {...register('eventCategory')}
                invalid={!!errors.eventCategory}
              >
                <option>Applied Arts</option>
                <option>Archaeology and Ethnography</option>
                <option>Architecture and Building</option>
                <option>Armed Forces</option>
                <option>Aviation</option>
                <option>Cartography</option>
                <option>Cartoons and Illustration</option>
                <option>Collecting and Antiquities</option>
                <option>Commerce and Business</option>
                <option>Economics and Statistics</option>
                <option>Education</option>
                <option>Engineering and Transport</option>
                <option>Fine Arts</option>
                <option>Food and Drink</option>
                <option>Gardening</option>
                <option>Historical Sites</option>
                <option>History and Biography</option>
                <option>Industry and Invention</option>
                <option>Journalism and Publishing</option>
                <option>Law and Law Enforcement</option>
                <option>Literature</option>
                <option>Medicine</option>
                <option>Music and Dance</option>
                <option>Music Hall and Radio Comedy</option>
                <option>Other</option>
                <option>Overseas Visitors</option>
                <option>Philanthropy and Reform</option>
                <option>Philosophy</option>
                <option>Politics and Administration</option>
                <option>Radio and Television</option>
                <option>Religion</option>
                <option>Science</option>
                <option>Sport</option>
                <option>Technology</option>
                <option>Theatre and Film</option>
                <option>Travel and Exploration</option>
              </Select>
              {errors.eventCategory && (
                <ErrorMessage>
                  {String(errors.eventCategory.message)}
                </ErrorMessage>
              )}
            </Field>
          </FieldGroup>
          <Divider className="my-8" />
          <Legend>Book</Legend>
          <FieldGroup>
            <Field>
              <Label>Book title</Label>
              <Input
                {...register('quoteTitle')}
                invalid={!!errors.quoteTitle}
              />
              {errors.quoteTitle && (
                <ErrorMessage>{String(errors.quoteTitle.message)}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Author(s)</Label>
              <Description>Separate names with commas</Description>
              <Input
                {...register('quoteAuthors')}
                invalid={!!errors.quoteAuthors}
              />
              {errors.quoteAuthors && (
                <ErrorMessage>
                  {String(errors.quoteAuthors.message)}
                </ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Link URL (optional)</Label>
              <Input {...register('quoteUrl')} invalid={!!errors.quoteUrl} />
              {errors.quoteUrl && (
                <ErrorMessage>{String(errors.quoteUrl.message)}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Quote</Label>
              <Description>
                Include the entire paragraph where the place is mentioned.
              </Description>
              <Textarea
                {...register('quoteText')}
                invalid={!!errors.quoteText}
              />
              {errors.quoteText && (
                <ErrorMessage>{String(errors.quoteText.message)}</ErrorMessage>
              )}
            </Field>
          </FieldGroup>
        </Fieldset>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
