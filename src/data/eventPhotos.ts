import type { MediaKey } from './media';

export type EventPhoto = {
  image: MediaKey;
  alt: string;
  caption: string;
  sourceIndex?: number;
  privacyStickers?: boolean;
};

export const eventPhotos: Record<string, EventPhoto[]> = {
  weddings: [
    {
      image: 'actualCoastalWeddingLift',
      alt: 'A couple embracing on a rocky beach with a white wedding gown in the breeze',
      caption: 'A moment by the water.',
      sourceIndex: 1,
    },
    {
      image: 'actualCoastalWeddingPortrait',
      alt: 'A wedding couple standing together above the ocean',
      caption: 'A portrait by the ocean.',
      sourceIndex: 4,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWedding',
      alt: 'A bride seen from behind in a white gown overlooking the ocean',
      caption: 'The final impression.',
      sourceIndex: 5,
    },
    {
      image: 'actualCoastalWeddingMonochrome',
      alt: 'A black and white portrait of a wedding couple embracing by the ocean',
      caption: 'A quiet moment together.',
      sourceIndex: 6,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingEmbrace',
      alt: 'A wedding couple embracing beside coastal rocks and the ocean',
      caption: 'Close to the coast.',
      sourceIndex: 7,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingFamily',
      alt: 'A wedding couple with three family members overlooking the ocean',
      caption: 'Together by the water.',
      sourceIndex: 8,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingParty',
      alt: 'A wedding couple kissing in the middle of their wedding party by the ocean',
      caption: 'The whole wedding party.',
      sourceIndex: 9,
    },
    {
      image: 'actualCoastalWeddingBouquet',
      alt: 'A wedding couple with a white orchid bouquet in soft coastal sunlight',
      caption: 'Orchids and ocean light.',
      sourceIndex: 10,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingFloralFrame',
      alt: 'A wedding couple framed by white orchids against a blue sky',
      caption: 'A floral point of view.',
      sourceIndex: 11,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingSunlight',
      alt: 'A wedding couple embracing with sunlight falling across their portrait',
      caption: 'In the afternoon light.',
      sourceIndex: 12,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingBeachEmbrace',
      alt: 'A wedding couple embracing beside waves on a rocky beach',
      caption: 'Along the shoreline.',
      sourceIndex: 13,
    },
    {
      image: 'actualWeddingSweetheartTable',
      alt: 'A wedding couple kissing behind flowers at their sweetheart table',
      caption: 'A table for two.',
      sourceIndex: 14,
    },
    {
      image: 'actualWeddingFirstDance',
      alt: 'A wedding couple dancing with live musicians in the reception room',
      caption: 'The first dance.',
      sourceIndex: 15,
    },
    {
      image: 'actualWeddingBalloonExit',
      alt: 'A wedding couple walking beneath colorful balloons held by guests',
      caption: 'A joyful farewell.',
      sourceIndex: 16,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingBouquetCloseup',
      alt: 'A close portrait of a wedding couple with white orchids in coastal light',
      caption: 'The bouquet, up close.',
      sourceIndex: 17,
      privacyStickers: true,
    },
    {
      image: 'actualWeddingStaircase',
      alt: 'A bride in a white gown on a stone staircase with a curved iron railing',
      caption: 'A setting with character.',
      sourceIndex: 18,
    },
    {
      image: 'actualGardenCeremony',
      alt: 'A couple walking between rows of white ceremony chairs in a sunlit garden',
      caption: 'Room for the moment.',
      sourceIndex: 19,
      privacyStickers: true,
    },
    {
      image: 'actualCoastalWeddingPartyWide',
      alt: 'A wide portrait of a wedding party with the couple kissing at its center',
      caption: 'Everyone in the frame.',
      sourceIndex: 20,
    },
    {
      image: 'actualWeddingDanceMusicians',
      alt: 'A wedding couple dancing in a draped room with live musicians',
      caption: 'Music in the room.',
      sourceIndex: 21,
    },
    {
      image: 'actualCoastalWeddingEmbraceCloseup',
      alt: 'A close crop of a bride leaning against a groom in a dark wedding suit',
      caption: 'An intimate detail.',
      sourceIndex: 22,
    },
    {
      image: 'actualWeddingTablescape',
      alt: 'Wedding tables with ivory linens, floral centerpieces, gold chargers, and blue goblets',
      caption: 'The table, thoughtfully set.',
      sourceIndex: 23,
    },
    {
      image: 'actualGardenWeddingRecessional',
      alt: 'A wedding couple walking down a garden aisle beneath string lights',
      caption: 'A garden celebration.',
      sourceIndex: 24,
      privacyStickers: true,
    },
    {
      image: 'actualGardenWeddingFamily',
      alt: 'A groom and children beside a white garden fence and flowering greenery',
      caption: 'A family moment outside.',
      sourceIndex: 25,
    },
    {
      image: 'actualWeddingBridalGroup',
      alt: 'A bride with two companions posing beside a large teddy bear in black and white',
      caption: 'A playful wedding memory.',
      sourceIndex: 26,
      privacyStickers: true,
    },
  ],
  'baby-bridal-showers': [
    {
      image: 'actualPinkShowerCouple',
      alt: 'A couple posing beside pink and copper balloons at a baby shower',
      caption: 'A little one on the way.',
      sourceIndex: 27,
      privacyStickers: true,
    },
    {
      image: 'actualPinkShowerBackdrop',
      alt: 'A couple at a baby shower framed by pink and copper balloons, florals, and a gold arch',
      caption: 'A welcome in pink and copper.',
      sourceIndex: 28,
      privacyStickers: true,
    },
    {
      image: 'actualPinkShowerFamily',
      alt: 'An expectant mother with two relatives beside a pink and copper balloon display',
      caption: 'Gathered around a new beginning.',
      sourceIndex: 29,
      privacyStickers: true,
    },
    {
      image: 'actualPinkShowerFamilyPortrait',
      alt: 'An expectant mother and a relative standing beside pink and copper balloons',
      caption: 'A moment to remember.',
      sourceIndex: 30,
      privacyStickers: true,
    },
  ],
  'birthdays-milestones': [
    {
      image: 'actualMilestoneDessertTable',
      alt: 'A fiftieth birthday dessert table beneath black, gold, and silver balloons',
      caption: 'Fifty, worth celebrating.',
      sourceIndex: 2,
    },
    {
      image: 'actualMilestoneLiveMusic',
      alt: 'Musicians performing beneath a canopy beside a birthday balloon display',
      caption: 'A celebration with a soundtrack.',
      sourceIndex: 3,
    },
    {
      image: 'actualCupcakeDisplay',
      alt: 'Cupcakes topped with cherries on vintage floral tiered stands',
      caption: 'A little nostalgia.',
    },
    {
      image: 'actualBirthdayGiftTable',
      alt: 'Birthday gifts and framed family photographs arranged on red linen',
      caption: 'Personal from the start.',
    },
  ],
};

