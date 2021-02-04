import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {
  HistoryEntry,
  DefinitionElement,
} from 'src/app/interfaces/history-entry';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent implements OnInit, AfterViewInit {
  constructor(private source: SourceService) {
    // console.log(this.source.history);
    console.log(source.history);
  }

  // returnPropName(obj) {
  //   // console.log(obj);

  //   return Object.keys(obj);
  // }
  // returnProp(obj, prop) {
  //   // console.log(obj);

  //   let propName = this.returnPropName(obj);
  //   return obj[`${propName}`][prop];
  // }

  @ViewChildren('td') td: QueryList<ElementRef>;

  firstTurn = this.source.firstTurn;
  gameOver = this.source.gameOver;

  dataSource: HistoryEntry[] = def; /* .slice(0, -1) */
  displayedColumns = ['move', 'opponent', 'player'];

  // lastEntry: any = this.source.history[this.source.history.length - 1];
  lastEntry: any = def[def.length - 1];
  log(...rest) {
    console.log(...rest);
    // console.log(this.source.history);
  }
  expandedElement:
    | DefinitionElement[]
    | null; /* = this.source.history.map(
    (x) => x.definitions
  ) */

  isExpansionDetailRow = (i: number, row: any) => {
    if (i == 0) console.log(i, row); //!change to no def and return false

    if (!row.points) return false;
    return true;
  };

  scrollInView(el: HTMLElement, el2: HTMLElement) {
    // clearTimeout(this.timer);

    // console.log(this.lastEntry, this.source.history);

    setTimeout(() => {
      // console.log('start'); TODO: limit the amount of calls

      el.scrollTo({
        top: el2.offsetTop - (el2.offsetHeight - 35),
        behavior: 'smooth',
      });
    }, 225);

    return 'expanded';
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let el = this.td.toArray()[this.dataSource.length - 2].nativeElement;
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);
  }
}

