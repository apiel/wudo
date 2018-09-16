import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import * as ogs from 'open-graph-scraper';

import OgsEntity from './type/ogs';

@Resolver(OgsEntity)
export default class OgsResolver {
    @Query(returns => OgsEntity)
    async ogs(@Arg('url') url: string, @Ctx() ctx) {
        return this.ogsPromise(url);
    }

    ogsPromise(url: string) {
        return new Promise((resolve/*, reject */) => {
            ogs({ url }, (error, results) => {
                const data: OgsEntity = {
                    error,
                    results: JSON.stringify(results),
                }
                resolve(data);
            });
        });
    }
}