export const photoBoothPhotos: EventPhoto[] = [
  {
    image: 'actualOutdoorPhotoBooth',
    alt: 'An outdoor photo booth beside a white table of colorful photo props',
    caption: 'An invitation to join in.',
    sourceIndex: 31,
  },
  {
    image: 'actualOutdoorPhotoBoothProps',
    alt: 'An outdoor photo booth with colorful props arranged on a white table',
    caption: 'Props for every personality.',
    sourceIndex: 32,
  },
  {
    image: 'actualIndoorPhotoBoothGuests',
    alt: 'A colorful photo booth and prop table with guests in the reception room',
    caption: 'A spot for shared memories.',
    sourceIndex: 33,
  },
  {
    image: 'actualPhotoBoothStyling',
    alt: 'A photo booth and prop table beside a pink draped backdrop and floral arrangements',
    caption: 'A corner with its own character.',
    sourceIndex: 34,
  },
  {
    image: 'actualIndoorPhotoBoothDetails',
    alt: 'A photo booth with a glowing purple frame and a table of playful props',
    caption: 'Ready for the next photo.',
    sourceIndex: 35,
  },
  {
    image: 'actualDrapedPhotoBackdrop',
    alt: 'Pink and ivory draping with purple lighting behind a white photo platform',
    caption: 'Color, texture, and light.',
    sourceIndex: 36,
  },
  {
    image: 'actualGardenPhotoBooth',
    alt: 'A garden photo booth with colorful props and pastel balloon decorations',
    caption: 'A playful outdoor setup.',
    sourceIndex: 37,
  },
];
