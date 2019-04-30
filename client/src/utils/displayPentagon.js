import React from 'react';
import { RadarChart, CircularGridLines } from 'react-vis';
import * as math from 'mathjs'

var DATA = [
    {
        "Attacking": 0,
        "Skill": 0,
        "Movement": 0,
        "Defending": 0,
        'Power': 0
    }
];

const DOMAIN = [
    { name: 'Attacking', domain: [0, 100], tickFormat: t => t },
    { name: 'Skill', domain: [0, 100] },
    { name: 'Movement', domain: [0, 100] },
    { name: 'Defending', domain: [0, 100] },
    { name: 'Power', domain: [0, 100] }
];

/**
 * 
 * @param {Array} player
 * helper component for rendering the pentagon 
 */
const  DisplayPentagon = ({ player }) => {

    var VALUES = ['Attacking', 'Skill', 'Movement', 'Defending', 'Power'];
    if (player.length !== 0) {
        VALUES.map(value => {
            var arr = [];
            var _value = player[value]
            Object.keys(_value).map(function (key, index) {
                arr.push(_value[key])
            });
            DATA[0][value] = math.mean(arr);
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
            width={350}
            height={350} >
            <CircularGridLines
                style={{ fill: 'yellow', fillOpacity: .4, backgroundColor: '#fff', opacity: 1, stroke: '#333333' }}
                tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}
            />
        </RadarChart>
        </div>
        );
}

export default DisplayPentagon;