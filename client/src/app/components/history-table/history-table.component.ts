import {
  AfterViewInit,
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

import { HistoryEntry } from 'src/app/interfaces/history-entry';
import { SourceService } from 'src/app/services/source.service';
import { DefinitionElement } from 'src/app/interfaces/definition-element';

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
})
export class HistoryTableComponent implements OnInit, AfterViewInit {
  constructor(private source: SourceService) {}

  @ViewChildren('td') td: QueryList<ElementRef>;

  firstTurn = this.source.firstTurn;
  gameOver = this.source.gameOver;

  dataSource: HistoryEntry[] = def.slice(0, -1);
  displayedColumns = ['move', 'opponent', 'player'];

  // lastEntry: any = this.source.history[this.source.history.length - 1];
  lastEntry: any = def[def.length - 1];
  log(expandedElement, element, last) {
    console.log(expandedElement, element, last);
    console.log(this.source.history);
  }
  expandedElement:
    | DefinitionElement[]
    | null; /* = this.source.history.map(
    (x) => x.definitions
  ) */

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let el = this.td.last?.nativeElement;
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);
  }
}

let def = [
  {
    isAI: true,
    word: 'Doge',
    definitions: [
      {
        doge: [
          {
            definition:
              'formerly the chief magistrate in the republics of Venice and Genoa',
            partOfSpeech: 'noun',
            typeOf: ['judge', 'jurist', 'justice'],
          },
        ],
      },
    ],
    points: 12,
    score: { computerScore: 12, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    word: 'Pow',
    definitions: [
      {
        pow: [
          {
            definition:
              'a person who surrenders to (or is taken by) the enemy in time of war',
            partOfSpeech: 'noun',
            synonyms: ['prisoner of war'],
            typeOf: ['captive', 'prisoner'],
          },
        ],
      },
    ],
    points: 15,
    score: { computerScore: 12, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Ne',
    definitions: [
      {
        ne: [
          {
            definition:
              'the compass point midway between north and east; at 45 degrees',
            partOfSpeech: 'noun',
            synonyms: ["nor'-east", 'northeast', 'northeastward'],
            typeOf: ['point', 'compass point'],
          },
          {
            definition:
              'a colorless odorless gaseous element that give a red glow in a vacuum tube; one of the six inert gasses; occurs in the air in small amounts',
            partOfSpeech: 'noun',
            synonyms: ['atomic number 10', 'neon'],
            typeOf: [
              'argonon',
              'noble gas',
              'element',
              'chemical element',
              'inert gas',
            ],
            substanceOf: ['air'],
          },
          {
            definition: 'a midwestern state on the Great Plains',
            partOfSpeech: 'noun',
            synonyms: ['cornhusker state', 'neb.', 'nebraska'],
            instanceOf: ['american state'],
            hasParts: [
              'north platte',
              'bad lands',
              'badlands',
              'capital of nebraska',
              'grand island',
              'lincoln',
              'north platte river',
              'omaha',
              'platte',
              'platte river',
              'republican',
              'republican river',
              'south platte',
              'south platte river',
            ],
            partOf: [
              'u.s.',
              'the states',
              'u.s.a.',
              'united states',
              'united states of america',
              'middle west',
              'midwest',
              'midwestern united states',
              'america',
              'us',
              'usa',
            ],
          },
        ],
      },
    ],
    points: 3,
    score: { computerScore: 15, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Doge',
    definitions: [
      {
        doge: [
          {
            definition:
              'formerly the chief magistrate in the republics of Venice and Genoa',
            partOfSpeech: 'noun',
            typeOf: ['judge', 'jurist', 'justice'],
          },
        ],
      },
    ],
    points: 12,
    score: { computerScore: 12, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    word: 'Pow',
    definitions: [
      {
        pow: [
          {
            definition:
              'a person who surrenders to (or is taken by) the enemy in time of war',
            partOfSpeech: 'noun',
            synonyms: ['prisoner of war'],
            typeOf: ['captive', 'prisoner'],
          },
        ],
      },
    ],
    points: 15,
    score: { computerScore: 12, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Ne',
    definitions: [
      {
        ne: [
          {
            definition:
              'the compass point midway between north and east; at 45 degrees',
            partOfSpeech: 'noun',
            synonyms: ["nor'-east", 'northeast', 'northeastward'],
            typeOf: ['point', 'compass point'],
          },
          {
            definition:
              'a colorless odorless gaseous element that give a red glow in a vacuum tube; one of the six inert gasses; occurs in the air in small amounts',
            partOfSpeech: 'noun',
            synonyms: ['atomic number 10', 'neon'],
            typeOf: [
              'argonon',
              'noble gas',
              'element',
              'chemical element',
              'inert gas',
            ],
            substanceOf: ['air'],
          },
          {
            definition: 'a midwestern state on the Great Plains',
            partOfSpeech: 'noun',
            synonyms: ['cornhusker state', 'neb.', 'nebraska'],
            instanceOf: ['american state'],
            hasParts: [
              'north platte',
              'bad lands',
              'badlands',
              'capital of nebraska',
              'grand island',
              'lincoln',
              'north platte river',
              'omaha',
              'platte',
              'platte river',
              'republican',
              'republican river',
              'south platte',
              'south platte river',
            ],
            partOf: [
              'u.s.',
              'the states',
              'u.s.a.',
              'united states',
              'united states of america',
              'middle west',
              'midwest',
              'midwestern united states',
              'america',
              'us',
              'usa',
            ],
          },
        ],
      },
    ],
    points: 3,
    score: { computerScore: 15, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Doge',
    definitions: [
      {
        doge: [
          {
            definition:
              'formerly the chief magistrate in the republics of Venice and Genoa',
            partOfSpeech: 'noun',
            typeOf: ['judge', 'jurist', 'justice'],
          },
        ],
      },
    ],
    points: 12,
    score: { computerScore: 12, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    word: 'Pow',
    definitions: [
      {
        pow: [
          {
            definition:
              'a person who surrenders to (or is taken by) the enemy in time of war',
            partOfSpeech: 'noun',
            synonyms: ['prisoner of war'],
            typeOf: ['captive', 'prisoner'],
          },
        ],
      },
    ],
    points: 15,
    score: { computerScore: 12, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Ne',
    definitions: [
      {
        ne: [
          {
            definition:
              'the compass point midway between north and east; at 45 degrees',
            partOfSpeech: 'noun',
            synonyms: ["nor'-east", 'northeast', 'northeastward'],
            typeOf: ['point', 'compass point'],
          },
          {
            definition:
              'a colorless odorless gaseous element that give a red glow in a vacuum tube; one of the six inert gasses; occurs in the air in small amounts',
            partOfSpeech: 'noun',
            synonyms: ['atomic number 10', 'neon'],
            typeOf: [
              'argonon',
              'noble gas',
              'element',
              'chemical element',
              'inert gas',
            ],
            substanceOf: ['air'],
          },
          {
            definition: 'a midwestern state on the Great Plains',
            partOfSpeech: 'noun',
            synonyms: ['cornhusker state', 'neb.', 'nebraska'],
            instanceOf: ['american state'],
            hasParts: [
              'north platte',
              'bad lands',
              'badlands',
              'capital of nebraska',
              'grand island',
              'lincoln',
              'north platte river',
              'omaha',
              'platte',
              'platte river',
              'republican',
              'republican river',
              'south platte',
              'south platte river',
            ],
            partOf: [
              'u.s.',
              'the states',
              'u.s.a.',
              'united states',
              'united states of america',
              'middle west',
              'midwest',
              'midwestern united states',
              'america',
              'us',
              'usa',
            ],
          },
        ],
      },
    ],
    points: 3,
    score: { computerScore: 15, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'Doge',
    definitions: [
      {
        doge: [
          {
            definition:
              'formerly the chief magistrate in the republics of Venice and Genoa',
            partOfSpeech: 'noun',
            typeOf: ['judge', 'jurist', 'justice'],
          },
        ],
      },
    ],
    points: 12,
    score: { computerScore: 12, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    word: 'Pow',
    definitions: [
      {
        pow: [
          {
            definition:
              'a person who surrenders to (or is taken by) the enemy in time of war',
            partOfSpeech: 'noun',
            synonyms: ['prisoner of war'],
            typeOf: ['captive', 'prisoner'],
          },
        ],
      },
    ],
    points: 15,
    score: { computerScore: 12, playerScore: 15 },
    skip: false,
  },
  {
    isAI: true,
    word: 'last',
    definitions: [
      {
        ne: [
          {
            definition:
              'the compass point midway between north and east; at 45 degrees',
            partOfSpeech: 'noun',
            synonyms: ["nor'-east", 'northeast', 'northeastward'],
            typeOf: ['point', 'compass point'],
          },
          {
            definition:
              'a colorless odorless gaseous element that give a red glow in a vacuum tube; one of the six inert gasses; occurs in the air in small amounts',
            partOfSpeech: 'noun',
            synonyms: ['atomic number 10', 'neon'],
            typeOf: [
              'argonon',
              'noble gas',
              'element',
              'chemical element',
              'inert gas',
            ],
            substanceOf: ['air'],
          },
          {
            definition: 'a midwestern state on the Great Plains',
            partOfSpeech: 'noun',
            synonyms: ['cornhusker state', 'neb.', 'nebraska'],
            instanceOf: ['american state'],
            hasParts: [
              'north platte',
              'bad lands',
              'badlands',
              'capital of nebraska',
              'grand island',
              'lincoln',
              'north platte river',
              'omaha',
              'platte',
              'platte river',
              'republican',
              'republican river',
              'south platte',
              'south platte river',
            ],
            partOf: [
              'u.s.',
              'the states',
              'u.s.a.',
              'united states',
              'united states of america',
              'middle west',
              'midwest',
              'midwestern united states',
              'america',
              'us',
              'usa',
            ],
          },
        ],
      },
    ],
    points: 3,
    score: { computerScore: 15, playerScore: 15 },
    skip: false,
  },
];