let def: any[] = [
  {
    isAI: false,
    word: 'Mir',
    definitions: [
      {
        headword: 'mir',
        definitions: [
          {
            id: 1221807,
            dic: 16,
            part: 'NOUN',
            txt:
              'A village community of peasant farmers in prerevolutionary Russia.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221808,
            dic: 2,
            part: 'NOUN',
            txt: 'In czarist Russia, a village community of peasant farmers.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221809,
            dic: 2,
            part: 'ABR',
            txt: 'Middle Irish.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221810,
            dic: 11,
            txt:
              '(<b>M</b>usic <b>I</b>nformation <b>R</b>etrieval) See <a>music search</a>.',
            link: ['music-search'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221811,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> mirs)',
            txt: 'A <a>Russian</a> <a>village</a> <a>community</a>.',
            link: ['Russian', 'village', 'community'],
            ex: [''],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221812,
            dic: 26,
            part: 'PRON',
            txt: 'A <a>Soviet</a>, later <a>Russian</a> space station.',
            link: ['Soviet', 'Russian'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221813,
            dic: 26,
            part: 'PRON',
            spart: ' (Transliteration of مصر)',
            txt: 'Alternative form of <i><a>Masr</a></i>.',
            link: ['Masr'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        filteredDefinitions: [
          {
            id: 1221807,
            dic: 16,
            part: 'NOUN',
            txt:
              'A village community of peasant farmers in prerevolutionary Russia.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221808,
            dic: 2,
            part: 'NOUN',
            txt: 'In czarist Russia, a village community of peasant farmers.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221809,
            dic: 2,
            part: 'ABR',
            txt: 'Middle Irish.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221810,
            dic: 11,
            txt:
              '(<b>M</b>usic <b>I</b>nformation <b>R</b>etrieval) See <a>music search</a>.',
            link: ['music-search'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221811,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> mirs)',
            txt: 'A <a>Russian</a> <a>village</a> <a>community</a>.',
            link: ['Russian', 'village', 'community'],
            ex: [''],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221812,
            dic: 26,
            part: 'PRON',
            txt: 'A <a>Soviet</a>, later <a>Russian</a> space station.',
            link: ['Soviet', 'Russian'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1221813,
            dic: 26,
            part: 'PRON',
            spart: ' (Transliteration of مصر)',
            txt: 'Alternative form of <i><a>Masr</a></i>.',
            link: ['Masr'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        audio: 'en/mir.mp3',
        pronunciation: 'mîr ',
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26, 11], active: [] },
          pos: { default: ['NOUN', 'ABR', 'PRON'], active: [] },
          category: { default: [], active: [] },
        },
        origin: {
          txt:
            'Russian <i>commune, peace</i> <i>from</i> Old Church Slavonic <i>mirŭ</i> <i>peace</i> <i>possibly of Iranian origin</i> ',
        },
        userDevice: null,
      },
    ],
    points: 10,
    score: { computerScore: 0, playerScore: 10 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Bindi',
    definitions: [
      {
        headword: 'bindi',
        definitions: [
          {
            id: 1593112,
            dic: 16,
            part: 'NOUN',
            txt:
              'An ornamental dot traditionally worn by Hindu women in the middle of the forehead or between the eyebrows, made of colored sandalwood paste, kohl, or other pigment and having varying religious and social significance, as in indicating marital status.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593113,
            dic: 16,
            part: 'NOUN',
            txt:
              'A small body adornment, often a colored or jeweled sticker, worn on various parts of the face and body.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593114,
            dic: 2,
            part: 'NOUN',
            txt: 'A small dot worn on the forehead by women in India.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593115,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> bindis)',
            txt:
              'The “holy dot” traditionally worn on the <a>forehead</a> of <a>married</a> <a>Hindu</a> women.',
            link: ['forehead', 'married', 'Hindu'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593116,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> bindis)',
            txt:
              '<a>Makeup</a> or <a>jewellery</a> worn in imitation of such a dot.',
            link: ['Makeup', 'jewellery'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593117,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> bindis)',
            txt:
              '(Australia, slang) A tiny, sharp-needled <a>seed</a> often found on the ground in the <a>bush</a>.',
            link: ['seed', 'bush'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        filteredDefinitions: [
          {
            id: 1593112,
            dic: 16,
            part: 'NOUN',
            txt:
              'An ornamental dot traditionally worn by Hindu women in the middle of the forehead or between the eyebrows, made of colored sandalwood paste, kohl, or other pigment and having varying religious and social significance, as in indicating marital status.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593113,
            dic: 16,
            part: 'NOUN',
            txt:
              'A small body adornment, often a colored or jeweled sticker, worn on various parts of the face and body.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593114,
            dic: 2,
            part: 'NOUN',
            txt: 'A small dot worn on the forehead by women in India.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593115,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> bindis)',
            txt:
              'The “holy dot” traditionally worn on the <a>forehead</a> of <a>married</a> <a>Hindu</a> women.',
            link: ['forehead', 'married', 'Hindu'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593116,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> bindis)',
            txt:
              '<a>Makeup</a> or <a>jewellery</a> worn in imitation of such a dot.',
            link: ['Makeup', 'jewellery'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1593117,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> bindis)',
            txt:
              '(Australia, slang) A tiny, sharp-needled <a>seed</a> often found on the ground in the <a>bush</a>.',
            link: ['seed', 'bush'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        audio: 'en/bindi.mp3',
        pronunciation: "bĭn'dē ",
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26], active: [] },
          pos: { default: ['NOUN'], active: [] },
          category: { default: [], active: [] },
        },
        origin: {
          txt:
            'Hindi <i>bindī</i> <i>from</i> Middle Indic <i>biṃdu</i> <i>drop, spot</i> <i>from</i> Sanskrit <i>binduḥ</i> <i>perhaps akin to</i> <i>induḥ</i> <i>drop</i> ',
        },
        definitionImage: {
          target: 'main/A5bindi.jpg',
          caption: 'bindi ',
          credits: {
            source: 'SuperStock ',
            abbr: 'SS ',
            photo: 'PhotosIndia.com ',
          },
        },
        userDevice: null,
      },
    ],
    points: 11,
    score: { computerScore: 11, playerScore: 10 },
    skip: false,
  },
  {
    isAI: false,
    word: 'Re, El',
    definitions: [
      {
        headword: 're',
        definitions: [
          {
            id: 1293040,
            dic: 99,
            part: 'ABR',
            txt: 'Re is defined as an abbreviation for regarding.',
            ex: [
              'An example of re is giving a few words at the top of a business letter to say what the letter is about.',
            ],
            upvotes: 13,
            downvotes: 4,
          },
          {
            id: 1293027,
            dic: 2,
            part: 'ABR',
            txt: 'Rupee.',
            upvotes: 4,
            downvotes: 3,
          },
          {
            id: 1293028,
            dic: 2,
            part: 'SYM',
            txt: 'Rhenium.',
            upvotes: 3,
            downvotes: 3,
          },
          {
            id: 1293029,
            dic: 2,
            part: 'ABR',
            txt: 'Reformed Episcopal.',
            upvotes: 1,
            downvotes: 4,
          },
          {
            id: 1293026,
            dic: 2,
            part: 'PRE',
            txt: 'In the matter of; as regards.',
            upvotes: 1,
            downvotes: 5,
          },
          {
            id: 2313436,
            dic: 16,
            part: '',
            txt: 'Contraction of <i>are</i> .',
            ex: ["They're not at home."],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293030,
            dic: 2,
            part: 'ABR',
            txt: 'Right Excellent.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293031,
            dic: 2,
            part: 'AFF',
            txt: 'Back, returning to a previous state.',
            ex: ['<i>Return, relapse, recall.</i>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293032,
            dic: 2,
            part: 'AFF',
            txt: 'Again, anew, over again.',
            ex: ['<i>Refurbish, recount, regelation.</i>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293033,
            dic: 2,
            part: 'AFF',
            txt: 'Are.',
            ex: ["<i>They're</i> not here; <i>what're</i> you doing?"],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293035,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>uncountable</i>)',
            txt:
              '<a>Ray</a>, a syllable used in solfÃ¨ge to represent the second note of a major scale.',
            link: ['Ray'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293036,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>uncountable</i>)',
            txt: '<a>Reinsurance</a>.',
            link: ['Reinsurance'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293037,
            dic: 26,
            part: 'ABR',
            txt: 'The <a>ccTLD</a> for Réunion as assigned by the <a>IANA</a>.',
            link: ['ccTLD', 'IANA'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293038,
            dic: 26,
            part: 'PRE',
            txt: 'In <a>response</a> to.',
            link: ['response'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293039,
            dic: 26,
            part: 'PRX',
            txt: 'Alternative form of <i>re-</i>.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293041,
            dic: 99,
            part: 'NOUN',
            txt:
              'Re represents the second syllable on an eight tone musical scale.',
            ex: [
              'An example of re is the song that Maria sings to the children to teach them about the major musical scale in the movie <i>The Sound of Music</i>.',
            ],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293021,
            dic: 16,
            part: 'PRX',
            txt: 'Again; anew.',
            ex: ['Rebuild.'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293022,
            dic: 16,
            part: 'PRX',
            txt: 'Backward; back.',
            ex: ['React.'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293023,
            dic: 16,
            part: 'PRX',
            txt: 'Used as an intensive.',
            ex: ['Refine.'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293025,
            dic: 2,
            part: 'NOUN',
            context: 'Music',
            txt:
              'A syllable representing the second tone of the diatonic scale.',
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293034,
            dic: 26,
            part: 'PRE',
            txt:
              '<a>About</a>, <a>regarding</a>, with <a>reference</a> to; especially in <a>letters</a> and <a>documents</a>.',
            link: ['About', 'regarding', 'reference', 'letters', 'documents'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293042,
            dic: 99,
            part: 'SUF',
            txt: "'Re is defined as are and is used in contractions.",
            ex: [
              'An example of \'re used as a contraction is in the word "we\'re," which means we are.',
            ],
            upvotes: 0,
            downvotes: 2,
          },
          {
            id: 1293018,
            dic: 16,
            part: 'NOUN',
            txt: 'The second tone of the diatonic scale in solfeggio.',
            upvotes: 0,
            downvotes: 2,
          },
          {
            id: 1293019,
            dic: 16,
            part: 'PRE',
            txt: 'In reference to; in the case of; concerning.',
            upvotes: 0,
            downvotes: 2,
          },
          {
            id: 1293020,
            dic: 16,
            part: 'ABR',
            txt: 'Real estate.',
            upvotes: 0,
            downvotes: 2,
          },
        ],
        filteredDefinitions: [
          {
            id: 1293040,
            dic: 99,
            part: 'ABR',
            txt: 'Re is defined as an abbreviation for regarding.',
            ex: [
              'An example of re is giving a few words at the top of a business letter to say what the letter is about.',
            ],
            upvotes: 13,
            downvotes: 4,
          },
          {
            id: 1293027,
            dic: 2,
            part: 'ABR',
            txt: 'Rupee.',
            upvotes: 4,
            downvotes: 3,
          },
          {
            id: 1293028,
            dic: 2,
            part: 'SYM',
            txt: 'Rhenium.',
            upvotes: 3,
            downvotes: 3,
          },
          {
            id: 1293029,
            dic: 2,
            part: 'ABR',
            txt: 'Reformed Episcopal.',
            upvotes: 1,
            downvotes: 4,
          },
          {
            id: 1293026,
            dic: 2,
            part: 'PRE',
            txt: 'In the matter of; as regards.',
            upvotes: 1,
            downvotes: 5,
          },
          {
            id: 2313436,
            dic: 16,
            part: '',
            txt: 'Contraction of <i>are</i> .',
            ex: ["They're not at home."],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293030,
            dic: 2,
            part: 'ABR',
            txt: 'Right Excellent.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293031,
            dic: 2,
            part: 'AFF',
            txt: 'Back, returning to a previous state.',
            ex: ['<i>Return, relapse, recall.</i>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293032,
            dic: 2,
            part: 'AFF',
            txt: 'Again, anew, over again.',
            ex: ['<i>Refurbish, recount, regelation.</i>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293033,
            dic: 2,
            part: 'AFF',
            txt: 'Are.',
            ex: ["<i>They're</i> not here; <i>what're</i> you doing?"],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293035,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>uncountable</i>)',
            txt:
              '<a>Ray</a>, a syllable used in solfÃ¨ge to represent the second note of a major scale.',
            link: ['Ray'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293036,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>uncountable</i>)',
            txt: '<a>Reinsurance</a>.',
            link: ['Reinsurance'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293037,
            dic: 26,
            part: 'ABR',
            txt: 'The <a>ccTLD</a> for Réunion as assigned by the <a>IANA</a>.',
            link: ['ccTLD', 'IANA'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293038,
            dic: 26,
            part: 'PRE',
            txt: 'In <a>response</a> to.',
            link: ['response'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293039,
            dic: 26,
            part: 'PRX',
            txt: 'Alternative form of <i>re-</i>.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1293041,
            dic: 99,
            part: 'NOUN',
            txt:
              'Re represents the second syllable on an eight tone musical scale.',
            ex: [
              'An example of re is the song that Maria sings to the children to teach them about the major musical scale in the movie <i>The Sound of Music</i>.',
            ],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293021,
            dic: 16,
            part: 'PRX',
            txt: 'Again; anew.',
            ex: ['Rebuild.'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293022,
            dic: 16,
            part: 'PRX',
            txt: 'Backward; back.',
            ex: ['React.'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293023,
            dic: 16,
            part: 'PRX',
            txt: 'Used as an intensive.',
            ex: ['Refine.'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293025,
            dic: 2,
            part: 'NOUN',
            context: 'Music',
            txt:
              'A syllable representing the second tone of the diatonic scale.',
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293034,
            dic: 26,
            part: 'PRE',
            txt:
              '<a>About</a>, <a>regarding</a>, with <a>reference</a> to; especially in <a>letters</a> and <a>documents</a>.',
            link: ['About', 'regarding', 'reference', 'letters', 'documents'],
            upvotes: 0,
            downvotes: 1,
          },
          {
            id: 1293042,
            dic: 99,
            part: 'SUF',
            txt: "'Re is defined as are and is used in contractions.",
            ex: [
              'An example of \'re used as a contraction is in the word "we\'re," which means we are.',
            ],
            upvotes: 0,
            downvotes: 2,
          },
          {
            id: 1293018,
            dic: 16,
            part: 'NOUN',
            txt: 'The second tone of the diatonic scale in solfeggio.',
            upvotes: 0,
            downvotes: 2,
          },
          {
            id: 1293019,
            dic: 16,
            part: 'PRE',
            txt: 'In reference to; in the case of; concerning.',
            upvotes: 0,
            downvotes: 2,
          },
          {
            id: 1293020,
            dic: 16,
            part: 'ABR',
            txt: 'Real estate.',
            upvotes: 0,
            downvotes: 2,
          },
        ],
        audio: 'en/re.mp3',
        pronunciation: 'rā ',
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26, 99], active: [] },
          pos: {
            default: ['ABR', 'SYM', 'PRE', 'AFF', 'NOUN', 'PRX', 'SUF'],
            active: [],
          },
          category: { default: ['Music'], active: [] },
        },
        origin: {
          txt:
            'Identical to <a>re</a> (“regarding”), via its specialized use in business correspondence, from <a>Latin</a> <i>rē</i>, ablative of <i>rēs</i> (“thing, matter”).',
          link: ['re', 'Latin'],
        },
        userDevice: null,
      },
      {
        headword: 'el',
        definitions: [
          {
            id: 1853402,
            dic: 16,
            part: 'NOUN',
            txt: 'The letter <i>l.</i>',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853403,
            dic: 16,
            part: 'NOUN',
            txt: 'An elevated railway.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853404,
            dic: 16,
            part: 'ABR',
            txt: 'Elevation.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853405,
            dic: 2,
            part: 'NOUN',
            txt: '<a>Ell.</a>',
            link: ['ell'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853406,
            dic: 2,
            part: 'NOUN',
            context: 'Informal',
            txt: 'An elevated railway.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853407,
            dic: 26,
            part: 'PRON',
            txt:
              'An ancient Semitic deity corresponding with the Hebrew <a>God.</a>',
            link: ['God'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853408,
            dic: 26,
            part: 'PRON',
            txt: 'An ancient Semitic abbreviation for <a>Elohim</a> or Eloah.',
            link: ['Elohim'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853409,
            dic: 26,
            part: 'SUF',
            txt:
              'Suffix forming nouns, originally denoting an agent, from verbs, usually spelt <i>-le</i> except after <i>n</i> and <i>e</i>.',
            ex: ['<a>Runnel</a>, <a>shovel</a>, <a>dotel.</a>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853410,
            dic: 26,
            part: 'SUF',
            txt: 'Diminutive suffix in words of Germanic origin.',
            ex: ['<a>Hatchel</a>, <a>hovel</a>, <a>gomeral.</a>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853411,
            dic: 26,
            part: 'SUF',
            txt:
              'Suffix, originally diminutive, in words of Latin or Romance origin.',
            ex: ['<a>Cupel</a>, <a>chapel</a>, <a>tunnel.</a>'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        filteredDefinitions: [
          {
            id: 1853402,
            dic: 16,
            part: 'NOUN',
            txt: 'The letter <i>l.</i>',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853403,
            dic: 16,
            part: 'NOUN',
            txt: 'An elevated railway.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853404,
            dic: 16,
            part: 'ABR',
            txt: 'Elevation.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853405,
            dic: 2,
            part: 'NOUN',
            txt: '<a>Ell.</a>',
            link: ['ell'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853406,
            dic: 2,
            part: 'NOUN',
            context: 'Informal',
            txt: 'An elevated railway.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853407,
            dic: 26,
            part: 'PRON',
            txt:
              'An ancient Semitic deity corresponding with the Hebrew <a>God.</a>',
            link: ['God'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853408,
            dic: 26,
            part: 'PRON',
            txt: 'An ancient Semitic abbreviation for <a>Elohim</a> or Eloah.',
            link: ['Elohim'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853409,
            dic: 26,
            part: 'SUF',
            txt:
              'Suffix forming nouns, originally denoting an agent, from verbs, usually spelt <i>-le</i> except after <i>n</i> and <i>e</i>.',
            ex: ['<a>Runnel</a>, <a>shovel</a>, <a>dotel.</a>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853410,
            dic: 26,
            part: 'SUF',
            txt: 'Diminutive suffix in words of Germanic origin.',
            ex: ['<a>Hatchel</a>, <a>hovel</a>, <a>gomeral.</a>'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1853411,
            dic: 26,
            part: 'SUF',
            txt:
              'Suffix, originally diminutive, in words of Latin or Romance origin.',
            ex: ['<a>Cupel</a>, <a>chapel</a>, <a>tunnel.</a>'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        audio: 'en/el.mp3',
        pronunciation: 'ĕl ',
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26], active: [] },
          pos: { default: ['NOUN', 'ABR', 'PRON', 'SUF'], active: [] },
          category: { default: ['Informal'], active: [] },
        },
        origin: {
          txt:
            'From Middle English <i>-el</i>, from Old English <i>-el</i> (agent suffix), from <a>Proto-Germanic</a> <i>*-ilaz</i> (agent suffix).',
          link: ['Proto-Germanic'],
        },
        userDevice: null,
      },
    ],
    points: 6,
    score: { computerScore: 11, playerScore: 16 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Om, Tod',
    definitions: [
      {
        headword: 'om',
        definitions: [
          {
            id: 2151131,
            dic: 99,
            part: 'NOUN',
            txt:
              'Om is a sacred Hindu and Buddhist syllable used as a mantra or in blessings to honor the universe.',
            ex: [
              'An example of Om is what people may say at the end of a yoga session to give thanks to the universe.',
            ],
            upvotes: 1,
            downvotes: 0,
          },
          {
            id: 2151125,
            dic: 16,
            part: 'NOUN',
            txt:
              'The supreme and most sacred syllable, consisting in Sanskrit of the three sounds (a), (u), and (m), representing various fundamental triads and believed to be the spoken essence of the universe. It is uttered as a mantra and in affirmations and blessings.',
            upvotes: 1,
            downvotes: 0,
          },
          {
            id: 2151126,
            dic: 2,
            part: 'NOUN',
            context: 'Hinduism',
            txt:
              'A word of affirmation or assent intoned as part of a mantra or as a symbolic mystical utterance during meditation.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151127,
            dic: 2,
            part: 'ABR',
            txt: 'Order of Merit.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151128,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> oms)',
            txt:
              '(Hinduism, Buddhism) A sacred, mystical syllable used in prayer and meditation.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151129,
            dic: 26,
            part: 'ANA',
            txt: "<a>Mo</a> , <a>Mo</a>, m/o, mo', <a>MO</a>, m.o.",
            link: ['mo', 'Mo', 'MO'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151130,
            dic: 26,
            part: 'ABR',
            txt:
              'The <a>ccTLD</a> for <a>Oman</a> as assigned by the <a>IANA</a>.',
            link: ['ccTLD', 'Oman', 'IANA'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        filteredDefinitions: [
          {
            id: 2151131,
            dic: 99,
            part: 'NOUN',
            txt:
              'Om is a sacred Hindu and Buddhist syllable used as a mantra or in blessings to honor the universe.',
            ex: [
              'An example of Om is what people may say at the end of a yoga session to give thanks to the universe.',
            ],
            upvotes: 1,
            downvotes: 0,
          },
          {
            id: 2151125,
            dic: 16,
            part: 'NOUN',
            txt:
              'The supreme and most sacred syllable, consisting in Sanskrit of the three sounds (a), (u), and (m), representing various fundamental triads and believed to be the spoken essence of the universe. It is uttered as a mantra and in affirmations and blessings.',
            upvotes: 1,
            downvotes: 0,
          },
          {
            id: 2151126,
            dic: 2,
            part: 'NOUN',
            context: 'Hinduism',
            txt:
              'A word of affirmation or assent intoned as part of a mantra or as a symbolic mystical utterance during meditation.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151127,
            dic: 2,
            part: 'ABR',
            txt: 'Order of Merit.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151128,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> oms)',
            txt:
              '(Hinduism, Buddhism) A sacred, mystical syllable used in prayer and meditation.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151129,
            dic: 26,
            part: 'ANA',
            txt: "<a>Mo</a> , <a>Mo</a>, m/o, mo', <a>MO</a>, m.o.",
            link: ['mo', 'Mo', 'MO'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2151130,
            dic: 26,
            part: 'ABR',
            txt:
              'The <a>ccTLD</a> for <a>Oman</a> as assigned by the <a>IANA</a>.',
            link: ['ccTLD', 'Oman', 'IANA'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        audio: 'en/om.mp3',
        pronunciation: 'ōm ',
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26, 99], active: [] },
          pos: { default: ['NOUN', 'ABR', 'ANA'], active: [] },
          category: { default: ['Hinduism'], active: [] },
        },
        origin: {
          txt: '. + <a>ISO</a> 3166-1 country code for <a>Oman</a>, <a>om</a>.',
          link: ['ISO', 'Oman', 'om'],
        },
        userDevice: null,
      },
      {
        headword: 'tod',
        definitions: [
          {
            id: 1634291,
            dic: 16,
            part: 'NOUN',
            txt:
              'A unit of weight for wool, especially one equivalent to about 28 pounds (12.7 kilograms).',
            upvotes: 1,
            downvotes: 0,
          },
          {
            id: 1634292,
            dic: 16,
            part: 'NOUN',
            txt: 'A bushy clump, as of ivy.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634293,
            dic: 2,
            part: 'NOUN',
            txt: 'A former English weight for wool, about 28 pounds.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634294,
            dic: 2,
            part: 'NOUN',
            txt: 'A bushy clump of ivy, etc.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634295,
            dic: 2,
            part: 'NOUN',
            context: 'Scot.',
            txt: 'A fox.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2255585,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt: '(now UK dialect) A <a>fox</a>.',
            link: ['fox'],
            ex: [''],
            upvotes: 0,
            downvotes: 0,
            subdefs: [
              {
                txt: 'A <a>male</a> fox; a <a>dog</a>; a <a>reynard</a>.',
                link: ['male', 'dog', 'reynard'],
              },
            ],
          },
          {
            id: 1634296,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt: 'Someone like a fox; a <a>crafty</a> person.',
            link: ['crafty'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634297,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt: 'A <a>bush</a>; <i>used especially of <a>ivy</a></i>.',
            link: ['bush', 'ivy'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634298,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt:
              'An old English measure of weight, usually of wool, containing two stone or 28 pounds (13 kg).',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634299,
            dic: 26,
            part: 'VERB',
            spart:
              ' (<i>third-person singular simple present</i> tods, <i>present participle</i> todding, <i>simple past and past participle</i> todded)',
            txt: '(obsolete) To <a>weigh</a>; to yield in tods.',
            link: ['weigh'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        filteredDefinitions: [
          {
            id: 1634291,
            dic: 16,
            part: 'NOUN',
            txt:
              'A unit of weight for wool, especially one equivalent to about 28 pounds (12.7 kilograms).',
            upvotes: 1,
            downvotes: 0,
          },
          {
            id: 1634292,
            dic: 16,
            part: 'NOUN',
            txt: 'A bushy clump, as of ivy.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634293,
            dic: 2,
            part: 'NOUN',
            txt: 'A former English weight for wool, about 28 pounds.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634294,
            dic: 2,
            part: 'NOUN',
            txt: 'A bushy clump of ivy, etc.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634295,
            dic: 2,
            part: 'NOUN',
            context: 'Scot.',
            txt: 'A fox.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2255585,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt: '(now UK dialect) A <a>fox</a>.',
            link: ['fox'],
            ex: [''],
            upvotes: 0,
            downvotes: 0,
            subdefs: [
              {
                txt: 'A <a>male</a> fox; a <a>dog</a>; a <a>reynard</a>.',
                link: ['male', 'dog', 'reynard'],
              },
            ],
          },
          {
            id: 1634296,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt: 'Someone like a fox; a <a>crafty</a> person.',
            link: ['crafty'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634297,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt: 'A <a>bush</a>; <i>used especially of <a>ivy</a></i>.',
            link: ['bush', 'ivy'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634298,
            dic: 26,
            part: 'NOUN',
            spart: ' (<i>plural</i> tods)',
            txt:
              'An old English measure of weight, usually of wool, containing two stone or 28 pounds (13 kg).',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 1634299,
            dic: 26,
            part: 'VERB',
            spart:
              ' (<i>third-person singular simple present</i> tods, <i>present participle</i> todding, <i>simple past and past participle</i> todded)',
            txt: '(obsolete) To <a>weigh</a>; to yield in tods.',
            link: ['weigh'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        audio: 'en/tod.mp3',
        pronunciation: 'tŏd ',
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26], active: [] },
          pos: { default: ['NOUN', 'VERB'], active: [] },
          category: { default: ['Scot.'], active: [] },
        },
        origin: {
          txt:
            'Apparently cognate with East Frisian <i>todde</i> (“bundle"), dialectal Swedish <a>todd</a> (“mass (of wool)").',
          link: ['todd'],
        },
        userDevice: null,
      },
    ],
    points: 10,
    score: { computerScore: 21, playerScore: 16 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 21, playerScore: 16 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Ret',
    definitions: [
      {
        headword: 'ret',
        definitions: [
          {
            id: 2055769,
            dic: 16,
            part: 'VERB',
            spart: 'Transitive ',
            txt:
              'To moisten or soak (flax, for example) in order to soften and separate the fibers by partial rotting.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055770,
            dic: 16,
            part: 'VERB',
            spart: 'Intransitive (verb type) ',
            txt: 'To become so moistened or soaked.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055771,
            dic: 16,
            part: 'ABR',
            txt: 'Retired.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055772,
            dic: 16,
            part: 'ABR',
            txt: 'Return.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055773,
            dic: 2,
            part: 'VERB',
            txt:
              'To dampen or soak (flax, hemp, timber, etc.) in water in order to separate the fibers from the woody tissue.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055774,
            dic: 2,
            part: 'ABR',
            txt: 'Retail.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055775,
            dic: 2,
            part: 'ABR',
            txt: 'Retain.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055776,
            dic: 2,
            part: 'ABR',
            txt: 'Retired.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055777,
            dic: 2,
            part: 'ABR',
            txt: 'Return(ed)',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055778,
            dic: 26,
            part: 'ABR',
            txt: '<a>Retired.</a>',
            link: ['retired'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055779,
            dic: 26,
            part: 'VERB',
            spart:
              ' (<i>third-person singular simple present</i> rets, <i>present participle</i> retting, <i>simple past and past participle</i> retted)',
            txt:
              'To prepare (flax, hemp etc.) for further processing by <a>soaking</a>, which facilitates separation of fibers from the woody parts of the stem.',
            link: ['soaking'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055780,
            dic: 26,
            part: 'NOUN',
            txt: '(law) Abbreviation of <i><a>retirement</a></i>.',
            link: ['retirement'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        filteredDefinitions: [
          {
            id: 2055769,
            dic: 16,
            part: 'VERB',
            spart: 'Transitive ',
            txt:
              'To moisten or soak (flax, for example) in order to soften and separate the fibers by partial rotting.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055770,
            dic: 16,
            part: 'VERB',
            spart: 'Intransitive (verb type) ',
            txt: 'To become so moistened or soaked.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055771,
            dic: 16,
            part: 'ABR',
            txt: 'Retired.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055772,
            dic: 16,
            part: 'ABR',
            txt: 'Return.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055773,
            dic: 2,
            part: 'VERB',
            txt:
              'To dampen or soak (flax, hemp, timber, etc.) in water in order to separate the fibers from the woody tissue.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055774,
            dic: 2,
            part: 'ABR',
            txt: 'Retail.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055775,
            dic: 2,
            part: 'ABR',
            txt: 'Retain.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055776,
            dic: 2,
            part: 'ABR',
            txt: 'Retired.',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055777,
            dic: 2,
            part: 'ABR',
            txt: 'Return(ed)',
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055778,
            dic: 26,
            part: 'ABR',
            txt: '<a>Retired.</a>',
            link: ['retired'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055779,
            dic: 26,
            part: 'VERB',
            spart:
              ' (<i>third-person singular simple present</i> rets, <i>present participle</i> retting, <i>simple past and past participle</i> retted)',
            txt:
              'To prepare (flax, hemp etc.) for further processing by <a>soaking</a>, which facilitates separation of fibers from the woody parts of the stem.',
            link: ['soaking'],
            upvotes: 0,
            downvotes: 0,
          },
          {
            id: 2055780,
            dic: 26,
            part: 'NOUN',
            txt: '(law) Abbreviation of <i><a>retirement</a></i>.',
            link: ['retirement'],
            upvotes: 0,
            downvotes: 0,
          },
        ],
        audio: 'en/ret.mp3',
        pronunciation: 'rĕt ',
        isFilterPanelOpened: false,
        filters: {
          source: { default: [2, 16, 26], active: [] },
          pos: { default: ['VERB', 'ABR', 'NOUN'], active: [] },
          category: { default: [], active: [] },
        },
        origin: {
          txt:
            'Middle English <i>reten</i> <i>probably from</i> Middle Dutch <i>reeten</i> ',
        },
        userDevice: null,
      },
    ],
    points: 3,
    score: { computerScore: 24, playerScore: 16 },
    skip: false,
  },
  {
    isAI: true,
    points: '',
    score: { computerScore: '24 + 2', playerScore: '16 - 2' },
    word: 'Opponent Won',
    skip: false,
  },
];
