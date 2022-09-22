import { ISocketData } from '@interfaces/index';
import { UpdateTypes } from '@enums/index';

export function quotesHandler(
  oldQuotes: ISocketData[],
  newQuotes: ISocketData[]
): ISocketData[] {
  return newQuotes.map((newItem) => {
    const oldItem = oldQuotes.find((findItem) =>
      findItem.ticker.match(newItem.ticker)
    );
    newItem.update_status = UpdateTypes.none;
    if (oldItem && newItem.price >= oldItem.price) {
      newItem.update_status = UpdateTypes.increase;
    }
    if (oldItem && newItem.price <= oldItem.price) {
      newItem.update_status = UpdateTypes.decrease;
    }

    return newItem;
  });
}
