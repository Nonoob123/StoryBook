# -*- coding: utf-8 -*-
import os

BASE = os.path.dirname(os.path.abspath(__file__))
images_dir = BASE

scenes = [
    ('scene01_grassland_friends.png', '1', 'Friends in Grassland'),
    ('scene02_eagle_flying.png', '2', 'Eagle Flying'),
    ('scene03_wish_to_fly.png', '3', 'Wish to Fly'),
    ('scene04_first_failure.png', '4', 'First Failure'),
    ('scene05_second_failure.png', '5', 'Second Failure'),
    ('scene06_third_failure.png', '6', 'Third Failure'),
    ('scene07_leaves_wings.png', '7', 'Leaves Wings'),
    ('scene08_balloons_mud.png', '8', 'Balloons in Mud'),
    ('scene09_others_laugh.png', '9', 'Others Laugh'),
    ('scene10_continue_research.png', '10', 'Continue Research'),
    ('scene11_camel_helps.png', '11', 'Camel Helps'),
    ('scene12_record_failures.png', '12', 'Record Failures'),
    ('scene13_hundredth_experiment.png', '13', 'Hundredth Experiment'),
    ('scene14_glider_flight.png', '14', 'Glider Flight'),
    ('scene15_success_celebration.png', '15', 'Success Celebration'),
    ('scene16_worth_it_question.png', '16', 'Worth It Question'),
    ('scene17_wisdom_answer.png', '17', 'Wisdom Answer'),
    ('scene18_sunset_friends.png', '18', 'Sunset Friends'),
]

for filename, num, desc in scenes:
    placeholder_path = os.path.join(images_dir, filename)
    with open(placeholder_path, 'wb') as f:
        f.write(b'\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\rIHDR\\x00\\x00\\x00\\x01\\x00\\x00\\x00\\x01\\x08\\x06\\x00\\x00\\x00\\x1f\\x15\\xc4\\x89\\x00\\x00\\x00\\nIDATx\\x9cc\\x00\\x01\\x00\\x00\\x05\\x00\\x01\\r\\n-\\xb4\\x00\\x00\\x00\\x00IEND\\xaeB\\x60\\x82')

print('Created ' + str(len(scenes)) + ' placeholder image files')
for fn, _, desc in scenes:
    print('  ' + fn + ' - ' + desc)
