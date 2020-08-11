import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IConfig, ITableColumn, TableActions } from './models';

@Injectable({
  providedIn: 'root',
})
export class NgxMatTableService {
  constructor() {}

  setTableConfig(
    data: Observable<any>,
    config: IConfig[],
    actions: Array<TableActions> = null
  ): Observable<ITableColumn[]> {
    // following objects will contain a specific config parameters
    // based on this params we will change the display of each column
    return data.pipe(
      map((values) => values[0]),
      map((value) => Object.keys(value)),
      map((keys) => {
        let tableColsAndConfig: Array<ITableColumn> = [];
        for (let index = 0; index < keys.length; index++) {
          tableColsAndConfig.push({
            key: keys[index],
            display: config[index].display,
            config: config[index]?.config?.isDate && {
              // This column will hold a date value, so we must format the
              // display to show as a date
              isDate: !!config[index]?.config?.isDate ?? null,
              format: config[index]?.config?.isDate
                ? config[index].config.format
                : null,
            },
          });
        }
        // in this column we have actions like activate/block account
        // so we will create a button and create it event click
        if (actions)
          tableColsAndConfig.push({
            display: 'Action',
            key: 'action',
            config: {
              isAction: true,
              actions,
            },
          });
        return tableColsAndConfig;
      }),
      take(1)
    );
  }
}
