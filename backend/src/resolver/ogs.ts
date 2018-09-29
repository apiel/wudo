import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg, Authorized } from 'type-graphql';
import * as ogs from 'open-graph-scraper';
import { get } from 'lodash';

import OgsEntity from './type/ogs';

@Resolver(OgsEntity)
export default class OgsResolver {
    @Authorized()
    @Query(returns => OgsEntity)
    async ogs(@Arg('url') url: string, @Ctx() ctx) {
        return this.ogsPromise(url);
    }

    ogsPromise(url: string) {
        return new Promise((resolve/*, reject */) => {
            ogs({ url }, (error, results) => {
                // console.log('results', results);
                const data: OgsEntity = {
                    error: error ? results.error : null,
                    title: get(results, 'data.ogTitle', ''),
                    description: get(results, 'data.ogDescription', ''),
                    video: get(results, 'data.ogVideo.url', ''),
                    image: get(results, 'data.ogImage.url', ''),
                }
                resolve(data);
            });
        });
    }
}
