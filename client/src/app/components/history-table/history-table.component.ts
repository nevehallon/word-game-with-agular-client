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
  }

  returnPropName(obj) {
    // console.log(obj);

    return Object.keys(obj);
  }
  returnProp(obj, prop) {
    // console.log(obj);

    let propName = this.returnPropName(obj);
    return obj[`${propName}`][prop];
  }

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
    headword: 'id',
    definitions: [
      {
        id: 1315980,
        dic: 99,
        part: 'CONT',
        txt: "I'd is defined as I had or I would.",
        ex: [
          'An example of I\'d is what you would say if you have a preference of what you would like to do; "I\'d rather say than leave."',
        ],
        upvotes: 4,
        downvotes: 0,
      },
      {
        id: 1315949,
        dic: 16,
        part: 'NOUN',
        txt: 'A form of identification, especially an ID card.',
        upvotes: 2,
        downvotes: 1,
      },
      {
        id: 1315948,
        dic: 16,
        part: 'NOUN',
        txt:
          'In Freudian theory, the division of the psyche that is totally unconscious and serves as the source of instinctual impulses and demands for immediate satisfaction of primitive needs.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315950,
        dic: 16,
        part: 'VERB',
        txt:
          'To check the identification of, especially in order to verify legal age; card.',
        ex: ["The bouncer ID'ed everyone who looked younger than 30."],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315951,
        dic: 16,
        part: 'ABR',
        txt: 'Idaho.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315952,
        dic: 16,
        part: 'ABR',
        txt: 'Identification.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 2315040,
        dic: 16,
        part: 'ABR',
        txt: 'Intelligence Department.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315954,
        dic: 16,
        part: 'ABR',
        txt: 'Idem.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315956,
        dic: 16,
        part: 'SUF',
        txt: 'Body; particle.',
        ex: ['Chromatid.'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315957,
        dic: 2,
        part: 'NOUN',
        context: 'Psychoanalysis',
        txt:
          'That part of the psyche which is regarded as the reservoir of the instinctual drives and the source of psychic energy: it is dominated by the pleasure principle and irrational wishing, and its impulses are controlled through the development of the ego and superego.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315958,
        dic: 2,
        part: 'ABR',
        context: 'place',
        txt: 'Idaho.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315959,
        dic: 2,
        part: 'NOUN',
        txt: 'Identification.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315960,
        dic: 2,
        part: 'NOUN',
        txt:
          "A card (ID card) or document, as a birth certificate, that serves to identify a person, prove one's age, etc.",
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315961,
        dic: 2,
        part: 'ADJ',
        txt: 'Of or for identification.',
        ex: ['An <i>ID</i> card.'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315962,
        dic: 2,
        part: 'VERB',
        txt: 'To identify.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315963,
        dic: 2,
        part: 'ABR',
        txt: 'Idaho.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315964,
        dic: 2,
        part: 'ABR',
        txt: 'Identification.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315965,
        dic: 2,
        part: 'ABR',
        txt: 'Intelligence Department.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315966,
        dic: 2,
        part: 'ABR',
        txt: '<a>Intelligent design.</a>',
        link: ['intelligent-design'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315967,
        dic: 2,
        part: 'ABR',
        txt: 'The same.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 2253458,
        dic: 2,
        part: 'AFF',
        txt: 'A thing belonging to or connected with.',
        upvotes: 0,
        downvotes: 0,
        subdefs: [
          {
            context: 'Astron.',
            txt:
              'A meteor that seems to radiate from a (specified) constellation.',
            ex: ['<i>Leonid</i>'],
          },
          {
            context: 'Biol.',
            txt: 'A particle or body.',
            ex: ['<i>energid</i>'],
          },
          {
            context: 'Med.',
            txt:
              'An allergic reaction of the skin to (specified) bacteria, fungi, etc. in the body.',
          },
        ],
      },
      {
        id: 1315968,
        dic: 2,
        part: 'AFF',
        txt: 'An animal or plant belonging to a (specified) group.',
        ex: ['<i>Ephemerid.</i>'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315969,
        dic: 2,
        part: 'AFF',
        context: 'Chem.',
        txt: '<a>-ide.</a>',
        link: ['ide'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315970,
        dic: 35,
        part: 'NOUN',
        txt:
          'In psychoanalytic theory, the division of the psyche that is totally unconscious and serves as the source of instinctual impulses and demands for immediate satisfaction of primitive needs.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315971,
        dic: 4,
        part: 'ABR',
        txt:
          'Like ibid., indicates that a citation is identical to the immediate past one.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315972,
        dic: 6,
        txt: 'Inside Diameter.',
        upvotes: 0,
        downvotes: 0,
      },
      { id: 1315973, dic: 6, txt: 'Identification.', upvotes: 0, downvotes: 0 },
      {
        id: 1315974,
        dic: 7,
        txt:
          'A UNIX command that identifies the user account executing the command—often an early command that crackers will run on the system when cracking remotely. In short, the intruder will remotely compromise a service running under a root account, an account set up for a special service, or a user’s account. The hope of crackers is to achieve root access immediately. If this is not achieved, the cracker will need to run a local exploit to elevate his or her privileges.\nGraham, R. Hacking Lexicon. [Online, 2001.] Robert Graham Website. http://www.linuxsecurity.com/resource_files/documentation/hacking-dict.html.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315975,
        dic: 26,
        part: 'NOUN',
        spart: ' (<i>plural</i> ids)',
        txt:
          'The unconscious impulsive component of the <a>personality</a> in the <a>Freudian</a> psychoanalytic model.',
        link: ['personality', 'Freudian'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315976,
        dic: 26,
        part: 'NOUN',
        spart: ' (<i>plural</i> ids)',
        txt: 'Alternative spelling of <i><a>ide</a></i>.',
        link: ['ide'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315977,
        dic: 26,
        part: 'NOUN',
        spart: ' (<i>plural</i> ids)',
        txt: '(computing) <a>Identifier.</a>',
        link: ['identifier'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315978,
        dic: 26,
        part: 'NOUN',
        txt:
          'Used in citations to state that the citation is to the work immediately previously cited.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315979,
        dic: 26,
        part: 'ABR',
        txt:
          'The <a>ccTLD</a> for <a>Indonesia</a> as assigned by the <a>IANA</a>.',
        link: ['ccTLD', 'Indonesia', 'IANA'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315981,
        dic: 99,
        part: 'ABR',
        txt: 'ID is defined as an abbreviation for identification.',
        ex: ["An example of an ID is a driver's license."],
        upvotes: 0,
        downvotes: 1,
      },
      {
        id: 1315982,
        dic: 99,
        part: 'NOUN',
        txt:
          'The definition of the id is the unconscious part of the mind that causes primal needs to be met, according to Freudian theory.',
        ex: ['An example of id is the instinct of fight or flight.'],
        upvotes: 0,
        downvotes: 1,
      },
      {
        id: 1315953,
        dic: 16,
        part: 'ABR',
        txt: 'Intelligent design.',
        upvotes: 0,
        downvotes: 1,
      },
    ],
    filteredDefinitions: [
      {
        id: 1315980,
        dic: 99,
        part: 'CONT',
        txt: "I'd is defined as I had or I would.",
        ex: [
          'An example of I\'d is what you would say if you have a preference of what you would like to do; "I\'d rather say than leave."',
        ],
        upvotes: 4,
        downvotes: 0,
      },
      {
        id: 1315949,
        dic: 16,
        part: 'NOUN',
        txt: 'A form of identification, especially an ID card.',
        upvotes: 2,
        downvotes: 1,
      },
      {
        id: 1315948,
        dic: 16,
        part: 'NOUN',
        txt:
          'In Freudian theory, the division of the psyche that is totally unconscious and serves as the source of instinctual impulses and demands for immediate satisfaction of primitive needs.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315950,
        dic: 16,
        part: 'VERB',
        txt:
          'To check the identification of, especially in order to verify legal age; card.',
        ex: ["The bouncer ID'ed everyone who looked younger than 30."],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315951,
        dic: 16,
        part: 'ABR',
        txt: 'Idaho.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315952,
        dic: 16,
        part: 'ABR',
        txt: 'Identification.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 2315040,
        dic: 16,
        part: 'ABR',
        txt: 'Intelligence Department.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315954,
        dic: 16,
        part: 'ABR',
        txt: 'Idem.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315956,
        dic: 16,
        part: 'SUF',
        txt: 'Body; particle.',
        ex: ['Chromatid.'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315957,
        dic: 2,
        part: 'NOUN',
        context: 'Psychoanalysis',
        txt:
          'That part of the psyche which is regarded as the reservoir of the instinctual drives and the source of psychic energy: it is dominated by the pleasure principle and irrational wishing, and its impulses are controlled through the development of the ego and superego.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315958,
        dic: 2,
        part: 'ABR',
        context: 'place',
        txt: 'Idaho.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315959,
        dic: 2,
        part: 'NOUN',
        txt: 'Identification.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315960,
        dic: 2,
        part: 'NOUN',
        txt:
          "A card (ID card) or document, as a birth certificate, that serves to identify a person, prove one's age, etc.",
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315961,
        dic: 2,
        part: 'ADJ',
        txt: 'Of or for identification.',
        ex: ['An <i>ID</i> card.'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315962,
        dic: 2,
        part: 'VERB',
        txt: 'To identify.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315963,
        dic: 2,
        part: 'ABR',
        txt: 'Idaho.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315964,
        dic: 2,
        part: 'ABR',
        txt: 'Identification.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315965,
        dic: 2,
        part: 'ABR',
        txt: 'Intelligence Department.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315966,
        dic: 2,
        part: 'ABR',
        txt: '<a>Intelligent design.</a>',
        link: ['intelligent-design'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315967,
        dic: 2,
        part: 'ABR',
        txt: 'The same.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 2253458,
        dic: 2,
        part: 'AFF',
        txt: 'A thing belonging to or connected with.',
        upvotes: 0,
        downvotes: 0,
        subdefs: [
          {
            context: 'Astron.',
            txt:
              'A meteor that seems to radiate from a (specified) constellation.',
            ex: ['<i>Leonid</i>'],
          },
          {
            context: 'Biol.',
            txt: 'A particle or body.',
            ex: ['<i>energid</i>'],
          },
          {
            context: 'Med.',
            txt:
              'An allergic reaction of the skin to (specified) bacteria, fungi, etc. in the body.',
          },
        ],
      },
      {
        id: 1315968,
        dic: 2,
        part: 'AFF',
        txt: 'An animal or plant belonging to a (specified) group.',
        ex: ['<i>Ephemerid.</i>'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315969,
        dic: 2,
        part: 'AFF',
        context: 'Chem.',
        txt: '<a>-ide.</a>',
        link: ['ide'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315970,
        dic: 35,
        part: 'NOUN',
        txt:
          'In psychoanalytic theory, the division of the psyche that is totally unconscious and serves as the source of instinctual impulses and demands for immediate satisfaction of primitive needs.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315971,
        dic: 4,
        part: 'ABR',
        txt:
          'Like ibid., indicates that a citation is identical to the immediate past one.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315972,
        dic: 6,
        txt: 'Inside Diameter.',
        upvotes: 0,
        downvotes: 0,
      },
      { id: 1315973, dic: 6, txt: 'Identification.', upvotes: 0, downvotes: 0 },
      {
        id: 1315974,
        dic: 7,
        txt:
          'A UNIX command that identifies the user account executing the command—often an early command that crackers will run on the system when cracking remotely. In short, the intruder will remotely compromise a service running under a root account, an account set up for a special service, or a user’s account. The hope of crackers is to achieve root access immediately. If this is not achieved, the cracker will need to run a local exploit to elevate his or her privileges.\nGraham, R. Hacking Lexicon. [Online, 2001.] Robert Graham Website. http://www.linuxsecurity.com/resource_files/documentation/hacking-dict.html.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315975,
        dic: 26,
        part: 'NOUN',
        spart: ' (<i>plural</i> ids)',
        txt:
          'The unconscious impulsive component of the <a>personality</a> in the <a>Freudian</a> psychoanalytic model.',
        link: ['personality', 'Freudian'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315976,
        dic: 26,
        part: 'NOUN',
        spart: ' (<i>plural</i> ids)',
        txt: 'Alternative spelling of <i><a>ide</a></i>.',
        link: ['ide'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315977,
        dic: 26,
        part: 'NOUN',
        spart: ' (<i>plural</i> ids)',
        txt: '(computing) <a>Identifier.</a>',
        link: ['identifier'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315978,
        dic: 26,
        part: 'NOUN',
        txt:
          'Used in citations to state that the citation is to the work immediately previously cited.',
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315979,
        dic: 26,
        part: 'ABR',
        txt:
          'The <a>ccTLD</a> for <a>Indonesia</a> as assigned by the <a>IANA</a>.',
        link: ['ccTLD', 'Indonesia', 'IANA'],
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: 1315981,
        dic: 99,
        part: 'ABR',
        txt: 'ID is defined as an abbreviation for identification.',
        ex: ["An example of an ID is a driver's license."],
        upvotes: 0,
        downvotes: 1,
      },
      {
        id: 1315982,
        dic: 99,
        part: 'NOUN',
        txt:
          'The definition of the id is the unconscious part of the mind that causes primal needs to be met, according to Freudian theory.',
        ex: ['An example of id is the instinct of fight or flight.'],
        upvotes: 0,
        downvotes: 1,
      },
      {
        id: 1315953,
        dic: 16,
        part: 'ABR',
        txt: 'Intelligent design.',
        upvotes: 0,
        downvotes: 1,
      },
    ],
    audio: 'en/id.mp3',
    pronunciation: 'ĭd ',
    isFilterPanelOpened: false,
    filters: {
      source: { default: [2, 16, 26, 99, 35, 6, 7, 4], active: [] },
      pos: {
        default: ['CONT', 'NOUN', 'VERB', 'ABR', 'SUF', 'ADJ', 'AFF'],
        active: [],
      },
      category: { default: ['Psychoanalysis', 'place', 'Chem.'], active: [] },
    },
    origin: {
      txt:
        'New Latin (<i>translation of</i> German <i>Es</i>) (<i>a special use of</i> <i>es</i> <i>it, as a psychoanalytic term</i>) <i>from</i> Latin <i>it</i> <a>i-</a> in Indo-European roots ',
      link: ['i'],
    },
    userDevice: null,
  },
];
