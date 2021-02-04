import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDefs',
})
export class FilterDefsPipe implements PipeTransform {
  transform(defs: any[], ...args: unknown[]): any[] {
    let result = defs
      .sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1))
      .filter(
        (x) =>
          !['INIT', 'ABR', 'PRX', 'AFF', 'SUF', 'SYM'].includes(x.part) &&
          x.part !== undefined
      )
      .map((x) => {
        let p = x.part;
        p =
          p === 'PRE'
            ? 'preposition'
            : p === 'PRON'
            ? 'pronoun'
            : p === 'NOUN'
            ? 'noun'
            : p === 'ADV'
            ? 'adverb'
            : p === 'CONJ'
            ? 'conjunction'
            : p === 'PRN'
            ? 'proper noun'
            : p === 'ADJ'
            ? 'adjective'
            : p === 'INT'
            ? 'interjection'
            : p;
        return { ...x, part: p };
      });
    return result;
  }
}
