# -*- coding: utf-8 -*-
import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))

scenes = [
    {
        'num': 1,
        'description': 'Grassland friends introduction',
        'prompt': 'A wide beautiful grassland landscape under blue sky with fluffy clouds. A cute fluffy white sheep lying on green grass and a small adorable camel sitting nearby. Both are smiling at each other. Children picture book illustration, soft watercolor style, warm gentle colors, cute anthropomorphic animals with big friendly smiles, peaceful grassland atmosphere, 2D flat illustration',
        'filename': 'scene01_grassland_friends.png'
    },
    {
        'num': 2,
        'description': 'Eagle soaring in the sky',
        'prompt': 'A majestic eagle soaring high in the blue sky, wings spread wide. Below, a cute white sheep looking up at the sky with wide amazed eyes. Green grassland stretching far into the distance. Children picture book illustration, soft watercolor style, warm gentle colors, sense of wonder and admiration',
        'filename': 'scene02_eagle_flying.png'
    },
    {
        'num': 3,
        'description': 'Sheep wishes he could fly',
        'prompt': 'A cute white sheep standing on a small hill, looking up at the soaring eagle with dreamy eyes. The sheep has a wistful longing expression. Beautiful grassland background with golden sunlight. Children picture book illustration, soft watercolor style, warm colors, emotional and tender scene',
        'filename': 'scene03_wish_to_fly.png'
    },
    {
        'num': 4,
        'description': 'Starting invention first day failure',
        'prompt': 'A cute white sheep standing next to a makeshift wooden contraption with feathers attached to it, the contraption falling apart. The sheep looks a bit disappointed but determined. A small camel watching from a distance with a caring expression. Grassland background. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene04_first_failure.png'
    },
    {
        'num': 5,
        'description': 'Second day failure',
        'prompt': 'The same cute white sheep trying another flying machine made of bamboo and cloth. It is also broken. The sheep wiping sweat from his forehead but keeping a determined look. The small camel still watching nearby. Grassland background. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene05_second_failure.png'
    },
    {
        'num': 6,
        'description': 'Third day still failing',
        'prompt': 'A cute white sheep surrounded by broken pieces of several different flying attempts. The sheep looks frustrated but not giving up. Three calendar pages showing day one day two and day three all with X marks. Grassland background. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene06_third_failure.png'
    },
    {
        'num': 7,
        'description': 'Leaves wings fail',
        'prompt': 'A cute white sheep jumping off a small rock with big leaves tied to his arms like wings. He is already falling into a pile of soft grass below. The sheep has a surprised expression. Leaves flying everywhere. Children picture book illustration, soft watercolor style, warm gentle colors, comedic moment',
        'filename': 'scene07_leaves_wings.png'
    },
    {
        'num': 8,
        'description': 'Balloons blow into mud',
        'prompt': 'A cute white sheep holding onto many colorful balloons tied together. The wind is blowing him away from the ground. In the background there is a muddy pit. The sheep looks startled. A small camel watching with concern. Grassland background with wind lines. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene08_balloons_mud.png'
    },
    {
        'num': 9,
        'description': 'Others laugh and mock',
        'prompt': 'A cute white sheep looking sad with ears drooping, sitting alone on the grassland. In the background silhouettes of other animals pointing and laughing. A few speech bubbles with mocking words. The sheep has a hurt expression but still has a small determined look in his eyes. Children picture book illustration, soft watercolor style, warm gentle colors with slightly darker mood',
        'filename': 'scene09_others_laugh.png'
    },
    {
        'num': 10,
        'description': 'Sheep continues despite sadness',
        'prompt': 'A cute white sheep sitting alone with a sad expression holding a sketchbook with flying designs drawn on it. The sheep looks at the drawings with determination forming on his face. A small camel walking towards him gently from the side, ready to help. Grassland at dusk with soft warm light. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene10_continue_research.png'
    },
    {
        'num': 11,
        'description': 'Camel helps draw plans',
        'prompt': 'A cute white sheep and a cute small camel working together at a desk made of wood. The camel is using a pencil to draw flying machine designs on paper while the sheep watches excitedly. Many papers with sketches and calculations scattered around. Warm lamplight. Children picture book illustration, soft watercolor style, warm gentle colors, teamwork',
        'filename': 'scene11_camel_helps.png'
    },
    {
        'num': 12,
        'description': 'Camel tests and records',
        'prompt': 'A cute small camel holding a clipboard and pencil, carefully writing notes while watching a small test model being attempted by a white sheep. The camel looks focused and professional. Several test results written on papers. Grassland background. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene12_record_failures.png'
    },
    {
        'num': 13,
        'description': 'The hundredth experiment begins',
        'prompt': 'A cute white sheep carefully assembling a beautiful small glider made of lightweight wood and silk. The sheep has a focused determined expression. A small camel standing beside holding tools. Many experiments shown as numbered markers from 1 to 99 in the background. Golden sunset light. Children picture book illustration, soft watercolor style, warm golden colors',
        'filename': 'scene13_hundredth_experiment.png'
    },
    {
        'num': 14,
        'description': 'The glider takes flight',
        'prompt': 'A beautiful small glider with a cute white sheep sitting in it, just barely lifted off the ground, wheels rolling on a grass runway. The glider wings catching the golden sunset light. A small camel watching from the side with a happy proud smile. Other animals gathering in the distance. Magical moment of first flight. Children picture book illustration, soft watercolor style, warm golden sunset colors',
        'filename': 'scene14_glider_flight.png'
    },
    {
        'num': 15,
        'description': 'Success celebration',
        'prompt': 'A cute white sheep jumping for joy with arms raised high, a big smile on his face. A small camel giving a thumbs up. All the grassland animals gathered around cheering and clapping. Confetti and sparkles in the air. Beautiful sunset in the background. Children picture book illustration, soft watercolor style, warm golden joyful colors',
        'filename': 'scene15_success_celebration.png'
    },
    {
        'num': 16,
        'description': 'The question about worth it',
        'prompt': 'A cute white sheep thinking thoughtfully with a finger on his chin. A small camel standing beside looking at him supportively. Other animals gathered around listening. The small glider resting in the background. Golden hour lighting. Children picture book illustration, soft watercolor style, warm gentle colors',
        'filename': 'scene16_worth_it_question.png'
    },
    {
        'num': 17,
        'description': 'Sheep shares wisdom',
        'prompt': 'A cute white sheep smiling brightly with a wise happy expression, gesturing with his hoof as if explaining something important. A small camel nodding and giving a thumbs up beside him. Sparkles of golden light around them. The glider shining in the background. Children picture book illustration, soft watercolor style, warm golden colors',
        'filename': 'scene17_wisdom_answer.png'
    },
    {
        'num': 18,
        'description': 'Two friends watching sunset',
        'prompt': 'A cute white sheep and a cute small camel standing together on a grassland hill watching a beautiful golden sunset. The small glider resting between them. Both are smiling contentedly. The sky painted in warm oranges pinks and purples. Stars beginning to appear. Children picture book illustration, soft watercolor style, warm golden sunset colors, heartwarming friendship',
        'filename': 'scene18_sunset_friends.png'
    }
]

filepath = os.path.join(BASE, 'scenes.json')
with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(scenes, f, ensure_ascii=False, indent=2)

print('Created ' + str(len(scenes)) + ' scenes')
for s in scenes:
    print('  Scene ' + str(s['num']) + ': ' + s['filename'])
