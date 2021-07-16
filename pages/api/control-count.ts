import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

export interface Counts {
    red: number;
    green: number;
    blue: number;
}

interface Count {
    color: string;
    count: number;
}

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

    const counts: Counts = {
        red: countsData?.find((count) => count.color === 'red')?.count || 0,
        green: countsData?.find((count) => count.color === 'green')?.count || 0,
        blue: countsData?.find((count) => count.color === 'blue')?.count || 0
    };

    if (req.method === 'PUT') {
        const body: { color: 'red' | 'green' | 'blue' } = JSON.parse(req.body);

        const { data: updateData, error: updateError } = await supabase
            .from('balcony-control')
            .update({ count: counts[body.color] + 1 })
            .match({ color: body.color });

        if (updateError) {
            return res.status(401).send(updateError.message);
        }

        const newCounts: Counts = {
            red:
                updateData?.find((count) => count.color === 'red')?.count ||
                counts.red,
            green:
                updateData?.find((count) => count.color === 'green')?.count ||
                counts.green,
            blue:
                updateData?.find((count) => count.color === 'blue')?.count ||
                counts.blue
        };

        return res.status(200).json(newCounts);
    } else {
        return res.status(200).json(counts);
    }
}
