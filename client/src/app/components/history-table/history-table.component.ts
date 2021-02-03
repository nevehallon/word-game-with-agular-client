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
    isAI: false,
    word: 'Pay',
    definitions: [
      {
        word: {
          definition: [
            'cancel or discharge a debt',
            'dedicate',
            'convey, as of a compliment, regards, attention, etc.; bestow',
            'do or give something to somebody in return',
            'something that remunerates',
            'bring in',
            'bear (a cost or penalty), in recompense for some action',
            'be worth it',
            'discharge or settle',
            'give money, usually in exchange for goods or services',
            'make a compensation for',
            'render',
          ],
          partOfSpeech: [
            'verb',
            'verb',
            'verb',
            'verb',
            'noun',
            'verb',
            'verb',
            'verb',
            'verb',
            'verb',
            'verb',
            'verb',
          ],
          synonyms: [
            'ante up',
            'pay up',
            'devote',
            'give',
            'give',
            'compensate',
            'make up',
            'pay off',
            'earnings',
            'remuneration',
            'salary',
            'wage',
            'bear',
            'yield',
          ],
          hasTypes: [
            'liquidate',
            'pay off',
            'offer',
            'extend',
            'minimum wage',
            'living wage',
            'half-pay',
            'sick pay',
            'double time',
            'repair',
            'repay',
            'return',
            'spend',
            'subsidise',
            'subsidize',
            'tithe',
          ],
          derivation: [
            'payment',
            'payee',
            'payer',
            'payer',
            'payment',
            'payer',
            'payment',
            'payee',
            'payer',
          ],
          examples: [
            'pay up, please!',
            'pay attention to',
            "Don't pay him any mind",
            'pay attention',
            'Does she pay you for the work you are doing?',
            'he wasted his pay on drink',
            'How much does this savings certificate pay annually?',
            "You'll pay for this!",
            'She had to pay the penalty for speaking out rashly',
            "You'll pay for this opinion later",
            'It pays to go through the trouble',
            'pay a debt',
            'pay an obligation',
            'pay a visit',
            'pay a call',
          ],
          typeOf: [
            'cogitate',
            'think',
            'cerebrate',
            'intercommunicate',
            'communicate',
            'settle',
            'digest',
            'stand',
            'be',
            'settle',
            'give',
            'requite',
            'repay',
            'make',
          ],
          verbGroup: ['give', 'sacrifice', 'get', 'pay off', 'pay back', 'fix'],
          also: ['pay off', 'pay back', 'pay off', 'pay out', 'fund'],
          partOf: ['paysheet', 'payroll'],
          inCategory: ['investment funds', 'investment'],
        },
      },
    ],
    points: 14,
    score: { computerScore: 0, playerScore: 14 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Watter',
    points: 13,
    score: { computerScore: 13, playerScore: 14 },
    skip: false,
  },
  {
    isAI: false,
    word: 'Ya, Tao',
    definitions: [
      {
        word: {
          definition: [
            'an adherent of any branch of Taoism',
            'the ultimate principle of the universe',
          ],
          partOfSpeech: ['noun', 'noun'],
          synonyms: ['taoist'],
          typeOf: ['disciple', 'adherent', 'principle'],
          memberOf: ['taoism'],
          inCategory: ['daoism', 'taoism'],
          partOf: ['daoism', 'taoism'],
        },
      },
    ],
    points: 8,
    score: { computerScore: 13, playerScore: 22 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Erg',
    definitions: [
      {
        word: {
          definition: [
            'a cgs unit of work or energy; the work done by a force of one dyne acting over a distance of one centimeter',
          ],
          partOfSpeech: ['noun'],
          typeOf: ['energy unit', 'heat unit', 'work unit'],
          partOf: ['j', 'joule', 'watt second'],
        },
      },
    ],
    points: 5,
    score: { computerScore: 18, playerScore: 22 },
    skip: false,
  },
  {
    isAI: false,
    points: 0,
    score: { computerScore: 12, playerScore: 15 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    points: '',
    score: { computerScore: '18 + 2', playerScore: '22 - 2' },
    word: 'Player Won',
    skip: false,
  },
  {
    isAI: false,
    word: 'Me, On, Mo, he, fe',
    definitions: [
      {
        me: {
          definition: ['a state in New England'],
          partOfSpeech: ['noun'],
          synonyms: ['maine', 'me.', 'pine tree state'],
          instanceOf: ['american state'],
          hasParts: [
            'acadia national park',
            'lewiston',
            'orono',
            'penobscot',
            'penobscot river',
            'portland',
            'saint john',
            'saint john river',
            'st. john',
            'st. john river',
            'augusta',
            'bangor',
            'brunswick',
            'capital of maine',
          ],
          partOf: [
            'america',
            'u.s.',
            'u.s.a.',
            'united states',
            'united states of america',
            'us',
            'new england',
            'usa',
            'the states',
          ],
        },
      },
      {
        on: {
          definition: [
            'with a forward motion',
            'in operation or operational',
            '(of events) planned or scheduled',
          ],
          partOfSpeech: ['adverb', 'adjective', null],
          synonyms: ['along'],
          examples: [
            'we drove along admiring the view',
            'the horse trotted along at a steady pace',
            'the circus traveled on to the next city',
            'move along',
            'march on',
            'left the oven on',
            'the switch is in the on position',
            'the picnic is on, rain or shine',
            'we have nothing on for Friday night',
          ],
          similarTo: ['connected'],
          antonyms: ['off', 'off'],
        },
      },
      {
        mo: {
          definition: [
            'an indefinitely short time',
            'a midwestern state in central United States; a border state during the American Civil War, Missouri was admitted to the Confederacy without actually seceding from the Union',
            'a polyvalent metallic element that resembles chromium and tungsten in its properties; used to strengthen and harden steel',
          ],
          partOfSpeech: ['noun', 'noun', 'noun'],
          synonyms: [
            'bit',
            'minute',
            'moment',
            'second',
            'missouri',
            'mo.',
            'show me state',
            'atomic number 42',
            'molybdenum',
          ],
          typeOf: ['time', 'metal', 'metallic element'],
          hasTypes: [
            'wink',
            'jiffy',
            'trice',
            'twinkling',
            'instant',
            'new york minute',
            'split second',
            'heartbeat',
            'blink of an eye',
            'flash',
          ],
          inRegion: ['britain'],
          examples: ['wait just a moment', 'in a mo'],
          instanceOf: ['american state'],
          memberOf: [
            'confederate states of america',
            'dixie',
            'confederate states',
            'south',
            'confederacy',
            'dixieland',
          ],
          hasParts: [
            'gateway to the west',
            'cape girardeau',
            'capital of missouri',
            'columbia',
            'hannibal',
            'independence',
            'jefferson city',
            'kansas city',
            'osage',
            'osage river',
            'poplar bluff',
            'saint francis',
            'saint francis river',
            'saint joseph',
            'saint louis',
            'sedalia',
            'springfield',
            'st. francis',
            'st. francis river',
            'st. joseph',
            'st. louis',
            'white',
            'white river',
          ],
          partOf: [
            'the states',
            'u.s.',
            'u.s.a.',
            'america',
            'united states',
            'united states of america',
            'us',
            'middle west',
            'midwest',
            'midwestern united states',
            'usa',
          ],
          substanceOf: ['molybdenite'],
        },
      },
      {
        he: {
          definition: [
            'a cgs unit of work or energy; the work done by a force of one dyne acting over a distance of one centimeter',
          ],
          partOfSpeech: ['noun'],
          typeOf: ['energy unit', 'heat unit', 'work unit'],
          partOf: ['j', 'joule', 'watt second'],
        },
      },
      {
        fe: {
          definition: [
            'a cgs unit of work or energy; the work done by a force of one dyne acting over a distance of one centimeter',
          ],
          partOfSpeech: ['noun'],
          typeOf: ['energy unit', 'heat unit', 'work unit'],
          partOf: ['j', 'joule', 'watt second'],
        },
      },
    ],
    points: 12,
    score: { computerScore: 16, playerScore: 24 },
    skip: false,
  },
];
