import React from 'react';
import { RadarChart, CircularGridLines } from 'react-vis';
import * as math from 'mathjs'

var DATA = [
    {
        "overall": 0,
        "attack": 0,
        "midfield": 0,
        "defence": 0,
    }
];

const DOMAIN = [
    { name: 'overall', domain: [0, 100], tickFormat: t => t },
    { name: 'attack', domain: [0, 100] },
    { name: 'midfield', domain: [0, 100] },
    { name: 'defence', domain: [0, 100] }
];

const  DisplayPentagon = ({ team }) => {

    var VALUES = ['overall', 'attack', 'midfield', 'defence'];
    if (team.length != 0) {
        VALUES.map(value => {
            DATA[0][value] = team[value];
        })
    }
    return (
        <div>
        <RadarChart
            data={DATA}
            domains={DOMAIN}
            style={{
                polygons: {
                    fillOpacity: 0.4,
                    strokeWidth: 2,
                    strokeOpacity: 1
                },
                axes: {
                    text: { opacity: 0.2 }
                },
                labels: {
                    textAnchor: 'middle',
                    fontSize: 12,
                    fontWeight: 1000,
                }
            }}
            animation
            margin={{
                left: 80,
                top: 80,
                bottom: 80,
                right: 80
            }}
            width={390}
            height={370} >
            <CircularGridLines
                style={{ fill: 'yellow', fillOpacity: .4, backgroundColor: '#fff', opacity: 1, stroke: '#333333' }}
                tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}
            />
        </RadarChart>
        </div>
        );
}

export default DisplayPentagon;