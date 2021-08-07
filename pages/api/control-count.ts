import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { rateLimit } from '../../lib/rate-limit';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

export interface Counts extends Record<string, number> {
    red: number;
    green: number;
    blue: number;
}

interface Count {
    color: string;
    count: number;
}

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500 // Cache Size
});

export default async function controlCount(
    req: NextApiRequest,
    res: NextApiResponse<Counts | string>
) {
    const { data: countsData, error: countsError } = await supabase
        .from<Count>('balcony-control')
        .select('*');

    if (countsError) {
        return res.status(401).send(countsError.message);
    }

    if (!countsData) {
        return res.status(401).send('No Data');
    }

    const counts = countsData.reduce(
        (acc, count) => {
            acc[count.color] = count.count;
            return acc;
        },
        { red: 0, green: 0, blue: 0 } as Counts
    );

    if (req.method === 'PUT') {
        try {
            await limiter.check(res, 10, 'CACHE_CONTROL_COUNT'); // 10 requests per minute

            const body: { color: 'red' | 'green' | 'blue' } = JSON.parse(
                req.body
            );

            const { data: updateData, error: updateError } = await supabase
                .from<Count>('balcony-control')
                .update({ count: counts[body.color] + 1 })
                .match({ color: body.color });

            if (updateError) {
                return res.status(401).send(updateError.message);
            }

            if (!updateData) {
                return res.status(401).send('No Data');
            }

            const newCounts = updateData.reduce(
                (acc, count) => {
                    acc[count.color] = count.count;
                    return acc;
                },
                {
                    red: counts.red,
                    green: counts.green,
                    blue: counts.blue
                } as Counts
            );

            return res.status(200).json(newCounts);
        } catch {
            return res.status(429).send('Rate limit exceeded');
        }
    } else {
        return res.status(200).json(counts);
    }
}
